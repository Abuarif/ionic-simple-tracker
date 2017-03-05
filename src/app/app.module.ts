import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ActivitiesPage } from '../pages/activities/activities';
import { ActivityPage } from '../pages/activity/activity';
import { MapPage } from '../pages/map/map';
import { SettingPage } from '../pages/setting/setting';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { ConnectivityService } from '../providers/connectivity-service';
import { User } from '../providers/user';
import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    ActivitiesPage,
    ActivityPage,
    MapPage,
    SettingPage,
    RegistrationPage,
    LoginPage,
    TabsPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ActivitiesPage,
    ActivityPage,
    MapPage,
    SettingPage,
    RegistrationPage,
    LoginPage,
    TabsPage
    
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    ConnectivityService,
    User,
    AuthService
    ]
})
export class AppModule {}
