import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EventEditPage} from '../event-edit/event-edit';
import firebase from 'firebase';


/*
  Generated class for the Eventdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html'
})
export class EventdetailsPage {
  public event: any;
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.event = navParams.data.event;
  this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
    this.currentWeddingKeyRef.once('value', (data) => {
      this.currentWeddingKey = data.val();
    }).then((weddingCreator) => {
      this.weddingCreatorRef = firebase.database().ref('/Weddings/' + this.currentWeddingKey + '/weddingCreator/');
        this.weddingCreatorRef.once('value', (data1) => {
          this.weddingCreator = data1.val();
            if(JSON.stringify(firebase.auth().currentUser.uid) == JSON.stringify(this.weddingCreator)){
              this.isWeddingCreator = true;
            }
        });
    });
  }

  editEvent(event){
    this.navCtrl.push(EventEditPage, { event: event });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventdetailsPage');
  }

}
