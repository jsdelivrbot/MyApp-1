import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Registrydetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registrydetails',
  templateUrl: 'registrydetails.html'
})
export class RegistrydetailsPage {
  registry;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.registry = navParams.data.registry;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrydetailsPage');
  }

}
