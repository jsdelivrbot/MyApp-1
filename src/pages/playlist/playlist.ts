import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PlaylistdetailsPage} from '../playlistdetails/playlistdetails';
import {SearchmusicPage} from '../searchmusic/searchmusic';
import firebase from 'firebase';

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

	goToSearchMusicPage(){
		this.navCtrl.push(SearchmusicPage);
	}

	deleteSongRequest(songId: string){
  		this.songs.remove(songId);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }


}
