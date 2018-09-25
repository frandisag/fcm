import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from  '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	param = {
		device_token: localStorage.getItem('device_token')
	};

  constructor(
  	public navCtrl: NavController, 
  	public toastCtrl:ToastController,
  	public barcodeScanner: BarcodeScanner) {
  	
  }

  scanQr(){
    var options = {
      showTorchButton: true,
      prompt: "Place a barcode inside the scan area",
      formats: "QR_CODE",
      orientation :"portrait"
    }

    this.barcodeScanner.scan(options).then(barcodeData=>{   
    	this.presentToast(barcodeData.text);
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

}
