import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EventsPage} from '../events/events';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html'
})


export class EventEditPage {
  public currentWeddingKeyRef: any;
  public currentWeddingKey: any;
  public event: any;
  public eventRef: any;
  public weddingCreatorRef: any;
  public weddingCreator: any;
  public isWeddingCreator: any;
  public alertUser: boolean = false;



  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
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
    }).then((eventRef) => {
      this.eventRef = firebase.database().ref('/Weddings/' + this.currentWeddingKey + '/Events/' + this.event.$key)
    }); 
  }

  saveEvent(name, location, address, date, time, description){
    if((name == null) || (name == "")){
      this.alertUser = true;
    }
    else{
      if(location == null){
        location = "";
      }
      if(address == null){
        address = "";
      }
      if(date == null){
        date = "";
      }
      if(time == null){
        time = "";
      }
      if(description == null){
        description = "";
      }
      this.eventRef.update({
        name: name,
        location: location,
        address: address,
        date: date,
        time: time,
        description: description
      });
      this.navCtrl.pop(EventsPage);
    }
  }


}
