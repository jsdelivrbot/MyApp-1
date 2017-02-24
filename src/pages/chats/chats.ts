import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { LoadingProvider } from '../../providers/loading';
import { GroupAddPage } from '../group-add/group-add';

/*
  Generated class for the Chats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
	groups: FirebaseListObservable<any>;
	private people: FirebaseListObservable<any>;
	userProfile: any;
	chatType: string = "groups";

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  this.groups = af.database.list('/Groups');
  this.people = af.database.list('/userProfile/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

  goToGroupAddPage(){
  this.navCtrl.push(GroupAddPage);

  }

}
