import { Component } from '@angular/core';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {
  process: string;
  latitude: number;
  longitude: number;
  clockTime: any;

  constructor() {}
  
  setActivity(data) {
    this.process = data.process;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.clockTime = data.clockTime;
  }
  
}
