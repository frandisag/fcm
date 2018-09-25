import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Push } from '@ionic-native/push';

import { MyApp } from './app.component';
import { BarcodeScanner } from  '@ionic-native/barcode-scanner';
import { HomePage } from '../pages/home/home';
import { ConnectProvider } from '../providers/connect/connect';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
        ios: {
          scrollAssist: false,
          autoFocusAssist: false
        },
        android: {
          scrollAssist: false,
          autoFocusAssist: false
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    Push,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectProvider
  ]
})
export class AppModule {}
