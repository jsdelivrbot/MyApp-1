import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MusicSearch } from '../../providers/music-search';
import { LoadingProvider } from '../../providers/loading';
import { Musicsearchfilter } from '../../pipes/musicsearchfilter';
import {PlaylistPage} from '../playlist/playlist';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

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
public currentWeddingKeyRef: any;
public currentWeddingKey: any;
public songList: FirebaseListObservable<any>;
public songId: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public musicSearch: MusicSearch, public loadingProvider: LoadingProvider, af: AngularFire) {
  this.songName = this.navParams.get('song');
  this.artistName = this.navParams.get('artist');
  this.loadingProvider.show();
  this.loadSongs();
  this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
  this.currentWeddingKeyRef.once('value', (data) => {
    this.currentWeddingKey = data.val();
    this.songList = af.database.list('/Weddings/' + this.currentWeddingKey + '/Songs');
    });

  }

	loadSongs(){
    if(this.songName == null || this.songName == ""){
      this.songName = " ";
    }
		this.musicSearch.load(this.songName, this.artistName)
			.then(data1 => {
  		this.songs = data1;
  		this.loadingProvider.hide();
			});
	}


	addSongRequest(song: string, artist: string, photoURL: string) {
		this.loadingProvider.show();

    var songId = this.songList.push({
    song: song,
    artist: artist,
    photoURL: photoURL
    }).key;

    this.songList.update(songId, {songId: songId});


  	//this.navCtrl.push(PlaylistPage);
  	this.navCtrl.setRoot(PlaylistPage);
  	this.loadingProvider.hide();


	}	

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongrequestPage');
    //console.log(this.songName + " " + this.artistName);

  	}

}
