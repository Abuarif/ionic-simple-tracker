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
  templateUrl: 'activities.html',
  // providers: [User]
})
export class ActivitiesPage {
  public services: any = [];
  limit: any = 5;
  activation_key: string;
  private start: number = 5;
  private length: number = 10;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: User) {
    this.activation_key = this.userService.activation_key;
    // this.loadTags();
  }

  loadTags() {
    
    return new Promise(resolve => {
      
      this.userService.load(this.userService.activation_key, this.start, this.length)
      .then(data => {
          // console.log(JSON.stringify(data));
          this.services.push(data);
          // console.log(JSON.stringify(this.services));
        resolve(true);
        
      });
            
    });

  }
  

  doInfinite(infiniteScroll: any) {
    console.log('doInfinite, start is currently ' + this.start);
    this.start += this.length;

    this.loadTags().then(() => {
      infiniteScroll.complete();
    });

  }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.userService.getTags(this.activation_key, this.limit)
      .subscribe(response => {
        this.services = response ;
        // console.log(response);
      });
  }

  changeLimit() {
    this.getTags();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
  }

}
