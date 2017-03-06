import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { ImagePicker } from 'ionic-native';

/*
  Generated class for the Albumdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-albumdetails',
  templateUrl: 'albumdetails.html'
})
export class AlbumdetailsPage {
  @ViewChild(Content) content: Content;
	album;
	photos: FirebaseListObservable<any>;
	photoLimit = new Subject<number>();
	public limit = 2;


  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  	this.album = navParams.data.album;
  	this.photos = af.database.list('/Weddings/0/weddingAlbums/' + this.album.$key + '/albumPhotos', {
  		query: {
  			limitToLast: this.photoLimit
  		}
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumdetailsPage');
    this.loadMorePhotos(8);
    
  }

  loadMorePhotos(limit){
    this.limit = this.limit + limit;
  	this.photoLimit.next(this.limit);
    this.scrollBottom();
  }


  // Scroll to bottom of page after a short delay.
  scrollBottom() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToBottom();
    }, 300);
  }


}
