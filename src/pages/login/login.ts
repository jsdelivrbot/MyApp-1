import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import firebase from 'firebase';

import { RegisterPage } from '../register/register';
import { ResetpwdPage } from '../resetpwd/resetpwd';
import { WeddingChoicePage } from '../wedding-choice/wedding-choice'
import { TabsPage } from '../tabs/tabs';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  public firstLoginRef: any;
  public firstLogin: any;

  constructor(public navCtrl: NavController, public authService: AuthService, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
    
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  resetPwd(){
    this.navCtrl.push(ResetpwdPage);
  }


  loginUser(){
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then( authService => {
        
        this.firstLoginRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/firstLogin');
        
        this.firstLoginRef.once('value', (data) => {
        this.firstLogin = data.val();
          // You need an IF statement for firstLogin to forward to create/join page else goto InfoPage
          if (this.firstLogin == "true"){
            console.log("TRUE");
            this.navCtrl.setRoot(LoginPage);
            this.navCtrl.push(WeddingChoicePage);

          }
          else if (this.firstLogin == "false"){
            console.log("FALSE");
            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.push(TabsPage);
          }
          else {
            console.error("OTHER");
            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.push(TabsPage);
          }
        
        });


      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
