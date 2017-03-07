import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { ActivitiesPage } from '../activities/activities';
import { PersonalStatPage } from '../personal-stat/personal-stat';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {

  mapPage = MapPage;
  activitiesPage = ActivitiesPage;
  personalStatPage = PersonalStatPage;

}
