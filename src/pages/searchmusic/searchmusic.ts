import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading';

import { SongrequestPage } from '../songrequest/songrequest';

/*
  Generated class for the Searchmusic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-searchmusic',
  templateUrl: 'searchmusic.html'
})
export class SearchmusicPage {
	public searchForm;
	songChanged: boolean = false;
  	artistChanged: boolean = false;
  	submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder, public loadingProvider: LoadingProvider, public alertCtrl: AlertController) {
  this.searchForm = formBuilder.group({
      song: ['', Validators.compose([Validators.required])],
      artist: ['', Validators.compose([Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  searchMusic(){
    this.submitAttempt = true;

    if (!this.searchForm.valid){
      console.log(this.searchForm.value);
    }
    else if (this.searchForm.valid){
      console.log("Search for Music API Needed Here");
      this.navCtrl.push(SongrequestPage);
    }
    else {
    	console.log("ERROR IN MUSIC SEARCH");
    }
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchmusicPage');
  }

}
