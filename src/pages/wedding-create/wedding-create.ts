import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-wedding-create',
  templateUrl: 'wedding-create.html'
})
export class WeddingCreatePage {
	public weddingCreateForm;
	submitAttempt: boolean = false;
	private weddingName: String;
	public userProfileRef: any;
  public weddingRef: any;
  public newWeddingKey: any;
  public weddingCreator: any;
	private firstLogin: String;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public af: AngularFire) {
  	this.weddingCreateForm = formBuilder.group({
      weddingName: ['', Validators.compose([Validators.required])]
    });
	this.userProfileRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid);
  this.weddingRef = firebase.database().ref('/Weddings');
  }

  createWedding(weddingName){
  	this.submitAttempt = true;
    this.weddingName = weddingName;
    this.weddingCreator = firebase.auth().currentUser.uid;

    if(weddingName = ""){
      this.weddingName = null;
    }
  	
  	if(this.weddingName != null){
      var newWedding = {
      weddingName: this.weddingName,
      weddingCreator: this.weddingCreator
      };

      this.newWeddingKey = this.weddingRef.push().key;
      var updates = {};
      updates[this.newWeddingKey] = newWedding;

      this.weddingRef.update(updates);
      this.navCtrl.push(TabsPage);
      this.navCtrl.setRoot(TabsPage);
      this.firstLogin = "false";
      this.userProfileRef.update({
        firstLogin: this.firstLogin
        });
    }
    else{
      console.log("No Name Entered");
    } 		
  	
  }

}
