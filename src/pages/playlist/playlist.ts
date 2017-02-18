import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PlaylistdetailsPage} from '../playlistdetails/playlistdetails';


import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Playlist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})


export class PlaylistPage {
	songs: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
	this.songs = af.database.list('/Songs');
  }

    goToPlaylistDetails(song){
		this.navCtrl.push(PlaylistdetailsPage, { song: song });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }


}
