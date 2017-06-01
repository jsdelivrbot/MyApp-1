import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-wedding-join',
  templateUrl: 'wedding-join.html'
})
export class WeddingJoinPage {
	public weddingJoinForm;
	submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
  	this.weddingJoinForm = formBuilder.group({
      weddingKey: ['', Validators.compose([Validators.required])]
    });
  }

  joinWedding(){
  	this.submitAttempt = true;
  	//TODO: read from firebase the wedding keys, then if doesnt match alert the user their key does not match. Else, goto TabsPage for matching wedding info. 
  	console.log("TODO: compare weddingKey to firebase weddingKeyList then if match goto TabsPage for Wedding, else alert that no wedding with that key exists")
  	
  }

}
