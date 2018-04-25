import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase, { Unsubscribe } from 'firebase';
import { firebaseConfig } from './credentials';

import { HomePage } from '../pages/home/home';

import { Alert, AlertController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    alertCtrl: AlertController) {
    platform.ready().then(() => {

      // membaca API key dari firebase
      // untuk pertama kali aplikasi dijalankan
      firebase.initializeApp(firebaseConfig);

      // cek user sedang logged in atau belum
      const unsubscribe: Unsubscribe = 
        firebase.auth()
          .onAuthStateChanged(user => {
            // statement
            if(!user) {   // belum logged in
              this.rootPage = 'LoginPage';
              unsubscribe();
            } else {    // user masih logged in
              this.rootPage = HomePage;
              unsubscribe();
            }
          });
          /*firebase.auth()
            .onAuthStateChanged(user => {
              if (user) {
                if (!user.emailVerified){
                  // belum di verifikasi
                  const alert: Alert =  alertCtrl.create({
                    message: 'Error! Verifikasi email Anda!',
                    buttons: [{
                      text: 'OK',
                      role: 'cancel'
                    }]
                  });
                  alert.present();
                } else {
                  this.rootPage = HomePage;
                  unsubscribe();
                }
              } else {
                this.rootPage = 'LoginPage';
                unsubscribe();
              }
            });*/
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

