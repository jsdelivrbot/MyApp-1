import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-wedding-join',
  templateUrl: 'wedding-join.html'
})
export class WeddingJoinPage {
	public weddingJoinForm;
	submitAttempt: boolean = false;
	private weddingKey: String;
	weddingKeyList: FirebaseListObservable<any>;
	weddingKeyString: String;
	private weddingKeyArray = [];
	keyMatch: boolean = false;
	public userProfileRef: any;
	private firstLogin: String;
	public weddingPeopleRef: any;
	public weddingListRef: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public af: AngularFire) {
  	this.weddingJoinForm = formBuilder.group({
      weddingKey: ['', Validators.compose([Validators.required])]
    });
	this.keyMatch = false;
	this.userProfileRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid);
  }

  joinWedding(weddingKey){
  	this.submitAttempt = true;
  	this.weddingKey = weddingKey;
  	this.weddingPeopleRef = firebase.database().ref('/Weddings/' + this.weddingKey + '/weddingPeople/' + firebase.auth().currentUser.uid + '/');
  	this.weddingListRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/weddingList/' + this.weddingKey + '/');
  	
  	if(this.weddingKey != null){
  	this.weddingKeyList = this.af.database.list('/Weddings', {
  		query: {
  			orderByKey: true,
  			equalTo: this.weddingKey
  		}
  	});
  		this.weddingKeyList.subscribe(keys => {
    		// items is an array
    		keys.forEach(key => {
        		this.weddingKeyArray.push(key.$key);
    			});
    		if(this.weddingKeyArray[0] == this.weddingKey){
    			this.weddingKeyArray = [];
    			this.firstLogin = "false";
            	this.userProfileRef.update({
            		firstLogin: this.firstLogin,
            	});
            	this.weddingListRef.update({
            		weddingKey: this.weddingKey
            	});
            	this.userProfileRef.update({
            		currentWedding: this.weddingKey
            	});
            	this.weddingPeopleRef.update({
            		//Update the weddingPeople with userProfile info
            		personId: firebase.auth().currentUser.uid
            	});
            	this.navCtrl.setRoot(TabsPage);
            	this.navCtrl.push(TabsPage);
    		}
    		else{
    		let alert = this.alertCtrl.create({
          		title: 'Wedding Key not found!',
          		subTitle: 'Ask your wedding creator for a valid wedding key',
          		buttons: ['OK']
          		});
            alert.present();

    		}

		});
  	}
  	
  	
  }

}
