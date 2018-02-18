import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the Recents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recents',
  templateUrl: 'recents.html'
})
export class RecentsPage {
	public recentChatsRef: any;
	public recentChats: any;
	public unreadMessages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.recentChatsRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/recentChats');
      this.recentChatsRef.orderByChild("timeStamp").on('value', recentConversations => {
      let chats = [];
        recentConversations.forEach( conversation => {
            chats.push(conversation.val());
            this.recentChats = chats;
        });
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentsPage');
  }

}
