import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Staff {
  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  isActivated: any = false;
  activation_key: string;
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
  data: any;
  headers = {
    'Access-Control-Allow-Origin' : '*',
    // 'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json'
  };
  authServer: string = 'https://mtas.prasarana.com.my/web_login';
  // authServer: string = 'http://10.128.48.36/ict/web_login';

  constructor(private http:Http) {}

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
  
  public login(credentials) {
    console.log(credentials);
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        // let access = (credentials.password === "pass" && credentials.email === "email");
        let access = this.getAccess(credentials);
        // this.currentUser = new Staff('Suhaimi Maidin', 'suhaimi.maidin@prasarana.com.my');
        observer.next(access);
        observer.complete();
      });
    }
  }

  getAccess(credentials) {
    console.log(credentials);
    // this.http.get(this.authServer + 
    //   '?username=' + credentials.email.split('@')[0]
    //    + '&password=' + credentials.password, this.headers )
    //     .subscribe(res => {
    //         console.log(res); 
    //     });
    //     return 1;

    this.http.get(this.authServer 
        + '?username=' + credentials.email.split('@')[0] 
        + '&password=' +  credentials.password)
      .map(res => res.json())
      .subscribe(data => {
      this.data = data.data.children;
      console.log('horay: '+ data);
      console.log('horay 2: '+ this.data);
    }, error => {
              console.log("Oooops!");
          });

      // let body = JSON.stringify(credentials);
      //     console.log('Body message: ' + body);
      //     this.http.post(this.authServer, body)
      //     .subscribe(data => {
      //     this.data.response = data;
      //     }, error => {
      //         console.log("Oooops!");
      //     });
    
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

  public getUserInfo(): Staff {
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
