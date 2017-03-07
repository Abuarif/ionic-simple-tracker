import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers/user';

/*
  Generated class for the Activities page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html'
})
export class ActivitiesPage {
  services: any;
  limit: any = 5;
  activation_key: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: User) {
    this.activation_key = this.userService.activation_key;
  }

  ngOnInit() {
    this.getTags(this.activation_key, this.limit);
  }

  getTags(activation_key, limit) {
    this.userService.getTags(activation_key, limit)
      .subscribe(response => {
        this.services = response;
        // console.log(response);
      });
  }

  changeLimit() {
    this.getTags(this.activation_key, this.limit);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
  }

}
