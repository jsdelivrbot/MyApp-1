import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  public fireAuth: any;
  public userProfile: any;

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  doLogin(email: string, password: string): any {
  return this.fireAuth.signInWithEmailAndPassword(email, password);
}

  register(email: string, firstname: string, lastname: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set({email: email, firstname: firstname, lastname: lastname});
    });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  doLogout(): any {
    return this.fireAuth.signOut();
  }

}
