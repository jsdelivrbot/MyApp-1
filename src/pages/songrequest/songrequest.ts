import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MusicSearch } from '../../providers/music-search';

/*
  Generated class for the Songrequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-songrequest',
  templateUrl: 'songrequest.html',
  providers: [MusicSearch]
})
export class SongrequestPage {
public songName: any;
public artistName: any;
public songs: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public musicSearch: MusicSearch) {
  this.songName = this.navParams.get('song');
  this.artistName = this.navParams.get('artist');
  this.loadSongs();

  }

  loadSongs(){
  		this.musicSearch.load(this.songName, this.artistName)
  			.then(data1 => {
    		this.songs = data1;
    		console.log(this.songs)
  			});
		}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongrequestPage');
    //console.log(this.songName + " " + this.artistName);

  	}

}
