import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the Loading provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadingProvider {

	// Loading Provider
	// This is the provider class for most of the loading spinners screens on the app.
 	// Set your spinner/loading indicator type here

  	private spinner = {
    	spinner: 'crescent'
  		};
	private loading;

	constructor(public loadingController: LoadingController) {
    	console.log('Initializing Loading Provider');
  	}


 	//Show loading
 	 show() {
    	if (!this.loading) {
      this.loading = this.loadingController.create(this.spinner);
      this.loading.present();
    	}
  	}

  //Hide loading
  hide() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  } 		

}
