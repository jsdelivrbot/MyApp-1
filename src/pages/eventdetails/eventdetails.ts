import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/*
  Generated class for the Eventdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html'
})
export class EventdetailsPage {
  event;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.event = navParams.data.event;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventdetailsPage');
  }

}
