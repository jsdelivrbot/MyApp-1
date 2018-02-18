import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ActionSheetController } from 'ionic-angular';
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
	public currentUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
  	this.photo = navParams.get('photo');
  	this.albumId = navParams.get('albumId');
  	this.currentWeddingKey = navParams.get('currentWeddingKey');
  	this.photoRef = firebase.database().ref('/Weddings/' + this.currentWeddingKey + '/weddingAlbums/' + this.albumId + '/albumPhotos/' + this.photo.$key)
  	this.currentUser = firebase.auth().currentUser.uid;
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
	gesture.on('press', e => {
        this.photoActionSheet();
	});
  }

  closeGallery() {
    this.viewCtrl.dismiss();
  }

  rotateImg(rotateDeg){
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

  makeProfilePic(){
  	console.log(this.photo.hiRes);
  }

  deletePhoto(){
  	this.photoRef.remove();
  	this.closeGallery();
  }

  deleteAlert(){
  	let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to delete this picture?',
      message: 'Your picure will be permanetly removed',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'delete',
          handler: () => {
            console.log('Delete clicked');
            this.deletePhoto();
          }
        }
      ]
    });
    confirm.present();
  }

  photoActionSheet(){
	  	let actionSheet = this.actionSheetCtrl.create({
	      buttons: [
	        {
	          text: 'Delete Photo',
	          role: 'destructive',
	          handler: () => {
	            this.deleteAlert();
	          }
	        },{
	          text: 'Share to Facebook',
	          handler: () => {
	            console.log('Share to Facebook clicked');
	          }
	        },{
	          text: 'Share to Twitter',
	          handler: () => {
	          	console.log('Share to Twitter clicked');
	          }
	        },{
	          text: 'Share to Instagram',
	          handler: () => {
	          	console.log('Share to Instragram clicked');
	          }   
	        },{
	          text: 'Cancel',
	          role: 'cancel',
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        }
	      ]
	    });
	    actionSheet.present();
	  }

}
