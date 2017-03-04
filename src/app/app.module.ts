import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ActivitiesPage } from '../pages/activities/activities';
import { ActivityPage } from '../pages/activity/activity';
import { MapPage } from '../pages/map/map';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';

import { ConnectivityService } from '../providers/connectivity-service';


@NgModule({
  declarations: [
    MyApp,
    ActivitiesPage,
    ActivityPage,
    MapPage,
    SettingPage,
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
    TabsPage
    
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    ConnectivityService
    ]
})
export class AppModule {}
