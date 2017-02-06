import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { InfoPage } from '../pages/info/info';
import { RecentsPage } from '../pages/recents/recents';
import { ChatsPage } from '../pages/chats/chats';
import { EventsPage } from '../pages/events/events';
import { EventdetailsPage } from '../pages/eventdetails/eventdetails';
import { AccommodationsPage } from '../pages/accommodations/accommodations';
import { AccommodationdetailsPage } from '../pages/accommodationdetails/accommodationdetails';
import { RegistriesPage } from '../pages/registries/registries';
import { RegistrydetailsPage } from '../pages/registrydetails/registrydetails';
import { PlaylistPage } from '../pages/playlist/playlist';
import { PhotosPage } from '../pages/photos/photos';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { IntroPage } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth-service';
import { ProfileData } from '../providers/profile-data';
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
    EventsPage,
    EventdetailsPage,
    AccommodationsPage,
    AccommodationdetailsPage,
    RegistriesPage,
    RegistrydetailsPage,
    PlaylistPage,
    PhotosPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    IntroPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoPage,
    RecentsPage,
    ChatsPage,
    EventsPage,
    EventdetailsPage,
    AccommodationsPage,
    AccommodationdetailsPage,
    RegistriesPage,
    RegistrydetailsPage,
    PlaylistPage,
    PhotosPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    IntroPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, ProfileData]
})
export class AppModule {}
