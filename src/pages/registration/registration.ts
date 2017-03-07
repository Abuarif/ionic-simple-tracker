import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import { LoginPage } from '../login/login';
import { MapPage } from '../map/map';
import { User } from '../../providers/user';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  createSuccess = false;
  // registerCredentials = {email: '', password: ''};
  registerCredentials = {
    name: '',
    staffNumber: '',
    email: '',
    department: '',
    baseLocation: '',
    isActivated: '',
    activation_key: '',
    isCheckedIn: ''
  };
  depts = ['ICT', 'Dept 2', 'Dept 3'];
  baseLocations = ['Subang', 'Bangsar', 'Cheras Selatan'];

  constructor(
    public navCtrl: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    public userService: User
  ) { }

  goToRoot() {
    this.navCtrl.push(MapPage);
  }

  resetForm() {
    // to be implemented 
  }
  public register() {
    this.auth.register(this.registerCredentials)
      .subscribe(success => {
        if (success) {
          this.createSuccess = true;
          // this.showPopup("Success", "Account created.");
          this.userService.onSave(this.registerCredentials);
          this.userService.isActivated = false;
          this.navCtrl.push(LoginPage);
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.push(LoginPage);
            }
          }
        }
      ]
    });
    alert.present();
  }
}