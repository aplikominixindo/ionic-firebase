import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  // membuka halaman profile
  goToProfile(): void {
    this.navCtrl.push('ProfilePage');
  }

  // membuka form create event baru
  goToCreateEvent(): void {
    this.navCtrl.push('EventCreatePage');
  }

  // membuka daftar semua event
  goToListEvent(): void {
    this.navCtrl.push('EventListPage');
  }

}