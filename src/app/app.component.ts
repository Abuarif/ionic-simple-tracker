import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(
    platform: Platform,
    public loadingCtrl: LoadingController
    ) {
    
    this.presentLoading();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

    });
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Loading ...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }
}
