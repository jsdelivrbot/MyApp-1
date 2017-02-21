import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MusicSearch } from '../../providers/music-search';
import firebase from 'firebase';
import { LoadingProvider } from '../../providers/loading';
import { Musicsearchfilter } from '../../pipes/musicsearchfilter';
import {PlaylistPage} from '../playlist/playlist';

/*
  Generated class for the Songrequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-songrequest',
  templateUrl: 'songrequest.html',
  providers: [MusicSearch]
})
export class SongrequestPage {
public songName: any;
public artistName: any;
public songs: any;
public songList: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public musicSearch: MusicSearch, public loadingProvider: LoadingProvider) {
  this.songName = this.navParams.get('song');
  this.artistName = this.navParams.get('artist');
  this.loadingProvider.show();
  this.loadSongs();
  this.songList = firebase.database().ref('/Songs');

  }

	loadSongs(){
  		this.musicSearch.load(this.songName, this.artistName)
  			.then(data1 => {
    		this.songs = data1;
    		this.loadingProvider.hide();
  			});
	}

	addSongRequest(title: string, artist_name: string, track_youtube_id: string) {
		this.loadingProvider.show();
    	this.songList.push({
    	name: title,
    	artist: artist_name,
    	songphoto: track_youtube_id,
    	});
    	this.navCtrl.push(PlaylistPage);
    	this.navCtrl.setRoot(PlaylistPage);
    	this.loadingProvider.hide();

	}	

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongrequestPage');
    //console.log(this.songName + " " + this.artistName);

  	}

}
