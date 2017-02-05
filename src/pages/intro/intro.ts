import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';

/*
  Generated class for the Into page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  goToLoginPage(){
  this.navCtrl.push(LoginPage);
  }

  goToSignupPage() {
  this.navCtrl.push(RegisterPage);
  }

}
