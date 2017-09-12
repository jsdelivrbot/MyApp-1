import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AccommodationsPage} from '../accommodations/accommodations';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accommodations-add',
  templateUrl: 'accommodations-add.html'
})


export class AccommodationsAddPage {
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public accommodations: FirebaseListObservable<any>;
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;
  public alertUser: boolean = false;



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

  saveEvent(name, address, website, description){
    if((name == null) || (name == "")){
      this.alertUser = true;
    }
    else{
      if(address == null){
        address = "";
      }
      if(website == null){
        website = "";
      }
      if(description == null){
        description = "";
      }
      this.accommodations.push({
        name: name,
        address: address,
        website: website,
        description: description
      });
      this.navCtrl.pop(AccommodationsPage);
    }
  }


}
