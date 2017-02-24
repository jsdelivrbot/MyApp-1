import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Platform, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
/*
  Generated class for the GroupAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group-add',
  templateUrl: 'group-add.html'
})
export class GroupAddPage {
	people: FirebaseListObservable<any>;
	public groupName: any;
	public groupNameObject: string;
	public groupNameObjectString: string;
	public groupNameString: string;
	groupForm: FormGroup;
	public groupProfileData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, public actionSheetCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
	this.people = af.database.list('/Weddings/0/weddingPeople');
	this.groupForm = formBuilder.group({
      'groupName': ''
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupAddPage');
  }

  updateGroupName(){
  let alert = this.alertCtrl.create({
    message: "Update your group name",
    inputs: [
      {
        name: 'groupName',
        placeholder: 'Your group name',
        type: 'string',
        value: this.groupNameString
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.groupName = data;
          this.groupNameObject = JSON.stringify(this.groupName);
          this.groupNameObjectString = JSON.parse(this.groupNameObject);
          this.groupNameString = this.groupNameObjectString["groupName"];
          
        }
      }
    ]
  });
  alert.present();
 }

  onSubmit(formData) {
    console.log('Form data is ', formData);
    //this.groupProfileData = formData;
  }



  profilePicActionSheet() {
    let profilePicSheet = this.actionSheetCtrl.create({
      title: 'Upload your Group Profile Picture',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take a Picture',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            console.log('Take a Picture clicked');
          }
        },{
          text: 'Select from Gallery',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            console.log('Select from Gallery clicked');
            //this.getPicture();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    profilePicSheet.present();
  }

}
