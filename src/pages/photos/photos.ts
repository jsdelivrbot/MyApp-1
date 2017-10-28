import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlbumdetailsPage} from '../albumdetails/albumdetails';
import { LoadingProvider } from '../../providers/loading';
import { Events } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the Photos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class PhotosPage {
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public albumsRef: any;
  public albumList: any;
  public albums: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, public events: Events, public loadingProvider: LoadingProvider) {
  	this.loadingProvider.show();
    this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
    this.currentWeddingKeyRef.once('value', (data) => {
      this.currentWeddingKey = data.val();
    }).then((weddingAlbums) => {
      this.initializeAlbums(this.currentWeddingKey);
      this.loadingProvider.hide();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }

  ionViewWillEnter() {
    this.events.subscribe("SET_CURRENT_WEDDING_KEY", (currentWeddingKey) => {
      this.initializeAlbums(currentWeddingKey);
    });
  }

  initializeAlbums(currentWeddingKey){
    this.albumsRef = firebase.database().ref('/Weddings/' + currentWeddingKey + '/weddingAlbums');
      this.albumsRef.on('value', (albumList) => {
        let albums = [];
          albumList.forEach( album => {
            albums.push(album.val());
          });
        this.albumList = albums;
      });
  }

  goToAlbumDetails(album){
		this.navCtrl.push(AlbumdetailsPage, { album: album, currentWeddingKey: this.currentWeddingKey });
	}

}
