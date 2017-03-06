import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AlbumdetailsPage} from '../albumdetails/albumdetails';

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
	albums: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  	this.albums = af.database.list('/Weddings/0/weddingAlbums');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }

  goToAlbumDetails(album){
		this.navCtrl.push(AlbumdetailsPage, { album: album });
	}

}
