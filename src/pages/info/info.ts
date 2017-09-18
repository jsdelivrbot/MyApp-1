import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading';

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
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public selectedWeddingRef: any;
  public wedding: any;
  public weddingName: any;
  public infoDataLoaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingProvider: LoadingProvider) {
  this.navCtrl = navCtrl;

    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot(LoginPage);
      }
    }); 

    this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
    this.currentWeddingKeyRef.once('value', (data) => {
      this.currentWeddingKey = data.val();
    }).then((selectedWeddingName) => {
    this.selectedWeddingRef = firebase.database().ref('/Weddings/' + this.currentWeddingKey);
      this.selectedWeddingRef.once('value', (data1) => {
        this.weddingName = data1.val().weddingName;
      });
    }); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    this.initializeWeddings();
  }

  ionViewWillEnter() {
    this.events.subscribe("SET_CURRENT_WEDDING_KEY", (weddingKey) => {
      this.selectedWeddingRef = firebase.database().ref('/Weddings/' + weddingKey);
      this.selectedWeddingRef.once('value', (data2) => {
        this.weddingName = data2.val().weddingName;
      });
    });
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
