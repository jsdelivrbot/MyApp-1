import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Hammer } from "ionic-angular/gestures/hammer";

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
	hammer: any = Hammer;
	isFired: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.photo = navParams.get('photo');
  	console.log(this.photo);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad photo-gallery-model');
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

}
