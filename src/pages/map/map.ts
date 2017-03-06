import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';
import { AlertController } from 'ionic-angular'; 

import { User } from '../../providers/user';
import { SettingPage } from '../setting/setting';
 
declare var google;
 
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  
  @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyA8BxZKXjS4z7yFRvTDBzBbt0V9x7I17Ug';
  latLng: any;
  lat: number;
  long: number;
 
  constructor(
    public navCtrl: NavController, 
    public connectivityService: ConnectivityService, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userService: User) {

    // this.loadGoogleMaps();
    this.loadScript();
    this.initMap();

  }
  
  loadGoogleMaps(){
    // this.debug('loadGoogleMaps');
    this.addConnectivityListeners();
 
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
  
      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();
  
      if(this.connectivityService.isOnline()){
        console.log("online, loading map");
  
        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }
  
        let script = document.createElement("script");
        script.id = "googleMaps";
  
        if(this.apiKey){
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          console.log("API Key is available!");
        } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';       
        }
  
        document.body.appendChild(script);  
  
      } 
    } else {
  
      if(this.connectivityService.isOnline()){
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }
    }
  }
 
  loadScript() {
    let script = document.createElement("script");
    script.id = "googleMaps";

    if(this.apiKey){
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
      console.log("API Key is available!");
    } else {
      script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';       
    }

    document.body.appendChild(script);  
  }

  initMap(){
    this.presentLoading();

    Geolocation.getCurrentPosition().then((position) => {
      this.mapInitialised = true;
      
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;

      let mapOptions = {
        center: this.latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
      
    }, (error) => {
      this.mapInitialised = false;
      console.log('Check GPS');
      this.enableGPS();
    });
  }
 
  enableGPS(){
    let alert = this.alertCtrl.create({
      title: 'GPS not available!',
      subTitle: 'Please enable your GPS.',
      buttons: ['OK']
    });
    alert.present();
  }
 
  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }
 
  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 1000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }

  addMarker(){
 
   let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
    
      let content = "<h4>You are here!</h4>" 
                    + "<br/>Latitude: " + this.lat 
                    + "<br/>Longitude: " + this.long;          
    
      this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Use this location?',
      message: 'Do you agree to use this location for your attendance?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked '+ this.latLng);
            let message = 'Your location is at: ' 
              + '<br/> Lat: ' + this.lat
              + '<br/> Long: ' + this.long;
            this.debug(message);
          }
        }
      ]
    });
    confirm.present();
  }

  debug(message) {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Loading ...',
      duration: 5000,
      dismissOnPageChange: true
    }).present();
  }

  isAllowed() {
    if (this.mapInitialised && this.userService.isActivated) {
      return true;
    } else {
      return false;
    }
  }

  canCheckIn() {
    if (this.userService.isActivated && !this.userService.isCheckedIn) {
      return true;
    } 
  }

  submitCheckInData() {
    let confirm = this.alertCtrl.create({
      title: 'Use this location?',
      message: 'Do you agree to use this location for your check in?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked '+ this.latLng);
            this.userService.isCheckedIn = true;
            let message = 'Your location is at: ' 
              + '<br/> Lat: ' + this.lat
              + '<br/> Long: ' + this.long;
            this.debug(message);
          }
        }
      ]
    });
    confirm.present();

  }

  canCheckOut() {
    if (this.userService.isActivated && this.userService.isCheckedIn) {
      return true;
    }
  }

  submitCheckOutData() {
    let confirm = this.alertCtrl.create({
      title: 'Use this location?',
      message: 'Do you agree to use this location for your check out?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked '+ this.latLng);
            this.userService.isCheckedIn = false;
            let message = 'Your location is at: ' 
              + '<br/> Lat: ' + this.lat
              + '<br/> Long: ' + this.long;
            this.debug(message);
          }
        }
      ]
    });
    confirm.present();
  }

  requestForActivation() {
    this.navCtrl.push(SettingPage);
  }
}