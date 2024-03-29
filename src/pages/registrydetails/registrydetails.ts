import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RegistryEditPage} from '../registry-edit/registry-edit';
import firebase from 'firebase';

/*
  Generated class for the Registrydetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registrydetails',
  templateUrl: 'registrydetails.html'
})
export class RegistrydetailsPage {
  public registry: any;
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.registry = navParams.data.registry;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrydetailsPage');
  }

  editRegistry(registry){
    this.navCtrl.push(RegistryEditPage, { registry: registry });
  }

}
