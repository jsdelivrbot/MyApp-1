import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AccommodationdetailsPage} from '../accommodationdetails/accommodationdetails';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Accommodations page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accommodations',
  templateUrl: 'accommodations.html'
})
export class AccommodationsPage {
  accommodations: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  this.accommodations = af.database.list('/Accommodations');
  }

goToAccomDetails(accommodation){
		this.navCtrl.push(AccommodationdetailsPage, { accommodation: accommodation });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccomodationsPage');
  }

}
