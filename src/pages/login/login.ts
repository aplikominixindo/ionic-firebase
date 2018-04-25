import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup }
  from '@angular/forms';
import {
  Alert, AlertController,
  Loading, LoadingController
} from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider) {

    // validasi form
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required,
      Validators.minLength(8)])]
    });
  }

  // proses login user
  loginUser() {
    // cek apakah email dan password sudah valid
    if (!this.loginForm.valid) {  // jika tidak valid
      console.log(`Form tidak valid: ${this.loginForm.value}`);
    } else {  // jika sudah valid
      // baca formControlName dahulu
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // cek dari firebase
      this.authProvider.loginUser(email, password).then(
        // Promise
        authData => {   // resolve
          this.loading.dismiss().then(() => {
            // berhasil login
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {      // reject
          this.loading.dismiss().then(() => {
            // gagal login
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{
                text: 'OK',
                role: 'cancel'
              }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  // buka form register user baru
  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  // buka form reset password
  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
