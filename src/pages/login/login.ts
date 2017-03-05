import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { User } from '../../providers/user';
import { RegistrationPage } from '../registration/registration';
import { SettingPage } from '../setting/setting';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  activationSuccess = false;
  loading: Loading;
  registerCredentials = {email: '', password: ''};
 
  constructor(
    private nav: NavController, 
    private auth: AuthService, 
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    private userService: User ) {}
 
  setInput() {
    this.registerCredentials.email = this.userService.email;
  }
  public createAccount() {
    this.nav.push(RegistrationPage);
  }

  public activateAccount() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
        this.loading.dismiss();
        this.userService.isSuccessActivation('ok');
        this.nav.setRoot(SettingPage)
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}