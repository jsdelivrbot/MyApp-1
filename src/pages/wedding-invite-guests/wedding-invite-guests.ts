import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-wedding-invite-guests',
  templateUrl: 'wedding-invite-guests.html'
})
export class WeddingInviteGuestsPage {
	weddingData;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public af: AngularFire) {
    this.weddingData = navParams.data.weddingData;

  }


  goToTabsPage(){
    this.navCtrl.setRoot(TabsPage);
  }


}
