import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { ActivitiesPage } from '../pages/activities/activities';
import { LoginPage } from '../pages/login/login';
import { SettingPage } from '../pages/setting/setting';

import { PersonalStatPage } from '../pages/personal-stat/personal-stat';
import { GroupStatPage } from '../pages/group-stat/group-stat';

import { User } from '../providers/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = TabsPage;
  pages: Array<{ title: string, component: any, icon: any}>;
  stats: Array<{ title: string, component: any, icon: any}>;
  activate: { title: string, component: any };
  name: string;
  isActivated: any;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public userService: User
  ) {
    this.presentLoading();
    this.name = this.userService.name;
    this.isActivated = this.userService.isActivated;

    this.initializeApp();
    console.log('activation: ' + this.isActivated);
    this.activate = { title: 'Activate', component: LoginPage };

    this.pages = [
      { title: 'Home', component: TabsPage, icon: 'home'},
      { title: 'Profile', component: SettingPage, icon: 'person'},
      { title: 'Attendance History', component: ActivitiesPage, icon: 'list'},
    ];

    this.stats = [
      { title: 'Personal', component: PersonalStatPage, icon: 'person'},
      { title: 'Group', component: GroupStatPage, icon: 'people'},
    ];
  }
  requestForActivation() {
    this.nav.push(LoginPage);
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
    console.log('page: ' + page.component);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Loading ...',
      duration: 1000,
      dismissOnPageChange: true
    }).present();
  }
}
