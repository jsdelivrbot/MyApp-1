import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
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
	@ViewChild(Content) content: Content;
	group;
	groupChat: FirebaseListObservable<any>;
	private message: any;
	private newMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  	this.group = navParams.data.group;
  	this.groupChat = af.database.list('/Weddings/0/weddingGroups/' + this.group.groupId + '/groupChat', {
  		query: {
  			limitToLast: 10
  		}
  	});
  	this.scrollBottom();
  }

  // Scroll to bottom of page after a short delay.
  scrollBottom() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToBottom();
    }, 300);
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

  send(newMessage) {
  	let newMessages = JSON.parse(JSON.stringify(this.newMessage));
    	this.groupChat.push({
          //date: new Date().toString(),
          sender: firebase.auth().currentUser.uid,
          type: 'text',
          photoURL: 'url',
          message: this.newMessage
        });
        // Clear messagebox.
        this.newMessage = '';
        this.scrollBottom();
    }

  

}
