import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';
import { ImagePicker } from 'ionic-native';

declare var window: any;

/*
  Generated class for the Albumdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-albumdetails',
  templateUrl: 'albumdetails.html'
})
export class AlbumdetailsPage {
  @ViewChild(Content) content: Content;
	album;
  photoList: any;
  photoCountRef: any;
	public limit = 0;
  public newLimit = 10;
  public needMorePhotos = false;
  public photoURL: any;
  public photoRef: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  	this.album = navParams.data.album;
    this.initializePhotos(this.newLimit);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumdetailsPage');
    
  }

  initializePhotos(newLimit){
  this.photoCountRef = firebase.database().ref('/Weddings/0/weddingAlbums/' + this.album.$key + '/albumPhotos').limitToLast(this.newLimit);
    this.photoCountRef.on('value', photoList => {
    let photos = [];
      photoList.forEach( photo => {
        photos.push(photo.val());
      });
      this.photoList = photos;
    });
    this.needMorePhotos = true;
    return this.needMorePhotos;

  }


  loadMorePhotos(limit){
    this.needMorePhotos = false;
    if(this.newLimit == this.photoList.length){
    this.newLimit = this.newLimit + limit;
    this.initializePhotos(this.newLimit);
    this.scrollBottom();
    }
    return this.needMorePhotos;
  }

  private openGallery(){
    let options = {
    maximumImagesCount: 10,
    quality: 100
    }

    ImagePicker.getPictures(options).then((file_uris) => {
      // convert picture to blob
      return this.makeFileIntoBlob(file_uris);
    }).then((imageBlob) => {
      // upload the blob
      return this.uploadToFirebase(imageBlob);
    }).then((uploadSnapshot: any) => {
      // store reference to storage in database
      return this.saveToPhotoAlbum(uploadSnapshot);
    }).then((uploadSnapshot: any) => {
    }, (_error) => {
    alert('Error ' + (_error.message || _error));
    });

  }

  makeFileIntoBlob(file_uris) {

  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(file_uris[0], (fileEntry) => {

      fileEntry.file((resFile) => {

        var reader = new FileReader();
        reader.onloadend = (evt: any) => {
          var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
          imgBlob.name = 'sample.jpg';
          resolve(imgBlob);
        };

        reader.onerror = (e) => {
          console.log('Failed file read: ' + e.toString());
          reject(e);
        };

        reader.readAsArrayBuffer(resFile);
      });
    });
  });
}

uploadToFirebase(imageBlob) {
  var fileName = 'TEST' + '.jpg';

  return new Promise((resolve, reject) => {
    var fileRef = firebase.storage().ref('/Weddings/0/weddingAlbums/' + this.album.$key + '/' + fileName);

    var uploadTask = fileRef.put(imageBlob);

    uploadTask.on('state_changed', (snapshot) => {
      console.log('snapshot progess ' + snapshot);
    }, (error) => {
      reject(error);
    }, () => {
      // completion...
      resolve(uploadTask.snapshot);
    });
  });
}

saveToPhotoAlbum(uploadSnapshot) {
  this.photoURL = uploadSnapshot.downloadURL;
  this.photoRef = firebase.database().ref('/Weddings/0/weddingAlbums/' + this.album.$key + '/albumPhotos/');
  this.photoRef.push({
      photoURL: this.photoURL,
    });

}


  // Scroll to bottom of page after a short delay.
  scrollBottom() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToBottom();
    }, 300);
  }


}
