import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { Alert, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {    // function yg otomatis dijalankan browser
    console.log('ionViewDidLoad ProfilePage');

    // cek userProfile dari firebase database
    this.profileProvider.getUserProfile()
      .on('value', userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.val();
      });
  }

  // proses logout
  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  // update nama
  updateNama(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Isikan nama lengkap anda!',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Isikan nama depan',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Isikan nama belakang',
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

}