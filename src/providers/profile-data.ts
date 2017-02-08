import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

/*
  Generated class for the ProfileData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileData {
  userProfile: any;
  currentUser: any;

  constructor(public http: Http) {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

  }

  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  updateName(firstname: string, lastname: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstname: firstname,
      lastname: lastname,
    });
  }

  updateEmail(newEmail: string): any {
    this.currentUser.updateEmail(newEmail).then(() => {
      this.userProfile.child(this.currentUser.uid).update({
        email: newEmail
      });
    }, (error) => {
      console.log(error);
    });
  }

  updateRelationship(data: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      relationship: data,
    });
  }

  updateDescription(description: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      description: description,
    });
  }

}
