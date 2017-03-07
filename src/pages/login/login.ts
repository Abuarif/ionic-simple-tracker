import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { User } from '../../providers/user';
import { RegistrationPage } from '../registration/registration';
import { TabsPage } from '../tabs/tabs';
 
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
    this.userService.login(this.registerCredentials)
    .subscribe(allowed => {
      setTimeout(() => {
        if (this.userService.isActivated) {
          setTimeout(() => {
          this.loading.dismiss();
          this.userService.isSuccessActivation('ok');
          // this.nav.popToRoot();
          this.nav.push(TabsPage);
          },6000);
        } 
      }, 3000);
      
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
      title: 'System Alert',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}