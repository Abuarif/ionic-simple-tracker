import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class User {


  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  isActivated: any = false;
  activation_key: string;
  isCheckedIn: any = false;
  targerServer: string = 'https://mtas.prasarana.com.my';
  tags: any;
  user_id: number;

  constructor(
    private http: Http,
    public storage: Storage) {
    console.log('Hello User Provider');
    this.name = 'Suhaimi Maidin';
    this.staffNumber = 10010060;
    this.email = 'suhaimi.maidin@prasarana.com.my';
    this.department = 'ICT';
    this.baseLocation = 'Subang';
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        // let access = (credentials.password === "pass" && credentials.email === "email");
        let access = this.getAccess(credentials);
        observer.next(access);
        observer.complete();
      });
    }
  }

  getAccess(credentials) {
    let myRequest = this.targerServer
      + '/web_login.json?username=' + credentials.email.split('@')[0]
      + '&password=' + credentials.password;
    console.log('request: ' + myRequest);
    this.http.get(myRequest)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.activation_key = data.key;
        this.user_id = data.user_id;
        if (data.key.length > 0) {
          console.log('1');
          this.isActivated = true;
          console.log(this.isActivated);
          console.log('2');
          this.isSuccessActivation();
        }
      }, error => {
        console.log("Oooops!");
        return false;
      });

  }

  getTags(activation_key: any, limit: number) {
    let myRequest = this.targerServer
      + '/activity.json?key=' + activation_key + '&limit=' + limit;
    return this.http.get(myRequest)
      .map(res => res.json());
  }

  submitTags(direction: any, lat: any, long: any) {
    let myRequest = this.targerServer
      + '/log.json?user_id=' + this.user_id + '&direction=' + direction + '&lat=' + lat + '&long=' + long;
    console.log('request: ' + myRequest);
    return this.http.get(myRequest)
      .map(res => res.json());
  }

  load(activation_key: any, start: number = 0, length: number) {
    let myRequest = this.targerServer
      + '/activity.json?key=' + activation_key + '&start=' + start + '&length=' + length;
    console.log('request: ' + myRequest);

    return new Promise(resolve => {

      this.http.get(myRequest)
        .map(res => res.json())
        .subscribe(data => {

          resolve(data);

        });
    });
  }

  onSave(data) {
    console.log(data);
    this.name = data.name;
    this.staffNumber = data.staffNumber;
    this.email = data.email;
    this.department = data.department;
    this.baseLocation = data.baseLocation;

    this.save('account', data);
  }

  public save(key, data) {
    let newData = JSON.stringify(data);
    this.storage.set(key, newData);
  }

  public getData(key) {
    return this.storage.get(key);
  }

  isSuccessActivation() {
    if (this.isActivated) {
      let successData: any = {'isActivated': this.isActivated, 'activation_key': this.activation_key, 'user_id': this.user_id };

      let activationData = JSON.stringify(successData);
      this.save('activation', activationData);
    }
  }

  onSubmittedAttendance(data) {
    let processData = JSON.stringify(data);
    this.save('process', processData);
  }

  public getBootUpData() {
    let account: any = this.getData('account');
    let activation: any = this.getData('activation');
    let process: any = this.getData('process');

    if (account.length > 0) {
      this.name = account.name;
      this.staffNumber = account.staffNumber;
      this.email = account.email;
      this.department = account.department;
      this.baseLocation = account.baseLocation;
    }

    if (activation.length > 0) {
      this.isActivated = activation.isActivated;
      this.activation_key = activation.activation_key;
      this.user_id = activation.user_id;
    }

    if (process.length > 0) {
      this.isCheckedIn = process.isCheckedIn;
    }
  }

}
