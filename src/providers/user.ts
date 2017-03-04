import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class User {

  personalData: {
    name: string,
    staff_number: number,
    email: string,
    department: string,
    base_location: string,
    activation_key: number,
    process: number
  };

  constructor(public http: Http) {
    console.log('Hello User Provider');
  }

  onSaveData(data) {
    this.personalData.name = data.name;
    this.personalData.staff_number = data.staff_number;
    this.personalData.email = data.email;
    this.personalData.department = data.department;
    this.personalData.base_location = data.base_location;
  }

  onActivated(data) {
    this.personalData.activation_key = data.activation_key;
  }

  onSubmitAttendance(process) {
    this.personalData.process = process;
  }
}
