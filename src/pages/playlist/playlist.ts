import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading';
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
	public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public songsRef: any;
  public songList: any;
  public songs: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, public loadingProvider: LoadingProvider, public events: Events) {
    this.loadingProvider.show();
    this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
    this.currentWeddingKeyRef.once('value', (data) => {
      this.currentWeddingKey = data.val();
      }).then((initializeSongs) => { 
          this.initializeSongs(this.currentWeddingKey);
          this.loadingProvider.hide();
        });
    }

  ionViewWillEnter() {
    this.events.subscribe("SET_CURRENT_WEDDING_KEY", (currentWeddingKey) => {
      this.initializeSongs(currentWeddingKey);
    });
  }

  initializeSongs(currentWeddingKey){
    this.songsRef = firebase.database().ref('/Weddings/' + currentWeddingKey + '/Songs');
      this.songsRef.on('value', (songList) => {
        let songs = [];
          songList.forEach( song => {
            songs.push(song.val());
          });
        this.songList = songs;
      });

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
