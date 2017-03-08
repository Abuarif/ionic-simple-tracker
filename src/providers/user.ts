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
  staff_id:number;
  isCheckedIn: any = false;
  targerServer: string = 'https://mtas.prasarana.com.my';
  tags: any;

  constructor(private http: Http) {
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
        console.log('data: ' + JSON.stringify(data));
        this.activation_key = data.key;
        this.staff_id = data.staff_id;
        if (this.activation_key != '') this.isActivated = true;
      }, error => {
        console.log("Oooops!");
        return false;
      });

  }

  // public getActivities(credentials) {
  //   if (credentials.key === null) {
  //     return Observable.throw("Please insert credentials");
  //   } else {
  //     return Observable.create(observer => {
  //       // At this point make a request to your backend to make a real check!
  //       // let access = (credentials.password === "pass" && credentials.email === "email");
  //       let access = this.getTags(credentials);
  //       observer.next(access);
  //       observer.complete();
  //     });
  //   }
  // }

  // getTags(credentials) {
  //   let myRequest = this.targerServer
  //     + 'activity.json?key=' + credentials.key;
  //   console.log('request: ' + myRequest);
  //   this.http.get(myRequest)
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       this.tags = data;
  //       console.log('tags: ' + data);

  //     }, error => {
  //       console.log("Oooops!");
  //       return false;
  //     });

  // }

  getTags(activation_key: any, limit:number ) {
    let myRequest = this.targerServer
      // + '/activity.json?key=' + activation_key + '&start=' + start + '&length=' + length;
      + '/activity.json?key=' + activation_key + '&limit=' + limit;
    console.log('request: ' + myRequest);
    return this.http.get(myRequest)
      .map(res => res.json());
  }

  load(activation_key: any, start:number=0, length: number) {
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
  }

  isSuccessActivation(data) {
    this.isActivated = true;
    this.activation_key = data;
  }

  onSubmitAttendance(process) {
    this.isCheckedIn = process;
  }
}
