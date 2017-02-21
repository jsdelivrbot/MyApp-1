import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';

import { AuthService } from '../providers/auth-service';


export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'app.html',
  providers:[AuthService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  // set our app's pages
  appPages: PageInterface[] = [
    { title: 'My Profile', component: ProfilePage, index: 0, icon: 'person' },
    { title: 'Logout', component: TabsPage, index: 1, icon: 'log-out' },

  ];

  rootPage = IntroPage;

  constructor(platform: Platform, public menu: MenuController, public authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario

    this.menu.close();

    if (page.index !=1) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    }

    else if (page.index = 1){
    //console.log("LOGOUT");
    this.authService.doLogout();
    this.nav.setRoot(LoginPage);
    }

    else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }


  }
}
