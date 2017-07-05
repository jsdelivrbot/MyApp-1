import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

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
  public weddingList = [];
  public weddingListRef: any;
  public currentUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  this.navCtrl = navCtrl;

    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot(LoginPage);
      }
    }); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    this.initializeWeddings();
  }

  initializeWeddings(){
    this.weddingListRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/weddingList');
    this.weddingListRef.on('value', weddingList => {
    let weddings = [];
      weddingList.forEach( wedding => {
        weddings.push(wedding.val());
      });
      this.weddingList = weddings;
      this.events.publish('UPDATE_SIDE_MENU', this.weddingList);
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

}
