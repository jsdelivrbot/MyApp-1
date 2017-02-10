import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { ProfileData } from '../../providers/profile-data';
import { AuthService } from '../../providers/auth-service';

import {TabsPage} from '../tabs/tabs';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  tabsPage = TabsPage;
  public userProfile: any;
  testRadioOpen: boolean;
  public relationship: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public profileData: ProfileData, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
  this.profileData = profileData;
  this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  updateName(){
  let alert = this.alertCtrl.create({
    message: "Update your first name & last name",
    inputs: [
      {
        name: 'firstname',
        placeholder: 'Your first name',
        value: this.userProfile.firstname
      },
      {
        name: 'lastname',
        placeholder: 'Your last name',
        value: this.userProfile.lastname
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateName(data.firstname, data.lastname);
        }
      }
    ]
  });
  alert.present();
}

updateEmail(){
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newEmail',
        placeholder: 'Update your new email',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateEmail(data.newEmail);
        }
      }
    ]
  });
  alert.present();
}

updateRelationship(){
  let alert = this.alertCtrl.create();
    alert.setTitle('Relationship to couple:');

    alert.addInput({
      type: 'radio',
      label: 'Bridesmaid',
      value: 'Bridesmaid',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Groomsmen',
      value: 'Groomsmen'
    });

    alert.addInput({
      type: 'radio',
      label: 'Family',
      value: 'Family'
    });

    alert.addInput({
      type: 'radio',
      label: 'Friend',
      value: 'Friend'
    });

    alert.addInput({
      type: 'radio',
      label: 'Guest',
      value: 'Guest'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.testRadioOpen = false;
        this.profileData.updateRelationship(data);
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

  updateDescription(){
  let alert = this.alertCtrl.create({
    message: "Tell everyone about yourself:",
    inputs: [
      {
        name: 'description',
        placeholder: 'About you:',
        value: this.userProfile.description
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateDescription(data.description);
        }
      }
    ]
  });
  alert.present();
}

profilePicActionSheet() {
    let profilePicSheet = this.actionSheetCtrl.create({
      title: 'Upload your Profile Picture',
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
