import { Component } from '@angular/core';
import { Platform,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { ConnectProvider } from '../providers/connect/connect';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  param = {
    device_token : ''
  }

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    public connect: ConnectProvider,
    public push: Push
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initPushNotification();
    });
  }

  public presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  initPushNotification(){
    const options: PushOptions = {
      android: {
        sound: true,
        senderID: '866828197536',
        vibrate: true,
        icon: 'screen'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: true
      },
      windows: {}
    };

    /*this.param.device_token = 'update lagi';
    this.connect.postData(this.param, "saveToken").then((result) =>{
      this.presentToast("Sukses");
    }, (err) => {
      this.presentToast("Connection Problem");
    });*/

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) =>{

      const dataNotif = JSON.parse(notification);
      alert(dataNotif);
    });

    pushObject.on('registration').subscribe((registration: any) => {
      //localStorage.setItem('device_token', registration.registrationId);
      //alert(registration.registrationId);
      this.param.device_token = registration.registrationId;
      this.connect.postData(this.param, "saveToken").then((result) =>{
        this.presentToast("Sukses");
      }, (err) => {
        this.presentToast("Connection Problem");
      });
    });

    pushObject.on('error').subscribe(error => {
      alert("Device Problem, Please restart Device");
    });
  }
}

