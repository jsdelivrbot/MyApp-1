import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  goBack() {


    }

}
