import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AccommodationEditPage} from '../accommodation-edit/accommodation-edit';
import firebase from 'firebase';

/*
  Generated class for the Accommodationdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accommodationdetails',
  templateUrl: 'accommodationdetails.html'
})
export class AccommodationdetailsPage {
  public accommodation: any;
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.accommodation = navParams.data.accommodation;
    this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
    this.currentWeddingKeyRef.once('value', (data) => {
      this.currentWeddingKey = data.val();
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

  editAccommodation(accommodation){
    this.navCtrl.push(AccommodationEditPage, { accommodation: accommodation });
  }

}
