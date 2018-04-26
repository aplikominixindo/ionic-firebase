import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { Alert, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@IonicPage({
  segment: 'event-detail/:eventId'
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public currentEvent: any = {};    // array [] {}
  public guestName: string = '';
  public guestPicture: string = null;

  constructor
    (public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public alertCtrl: AlertController,
    public cameraPlugin: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');

    // baca dari firebase
    this.eventProvider
      .getEventDetail(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

  // proses update eventList
  updateEventList() {
    const alert: Alert = this.alertCtrl.create({
      message: 'Isikan detail event!',
      inputs: [
        {
          name: 'eventName',
          placeholder: 'Isikan nama event',
          value: this.currentEvent.name
        },
        {
          name: 'eventDate',
          placeholder: 'Isikan tanggal event',
          value: this.currentEvent.date
        },
        {
          name: 'eventPrice',
          placeholder: 'Isikan harga event',
          value: this.currentEvent.price
        },
        {
          name: 'eventContact',
          placeholder: 'Isikan contact person',
          value: this.currentEvent.contact
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.eventProvider
              .updateEventList(
                data.eventName,
                data.eventDate,
                data.eventPrice,
                data.eventContact);
          }
        }
      ]
    });
    alert.present();
  }

  // mengambil gambar / capture atau gallery
  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality: 95,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      })
      .then(imageData => {
        this.guestPicture = imageData;
      },
        error => {
          console.log('Error: ' + JSON.stringify(error));
        }
      );
  }

  // menyimpan data peserta
  addGuest(guestName: string): void {
    this.eventProvider
      .addGuest(
        guestName,
        this.currentEvent.id,
        this.guestPicture
      )
      .then(newGuest => {
        this.guestName = '';
        this.guestPicture = null;
      });
  }

}