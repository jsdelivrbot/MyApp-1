import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {LoginPage} from '../login/login';
import {EventsPage} from '../events/events';
import {RegistriesPage} from '../registries/registries';
import {AccommodationsPage} from '../accommodations/accommodations';

import firebase from 'firebase';

/*
  Generated class for the Info page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  eventsPage = EventsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.navCtrl = navCtrl;

    firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      navCtrl.setRoot(LoginPage);
    }
      }); 

  }

  goToWeddingEvents(){
  this.navCtrl.push(EventsPage);
  }

  goToWeddingAccommodations(){
  this.navCtrl.push(AccommodationsPage);
  }

  goToWeddingRegistries(){
  this.navCtrl.push(RegistriesPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
