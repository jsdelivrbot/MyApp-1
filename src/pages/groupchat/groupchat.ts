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
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public currentlyChattingRef: any;
  public userProfileRecentChatRef: any;
  public usersToSendRecentNotification: any;
  public userList: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  	this.group = navParams.data.group;
    this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
    this.currentWeddingKeyRef.once('value', (data) => {
      this.currentWeddingKey = data.val();
    }).then((groupChat) => {
    	this.groupChat = af.database.list('/Weddings/' + this.currentWeddingKey + '/weddingGroups/' + this.group.groupId + '/groupChat', {
    		query: {
    			limitToLast: 10
    		}
    	});
  	this.scrollBottom();
    this.currentlyChattingRef = firebase.database().ref('/Weddings/' + this.currentWeddingKey + '/weddingGroups/' + this.group.groupId + '/currentlyChatting/' + firebase.auth().currentUser.uid);
    this.currentlyChatting();
    });
  }

  // Scroll to bottom of page after a short delay.
  scrollBottom() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToBottom();
    }, 300);
  }


  ionViewDidLoad() {
    
  }

  currentlyChatting(){
    this.currentlyChattingRef.update({
      chatting: true,
      userId: firebase.auth().currentUser.uid
      });
  }

  ionViewDidLeave(){
    this.currentlyChattingRef.remove();
  }

  updateUserProfileRecentChats(){
    this.usersToSendRecentNotification = firebase.database().ref('/Weddings/' + this.currentWeddingKey + '/weddingGroups/' + this.group.groupId + '/currentlyChatting');
      this.usersToSendRecentNotification.once('value', (userList) => {
        let users = [];
          userList.forEach( user => {
            users.push(user.val());
          });
        this.userList = users;
        for(let i = 0; i < this.userList.length; i++){
          if(this.userList[i].chatting == false){
            console.log('user: ' + this.userList[i].userId);
            let chatKey = this.group.groupId;
            this.userProfileRecentChatRef = firebase.database().ref('/userProfile/' + this.userList[i].userId + '/recentChats');
            this.userProfileRecentChatRef.update({
              [chatKey]: {
                isUnread: true,
                sender: firebase.auth().currentUser.uid,
                type: 'text',
                photoURL: 'assets/images/profile_avatar.png',
                message: this.newMessage,
                timeStamp: Date.now()
              }
            });
          }
        }
      });
    }
    // this.userProfileRecentChatRef = firebase.database().ref('/userProfile/' + this.userId + '/recentChats');
    // this.userProfileRecentChatRef.push({
    //   sender: firebase.auth().currentUser.uid,
    //   type: 'text',
    //   photoURL: 'assets/images/profile_avatar.png',
    //   message: this.newMessage
    // });
    //}

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
          photoURL: 'assets/images/profile_avatar.png',
          message: this.newMessage
        });
        // Clear messagebox.
        this.updateUserProfileRecentChats();
        this.newMessage = '';
        this.scrollBottom();
    }

  

}
