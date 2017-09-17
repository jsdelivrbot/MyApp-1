import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RegistriesPage} from '../registries/registries';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registries-add',
  templateUrl: 'registries-add.html'
})


export class RegistriesAddPage {
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public registries: FirebaseListObservable<any>;
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;
  public alertUser: boolean = false;



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

  saveRegistry(name, website, note){
    if((name == null) || (name == "")){
      this.alertUser = true;
    }
    else{
      if(website == null){
        website = "";
      }
      if(note == null){
        note = "";
      }
      this.registries.push({
        name: name,
        website: website,
        note: note
      });
      this.navCtrl.pop(RegistriesPage);
    }
  }


}
