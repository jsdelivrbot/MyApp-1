import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AccommodationdetailsPage} from '../accommodationdetails/accommodationdetails';
import {AccommodationsAddPage} from '../accommodations-add/accommodations-add';
import {AccommodationEditPage} from '../accommodation-edit/accommodation-edit';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Accommodations page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accommodations',
  templateUrl: 'accommodations.html'
})
export class AccommodationsPage {
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public accommodations: FirebaseListObservable<any>;
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
    this.currentWeddingKeyRef.once('value', (data) => {
      this.currentWeddingKey = data.val();
      this.accommodations = af.database.list('/Weddings/' + this.currentWeddingKey + '/Accommodations');
    }).then((weddingCreator) => {
    this.weddingCreatorRef = firebase.database().ref('/Weddings/' + this.currentWeddingKey + '/weddingCreator/');
      this.weddingCreatorRef.once('value', (data1) => {
        this.weddingCreator = data1.val();
          if(JSON.stringify(firebase.auth().currentUser.uid) == JSON.stringify(this.weddingCreator)){
            this.isWeddingCreator = true;
          }
      });
    });
  }

goToAccomDetails(accommodation){
		this.navCtrl.push(AccommodationdetailsPage, { accommodation: accommodation });
	}

addAccommodations(){
  this.navCtrl.push(AccommodationsAddPage);
}

deleteAccommodation(accommodation){
  this.accommodations.remove(accommodation);
}

editAccommodation(accommodation){
  this.navCtrl.push(AccommodationEditPage, { accommodation: accommodation });
}  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccomodationsPage');
  }

}
