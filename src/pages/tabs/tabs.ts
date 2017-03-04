import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { ActivitiesPage } from '../activities/activities';
import { SettingPage } from '../setting/setting';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {

  mapPage = MapPage;
  activitiesPage = ActivitiesPage;
  settingPage = SettingPage;

}
