import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
	photos: FirebaseListObservable<any[]>;
	photoLimit: Subject<any>;
	public limit = 0;
  photoCountRef: any;
  photoList: any;
  photoCount: any;
  rows: any;
  public newLimit = 10;
  public needMorePhotos = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  	this.album = navParams.data.album;
    this.photoLimit = new Subject();
    this.initializePhotos(this.newLimit);
    /*this.photoCountRef = firebase.database().ref('/Weddings/0/weddingAlbums/' + this.album.$key + '/albumPhotos').limitToLast(this.newLimit);
    this.photoCountRef.on('value', photoList => {
    let photos = [];
      photoList.forEach( photo => {
        photos.push(photo.val());
      });
      this.photoList = photos;
    });*/
    //console.log(this.photoList.length);
    //this.rows = (this.photoList.length / 2);

  	/*this.photos = af.database.list('/Weddings/0/weddingAlbums/' + this.album.$key + '/albumPhotos', {
  		query: {
  			limitToLast: this.photoLimit
  		}
  	});*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumdetailsPage');
    //this.loadMorePhotos(8);
    
  }

  initializePhotos(newLimit){
  this.photoCountRef = firebase.database().ref('/Weddings/0/weddingAlbums/' + this.album.$key + '/albumPhotos').limitToLast(this.newLimit);
    this.photoCountRef.on('value', photoList => {
    let photos = [];
      photoList.forEach( photo => {
        photos.push(photo.val());
      });
      this.photoList = photos;
    });
    this.needMorePhotos = true;
    return this.needMorePhotos;

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 300; i++) {
        this.photoList.push( this.newLimit );
      }

      console.log('Async operation has ended');
      this.newLimit = this.newLimit + 1;
      this.initializePhotos(this.newLimit);
      infiniteScroll.complete();
    }, 500);
  }

  loadMorePhotos(limit){
    //this.limit = this.limit + limit;
    this.needMorePhotos = false;
    if(this.newLimit == this.photoList.length){
    this.newLimit = this.newLimit + limit;
    console.log(this.newLimit + ' ' + this.photoList.length);
    this.initializePhotos(this.newLimit);
  	//this.photoLimit.next(this.limit);
    this.scrollBottom();
    }
    return this.needMorePhotos;
  }


  // Scroll to bottom of page after a short delay.
  scrollBottom() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToBottom();
    }, 300);
  }


}
