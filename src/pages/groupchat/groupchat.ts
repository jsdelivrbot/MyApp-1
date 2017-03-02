import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the Groupchat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html'
})
export class GroupchatPage {
	group;
	groupChat: FirebaseListObservable<any>;
	private message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  	this.group = navParams.data.group;
  	this.groupChat = af.database.list('/Weddings/0/weddingGroups/' + this.group.groupId + '/groupChat');
  	console.log(JSON.stringify(this.group.groupId));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');
  }

  // Check if the user is the sender of the message.
  isSender(message) {
    if (message.sender == firebase.auth().currentUser.uid) {
      return true;
    } else {
      return false;
    }
  }

  

}
