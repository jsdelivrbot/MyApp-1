import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {RegistrydetailsPage} from '../registrydetails/registrydetails';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Registries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registries',
  templateUrl: 'registries.html'
})
export class RegistriesPage {
  registries: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  this.registries = af.database.list('/Registries');
  }

  goToRegistryDetails(registry){
		this.navCtrl.push(RegistrydetailsPage, { registry: registry });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistriesPage');
  }

}
