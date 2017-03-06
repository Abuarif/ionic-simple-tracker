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
  activation_key: number;
  isCheckedIn: any = false;
  authServer: string = 'https://mtas.prasarana.com.my/web_login';


  constructor(private http: Http) {
    console.log('Hello User Provider');
    this.name = 'Suhaimi Maidin';
    this.staffNumber= 10010060;
    this.email= 'suhaimi.maidin@prasarana.com.my';
    this.department= 'ICT';
    this.baseLocation= 'Subang';
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
    this.http.get(this.authServer 
        + '?username=' + credentials.email.split('@')[0] 
        + '&password=' +  credentials.password)
      .map(res => res.json())
      .subscribe(data => {
      this.isActivated = data;
      // console.log('horay: '+ data);
      // console.log('horay 2: '+ this.isActivated);
      //  if (data == 1) return true;
      
    }, error => {
        console.log("Oooops!");
        return false;
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
