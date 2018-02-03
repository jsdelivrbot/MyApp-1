import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { InfoPage } from '../pages/info/info';
import { RecentsPage } from '../pages/recents/recents';
import { ChatsPage } from '../pages/chats/chats';
import { GroupAddPage } from '../pages/group-add/group-add';
import { GroupchatPage } from '../pages/groupchat/groupchat';
import { EventsPage } from '../pages/events/events';
import { EventsAddPage } from '../pages/events-add/events-add';
import { EventEditPage } from '../pages/event-edit/event-edit';
import { EventdetailsPage } from '../pages/eventdetails/eventdetails';
import { AccommodationsPage } from '../pages/accommodations/accommodations';
import { AccommodationsAddPage } from '../pages/accommodations-add/accommodations-add';
import { AccommodationEditPage } from '../pages/accommodation-edit/accommodation-edit';
import { AccommodationdetailsPage } from '../pages/accommodationdetails/accommodationdetails';
import { RegistriesPage } from '../pages/registries/registries';
import { RegistriesAddPage } from '../pages/registries-add/registries-add';
import { RegistryEditPage } from '../pages/registry-edit/registry-edit';
import { RegistrydetailsPage } from '../pages/registrydetails/registrydetails';
import { PlaylistPage } from '../pages/playlist/playlist';
import { PlaylistdetailsPage } from '../pages/playlistdetails/playlistdetails';
import { SearchmusicPage } from '../pages/searchmusic/searchmusic';
import { SongrequestPage } from '../pages/songrequest/songrequest';
import { PhotosPage } from '../pages/photos/photos';
import { AlbumdetailsPage } from '../pages/albumdetails/albumdetails';
import { PhotoGalleryModel } from '../pages/photo-gallery-model/photo-gallery-model';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { WeddingChoicePage } from '../pages/wedding-choice/wedding-choice';
import { WeddingJoinPage } from '../pages/wedding-join/wedding-join';
import { WeddingCreatePage } from '../pages/wedding-create/wedding-create';
import { WeddingInvitePage } from '../pages/wedding-invite/wedding-invite';
import { WeddingInviteGuestsPage } from '../pages/wedding-invite-guests/wedding-invite-guests';
import { RegisterPage } from '../pages/register/register';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { IntroPage } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth-service';
import { ProfileData } from '../providers/profile-data';
import { LoadingProvider } from '../providers/loading';
import { MusicSearch } from '../providers/music-search';

import { Musicsearchfilter } from '../pipes/musicsearchfilter';



import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAimqUhDlDP3Cz0Ee00bsjNKnrsRJlPuFQ",
  authDomain: "wedup-39904.firebaseapp.com",
  databaseURL: "https://wedup-39904.firebaseio.com",
  storageBucket: "wedup-39904.appspot.com",
  messagingSenderId: "751104826329"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
firebase.initializeApp(firebaseConfig);

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c66d8fb1'
  }
};

@NgModule({
  declarations: [
    MyApp,
    InfoPage,
    RecentsPage,
    ChatsPage,
    GroupAddPage,
    GroupchatPage,
    EventsPage,
    EventsAddPage,
    EventEditPage,
    EventdetailsPage,
    AccommodationsPage,
    AccommodationsAddPage,
    AccommodationEditPage,
    AccommodationdetailsPage,
    RegistriesPage,
    RegistriesAddPage,
    RegistryEditPage,
    RegistrydetailsPage,
    PlaylistPage,
    PlaylistdetailsPage,
    SearchmusicPage,
    SongrequestPage,
    Musicsearchfilter,
    PhotosPage,
    AlbumdetailsPage,
    PhotoGalleryModel,
    ProfilePage,
    LoginPage,
    WeddingChoicePage,
    WeddingJoinPage,
    WeddingCreatePage,
    WeddingInvitePage,
    WeddingInviteGuestsPage,
    RegisterPage,
    ResetpwdPage,
    IntroPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {mode: "md"}),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoPage,
    RecentsPage,
    ChatsPage,
    GroupAddPage,
    GroupchatPage,
    EventsPage,
    EventsAddPage,
    EventEditPage,
    EventdetailsPage,
    AccommodationsPage,
    AccommodationsAddPage,
    AccommodationEditPage,
    AccommodationdetailsPage,
    RegistriesPage,
    RegistriesAddPage,
    RegistryEditPage,
    RegistrydetailsPage,
    PlaylistPage,
    PlaylistdetailsPage,
    SearchmusicPage,
    SongrequestPage,
    PhotosPage,
    AlbumdetailsPage,
    PhotoGalleryModel,
    ProfilePage,
    LoginPage,
    WeddingChoicePage,
    WeddingJoinPage,
    WeddingCreatePage,
    WeddingInvitePage,
    WeddingInviteGuestsPage,
    RegisterPage,
    ResetpwdPage,
    IntroPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, ProfileData, LoadingProvider, MusicSearch]
})
export class AppModule {}
