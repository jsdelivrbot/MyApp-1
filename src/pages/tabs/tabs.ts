import { Component } from '@angular/core';

import { InfoPage } from '../info/info';
import { RecentsPage } from '../recents/recents';
import { ChatsPage } from '../chats/chats';
import { PlaylistPage } from '../playlist/playlist';
import { PhotosPage } from '../photos/photos';
import firebase from 'firebase';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = InfoPage;
  tab2Root: any = RecentsPage;
  tab3Root: any = ChatsPage;
  tab4Root: any = PlaylistPage;
  tab5Root: any = PhotosPage;
  public recentChatsRef: any;
  public totalNumOfUnreadChats: any;



  constructor() {
    this.recentChatsRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/recentChats');
      this.recentChatsRef.on('value', unreadChats => {
      let chats = [];
        unreadChats.forEach( chat => {
          if(chat.val().isUnread == true){
            chats.push(chat.val());
          }
        });
        this.totalNumOfUnreadChats = chats.length;
      });
  }





}
