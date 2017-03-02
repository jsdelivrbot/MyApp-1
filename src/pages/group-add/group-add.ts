import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Platform, ActionSheetController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatsPage } from '../chats/chats';
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
	public peopleForGroup = [{}];
	public weddingGroup: any;
	public weddingGroupMembers: any;
	public newWeddingGroupKey: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, public actionSheetCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
	this.people = af.database.list('/Weddings/0/weddingPeople');
	this.weddingGroup = firebase.database().ref('/Weddings/0/weddingGroups/');

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

 checkedPeople(person, checked){
 	console.log(checked);
 	if(checked == true){
 	this.addPerson(person);
 	}
 	if(checked == false){
 	this.removePerson(person);
 	//console.log("removePerson")
 	}

 }

 addPerson(person){
        this.peopleForGroup.push(person);
        //console.log(this.peopleForGroup);
    }

 removePerson(person){
        for(var i = 0; i < this.peopleForGroup.length; i++) {
        	//console.log (JSON.stringify(this.peopleForGroup[i]) + " = " + JSON.stringify(person));
            if(this.peopleForGroup[i] == person){
                this.peopleForGroup.splice(i, 1);
            }
        }
        console.log(this.peopleForGroup);
    }   

  saveNewGroup() {
    //console.log('New Group Info: ' + this.groupNameString);
    var newGroup = {
    groupName: this.groupNameString,
    groupPhotoURL: 'url'
  };

    this.newWeddingGroupKey = this.weddingGroup.push().key;
  	var groupId = this.newWeddingGroupKey;
    var updates = {};
  	updates[this.newWeddingGroupKey] = newGroup;
  	var updates2 = {};
  	updates2[this.newWeddingGroupKey + '/groupMembers/'] = this.peopleForGroup;

  	this.weddingGroup.update(updates);
  	this.weddingGroup.update(updates2);
  	this.weddingGroup.child(groupId).update({groupId: groupId});
  	this.navCtrl.push(ChatsPage);
    this.navCtrl.setRoot(ChatsPage);
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
