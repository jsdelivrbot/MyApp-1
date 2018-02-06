import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';

import { Camera } from 'ionic-native';
import { Transfer } from 'ionic-native';

import { ProfileData } from '../../providers/profile-data';
import { AuthService } from '../../providers/auth-service';
import { LoadingProvider } from '../../providers/loading';

import firebase from 'firebase';

import {TabsPage} from '../tabs/tabs';


declare var window: any;

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
  public file: any;
  public profilePic: any;
  public blob: any;
  public photoURL: any;




  constructor(public navCtrl: NavController, public navParams: NavParams, public profileData: ProfileData, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public platform: Platform, public loadingProvider: LoadingProvider) {
  this.loadingProvider.show();
  this.profileData = profileData;
  this.getUserProfile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getUserProfile(){
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.loadingProvider.hide();
    });
  }

  getPicture() {

  // get picture from camera

  //console.log(Device)
  //let imageSource = (Device.isVirtual ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA);

  this.loadingProvider.show();
  Camera.getPicture({
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,
    quality: 100,
    encodingType: Camera.EncodingType.JPEG,
    correctOrientation: true
  }).then((_imagePath) => {
    //alert('got image path ' + _imagePath);
    // convert picture to blob
    return this.makeFileIntoBlob(_imagePath);
  }).then((_imageBlob) => {
    //alert('got image blob ' + _imageBlob);

    // upload the blob
    return this.uploadToFirebase(_imageBlob);
  }).then((_uploadSnapshot: any) => {
    //alert('file uploaded successfully  ' + _uploadSnapshot.downloadURL);

    // store reference to storage in database
    this.loadingProvider.hide();
    return this.saveToUserProfile(_uploadSnapshot);

  }).then((_uploadSnapshot: any) => {

  }, (_error) => {
    alert('Error ' + (_error.message || _error));
  });

}

makeFileIntoBlob(_imagePath) {

  // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

      fileEntry.file((resFile) => {

        var reader = new FileReader();
        reader.onloadend = (evt: any) => {
          var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
          imgBlob.name = 'sample.jpg';
          resolve(imgBlob);
        };

        reader.onerror = (e) => {
          console.log('Failed file read: ' + e.toString());
          reject(e);
        };

        reader.readAsArrayBuffer(resFile);
      });
    });
  });
}

uploadToFirebase(_imageBlob) {
  var fileName = 'profilePic' + '.jpg';

  return new Promise((resolve, reject) => {
    var fileRef = firebase.storage().ref('/userProfile/' + this.profileData.currentUser.uid + '/' + fileName);

    var uploadTask = fileRef.put(_imageBlob);

    uploadTask.on('state_changed', (_snapshot) => {
      console.log('snapshot progess ' + _snapshot);
    }, (_error) => {
      reject(_error);
    }, () => {
      // completion...
      resolve(uploadTask.snapshot);
    });
  });
}

saveToUserProfile(_uploadSnapshot) {
  this.photoURL = _uploadSnapshot.downloadURL;
  this.profileData.updateProfilePic(this.photoURL);

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
            this.getPicture();
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
