import { Injectable } from '@angular/core';
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
  

  constructor() {
    console.log('Hello User Provider');
    this.name = 'Suhaimi Maidin';
    this.staffNumber= 10010060;
    this.email= 'suhaimi.maidin@prasarana.com.my';
    this.department= 'ICT';
    this.baseLocation= 'Subang';
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
