import { Injectable, Pipe, PipeTransform } from '@angular/core';


/*
  Generated class for the Musicsearchfilter pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'musicsearchfilter',
  pure: false
})
@Injectable()
export class Musicsearchfilter implements PipeTransform {
    transform(values, args?) {
        
      let unfilteredSongList = values;
      let filteredSongList = Array.from(new Set(unfilteredSongList));

      return filteredSongList;

    }

}
