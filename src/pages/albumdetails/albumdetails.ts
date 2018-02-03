import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { PhotoGalleryModel } from '../photo-gallery-model/photo-gallery-model';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';
import { ImagePicker } from 'ionic-native';
import { LoadingProvider } from '../../providers/loading';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  photoCountRef: any;
  limitSubject = new BehaviorSubject(10);
  public initialLoad = 10;
  public needMorePhotos = false;
  public photoList: FirebaseListObservable<any>;
  public photoRef: any;
  public photoListRef: any;
  public photoListCount: any;
  public currentWeddingKey: any;
  public timeStamp: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, public loadingProvider: LoadingProvider, public modalCtrl: ModalController) {
    this.loadingProvider.show();
  	this.album = navParams.data.album;
    this.currentWeddingKey = navParams.data.currentWeddingKey;

    this.initializePhotosCount();

    this.photoList = af.database.list('/Weddings/' + this.currentWeddingKey + '/weddingAlbums/' + this.album.albumId + '/albumPhotos', {
      query: {
          orderByChild: 'timeStamp',
          limitToFirst: this.limitSubject
      }
    });

    if(this.initialLoad < this.photoListCount.length) {
        this.needMorePhotos = true;
      }
    else{
        this.needMorePhotos = false;
      }

    this.loadingProvider.hide();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumdetailsPage');
    
  }

  initializePhotosCount(){
    this.photoCountRef = firebase.database().ref('/Weddings/' + this.currentWeddingKey + '/weddingAlbums/' + this.album.albumId + '/albumPhotos');
      this.photoCountRef.on('value', photoListCount => {
        let photosCount = [];
          photoListCount.forEach( photo => {
            photosCount.push(photo.$key);
          });
          this.photoListCount = photosCount;
      });
  }


  loadMorePhotos(newLimit){
    this.loadingProvider.show();

    if(newLimit + 10 < this.photoListCount.length) {
        this.needMorePhotos = true;
      }
    else{
        this.needMorePhotos = false;
      }

    this.limitSubject.next(newLimit + 10);
    this.loadingProvider.hide();
    this.scrollBottom();

  }

  loadHiResPhotos(photo){
      let modal = this.modalCtrl.create(PhotoGalleryModel, { photo: photo });
      modal.present();

  }

  openGallery(){
    let options = {
    maximumImagesCount: 10,
    quality: 100
    }

    ImagePicker.getPictures(options).then((file_uris) => {
      // convert picture to blob
      this.loadingProvider.show();
      for (let i = 0; i < file_uris.length; i++) {
        this.makeFileIntoBlob(file_uris[i]).then((imageBlob) => {
          this.uploadToFirebase(imageBlob).then((uploadSnapshot: any) => {
            // this.saveToPhotoAlbum(uploadSnapshot);
            console.log("Uploaded Photos to Firebase");
          });
        });
      }
      this.loadingProvider.hide();
    }, (_error) => {
    this.loadingProvider.hide();
    alert('Error ' + (_error.message || _error));
    });
  }

  makeFileIntoBlob(file_uris) {

  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(file_uris, (fileEntry) => {

      fileEntry.file((resFile) => {

        var reader = new FileReader();
        reader.onloadend = (evt: any) => {
          var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
          imgBlob.name = resFile.name;
          resolve(imgBlob);
          return(imgBlob);
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
  var fileName = Date.now() + '_' + imageBlob.name;

  return new Promise((resolve, reject) => {
    var fileRef = firebase.storage().ref('/Weddings/' + this.currentWeddingKey + '/weddingAlbums/' + this.album.albumId + '/albumPhotos/' + fileName);

    var uploadTask = fileRef.put(imageBlob);

    uploadTask.on('state_changed', (snapshot) => {
      console.log('snapshot progess ' + snapshot);
    }, (error) => {
      reject(error);
    }, () => {
      // completion...
      resolve(uploadTask.snapshot);
      return(uploadTask.snapshot);
    });
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
