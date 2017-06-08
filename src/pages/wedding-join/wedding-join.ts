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

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public af: AngularFire) {
  	this.weddingJoinForm = formBuilder.group({
      weddingKey: ['', Validators.compose([Validators.required])]
    });
	this.keyMatch = false;
  }

  joinWedding(weddingKey){
  	this.submitAttempt = true;
  	this.weddingKey = weddingKey;
  	
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
    			this.navCtrl.setRoot(TabsPage);
            	this.navCtrl.push(TabsPage);
            	//TODO: Push to firebase to update firstLogin variable to false
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
