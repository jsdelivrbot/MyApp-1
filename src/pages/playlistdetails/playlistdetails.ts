import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Playlistdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-playlistdetails',
  templateUrl: 'playlistdetails.html'
})
export class PlaylistdetailsPage {
	song;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.song = navParams.data.song;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistdetailsPage');
  }

}
