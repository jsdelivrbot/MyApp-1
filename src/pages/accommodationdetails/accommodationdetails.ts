import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Accommodationdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accommodationdetails',
  templateUrl: 'accommodationdetails.html'
})
export class AccommodationdetailsPage {
accommodation

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.accommodation = navParams.data.accommodation;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccommodationdetailsPage');
  }

}
