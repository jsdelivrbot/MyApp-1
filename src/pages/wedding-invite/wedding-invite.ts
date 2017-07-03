import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { TabsPage } from '../tabs/tabs';
import { WeddingInviteGuestsPage } from '../wedding-invite-guests/wedding-invite-guests';

@Component({
  selector: 'page-wedding-invite',
  templateUrl: 'wedding-invite.html'
})
export class WeddingInvitePage {
	weddingData;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public af: AngularFire) {
    this.weddingData = navParams.data.weddingData;
  }

  goToTabsPage(){
    this.navCtrl.setRoot(TabsPage);
  }

  goToContacts(){
    this.navCtrl.push(WeddingInviteGuestsPage, {weddingData: this.weddingData});
  }

}
