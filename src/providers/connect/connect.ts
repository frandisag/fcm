import { LoadingController } from 'ionic-angular/index';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = "http://43.252.144.26/pjbl/uploaded/apilk/";
//let apiUrl = "http://localhost/push/";
//let apiUrl = "http://10.0.2.2/push/";

@Injectable()
export class ConnectProvider {

  constructor(
    public http: Http,
    private loadingCtrl: LoadingController) {
  }

  postData(credentials, type){
  	return new Promise((resolve, reject) =>{
  		let headers = new Headers();
      // Create the popup
      if (type!='checkAvail') {
        let loadingPopup = this.loadingCtrl.create({
          content: 'Loading data...'
        });

        // Show the popup
        loadingPopup.present();
        this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).subscribe(res =>{
          setTimeout(() => {
            resolve(res.json());
            loadingPopup.dismiss();
          }, 1000);
        }, (err) =>{
          setTimeout(() => {
            reject(err);
            loadingPopup.dismiss();
          }, 1000);
        });   
      }else{
        this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).subscribe(res =>{
          resolve(res.json());
        }, (err) =>{
          reject(err);
        });
      }  	
  	});
  }
}
