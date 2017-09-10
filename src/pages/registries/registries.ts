import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RegistrydetailsPage} from '../registrydetails/registrydetails';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Registries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registries',
  templateUrl: 'registries.html'
})
export class RegistriesPage {
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public registries: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
  this.currentWeddingKeyRef.once('value', (data) => {
    this.currentWeddingKey = data.val();
    this.registries = af.database.list('/Weddings/' + this.currentWeddingKey + '/Registries');
    });
  }

  goToRegistryDetails(registry){
		this.navCtrl.push(RegistrydetailsPage, { registry: registry });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistriesPage');
  }

}
