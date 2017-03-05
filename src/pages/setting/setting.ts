import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, ActionSheetController } from 'ionic-angular'; 

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
    activation_key: number,
    isCheckedIn: any
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public userService: User,
    private auth: AuthService
    ) {
      this.personalData = userService;
      let info = this.auth.getUserInfo();
      console.log('info' + info);
      // this.personalData.name = info.name;
      // this.personalData.email = info.email;
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

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your settings',
      buttons: [
        {
          text: 'Register',
          role: 'register',
          handler: () => {
            this.registerUser();
          }
        },{
          text: 'Activate',
          handler: () => {
            this.requestForActivation();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.navCtrl.setRoot(TabsPage)
    });
  }
}
