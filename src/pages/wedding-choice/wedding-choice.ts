import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { WeddingJoinPage } from '../wedding-join/wedding-join';
import { WeddingCreatePage } from '../wedding-create/wedding-create';


@Component({
  selector: 'page-wedding-choice',
  templateUrl: 'wedding-choice.html'
})
export class WeddingChoicePage {

  constructor(public navCtrl: NavController) {

  }

  goToWeddingJoin(){
  	this.navCtrl.push(WeddingJoinPage);

  }

  goToWeddingCreate(){
  	this.navCtrl.push(WeddingCreatePage);

  }

}
