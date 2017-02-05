import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EventdetailsPage} from '../eventdetails/eventdetails';


import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})


export class EventsPage {
  events: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  this.events = af.database.list('/Events');
  }

  goToEventDetails(event){
		this.navCtrl.push(EventdetailsPage, { event: event });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');


  }


}
