import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Hammer } from "ionic-angular/gestures/hammer";
import firebase from 'firebase';

/*
  Generated class for the Recents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'photo-gallery-model',
  templateUrl: 'photo-gallery-model.html'
})
export class PhotoGalleryModel {
	public photo: any;
	public hammer: any = Hammer;
	public isFired: any;
	public photoRotation: any = 0;
	public photoRef: any;
	public albumId: any;
	public currentWeddingKey: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.photo = navParams.get('photo');
  	this.albumId = navParams.get('albumId');
  	this.currentWeddingKey = navParams.get('currentWeddingKey');
  	this.photoRef = firebase.database().ref('/Weddings/' + this.currentWeddingKey + '/weddingAlbums/' + this.albumId + '/albumPhotos/' + this.photo.$key)

  }

  ionViewDidLoad() {
    let gesture = this.hammer(document.getElementById("photoZoomed"), { direction: this.hammer.DIRECTION_ALL });
	gesture.get('pan').set({ direction: this.hammer.DIRECTION_ALL, threshold: 50 });
	gesture.on('panstart', function(e) {
     this.isFired = false;
	});
	gesture.on('panend', function(e) {
     this.isFired = false;
 	});
	gesture.on('panup pandown', e => {
		if (!this.isFired) {
	        this.isFired = true;
	        this.closeGallery();
    	}
	});
  }

  closeGallery() {
    this.viewCtrl.dismiss();
  }

  rotateImg(rotateDeg){
  	console.log(rotateDeg);
  	if((this.photo.photoRotation + rotateDeg) == 360){
  		this.photo.photoRotation = 0;
  	}
  	else {
  		this.photo.photoRotation = this.photo.photoRotation + rotateDeg;
  	}
  	this.photoRef.update({
        photoRotation: this.photo.photoRotation
      });
  }

}
