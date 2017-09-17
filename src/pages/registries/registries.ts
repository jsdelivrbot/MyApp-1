import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RegistrydetailsPage} from '../registrydetails/registrydetails';
import {RegistriesAddPage} from '../registries-add/registries-add';
import {RegistryEditPage} from '../registry-edit/registry-edit';
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
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
  this.currentWeddingKeyRef.once('value', (data) => {
    this.currentWeddingKey = data.val();
    this.registries = af.database.list('/Weddings/' + this.currentWeddingKey + '/Registries');
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

  goToRegistryDetails(registry){
		this.navCtrl.push(RegistrydetailsPage, { registry: registry });
	}

  addRegistry(){
    this.navCtrl.push(RegistriesAddPage);
  }

  deleteRegistry(registry){
  this.registries.remove(registry);
  }

  editRegistry(registry){
  this.navCtrl.push(RegistryEditPage, { registry: registry });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistriesPage');
  }

}
