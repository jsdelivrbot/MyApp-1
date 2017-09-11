import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EventdetailsPage} from '../eventdetails/eventdetails';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})


export class EventsPage {
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public events: FirebaseListObservable<any>;
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.currentWeddingKeyRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/currentWedding/');
    this.currentWeddingKeyRef.once('value', (data) => {
      this.currentWeddingKey = data.val();
      this.events = af.database.list('/Weddings/' + this.currentWeddingKey + '/Events');
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

  goToEventDetails(event){
		this.navCtrl.push(EventdetailsPage, { event: event });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');


  }


}
