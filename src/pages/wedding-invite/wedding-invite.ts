import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-wedding-invite',
  templateUrl: 'wedding-invite.html'
})
export class WeddingInvitePage {
	

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public af: AngularFire) {
  	
  }

//TODO: display weddingName and weddingkey from NavParams
//TODO: navigate to import page on button click


}
