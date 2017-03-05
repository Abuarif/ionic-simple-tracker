import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Staff {
  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  isActivated: any = false;
  activation_key: number;
  isCheckedIn: any = false;
  password: any;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: Staff;

  // construct(public userService: User) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        // this.currentUser = new Staff('Suhaimi Maidin', 'suhaimi.maidin@prasarana.com.my');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.name === null) {
      return Observable.throw("Please key in your name ...");
    } else if (credentials.staffNumber === null) {
      return Observable.throw("Please key in your staff number ...");
    } else if (credentials.email === null) {
      return Observable.throw("Please key in your email ...");
    } else if (credentials.department === null) {
      return Observable.throw("Please select your department ...");
    } else if (credentials.baseLocation === null) {
      return Observable.throw("Please select your base location ...");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : Staff {
    console.log(this.currentUser);
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
  
}
