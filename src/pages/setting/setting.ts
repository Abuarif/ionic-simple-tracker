import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App, ViewController, AlertController, ActionSheetController } from 'ionic-angular'; 

import { User } from '../../providers/user';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  personalData: {
    name: string,
    staffNumber: number,
    email: string,
    department: string,
    baseLocation: string,
    isActivated: any,
    activation_key: any,
    isCheckedIn: any
  };

  constructor(
    public appCtrl: App,
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public userService: User,
    private auth: AuthService
    ) {
      this.personalData = this.userService;
      this.personalData.isActivated = this.userService.isActivated;
    }

  public pushPage(pageToPush) {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(pageToPush);
  }
  
  public isActivatedAccount() {

    if (this.personalData.isActivated) {
      this.personalData.isActivated == false;
    } else {
      this.personalData.isActivated == true;
    }
    console.log('name: ' + this.personalData.name);
    console.log('isActivated: ' + this.personalData.isActivated);
  }

  saveUserSettings(data) {
    console.log(data);
    this.userService.onSave(data);
    this.personalData = data;

    this.personalData.name = data.name;
    this.personalData.staffNumber = data.staffNumber;
    this.personalData.email = data.email;
    this.personalData.department = data.department;
    this.personalData.baseLocation = data.baseLocation;

  }

  registerUser() {
    this.navCtrl.push(RegistrationPage);
  }

  requestForActivation() {
    this.navCtrl.push(LoginPage);
  }
  
  public logout() {
    this.auth.logout().subscribe(succ => {
        this.navCtrl.setRoot(TabsPage)
    });
  }
}
