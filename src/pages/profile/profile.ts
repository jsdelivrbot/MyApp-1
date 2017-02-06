import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public profileData: ProfileData) {
  this.profileData = profileData;
  this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


}
