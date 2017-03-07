import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { ActivitiesPage } from '../pages/activities/activities';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { SettingPage } from '../pages/setting/setting';

import { PersonalStatPage } from '../pages/personal-stat/personal-stat';
import { GroupStatPage } from '../pages/group-stat/group-stat';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = TabsPage;
  pages: Array<{ title: string, component: any }>;
  stats: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController
  ) {
    this.presentLoading();
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Profile', component: SettingPage },
      { title: 'Register', component: RegistrationPage },
      { title: 'Attendance History', component: ActivitiesPage },
      { title: 'Activate', component: LoginPage }
    ];

    this.stats = [
      { title: 'Personal', component: PersonalStatPage },
      { title: 'Group', component: GroupStatPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Loading ...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }
}
