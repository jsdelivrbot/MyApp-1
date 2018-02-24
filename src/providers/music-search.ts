import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MusicSearch provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MusicSearch {
	data1: any;


  constructor(public http: Http) {
    console.log('Hello MusicSearch Provider');

  }

  load(songName, artistName) {
  		//if (this.data1) {
    	// already loaded data
    	//return Promise.resolve(this.data1);
  		//}

  		// don't have the data yet
  		return new Promise(resolve => {
        this.http.get("http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + songName + "&artist=" + artistName + "&limit=25&api_key=bd07137e1c5bd761314625ca6f559afa&format=json")
    	//this.http.get("http://api.musicgraph.com/api/v2/track/search?api_key=026bcbd4dbd37c7795830166fec48013&artist_name=" + artistName + "&title=" + songName + "&limit=25&fields=artist_name,title,track_youtube_id")
      		.map(res => res.json())
      		.subscribe(data => {
        	this.data1 = data.results.trackmatches.track;
        	resolve(this.data1);
      		});
  		});
	}


}
