//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, AuthCredential } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';

@Injectable()
export class ProfileProvider {
  public userProfile: Reference;
  public currentUser: User;

  constructor() {
    console.log('Hello ProfileProvider Provider');

    // cek firebase
    firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.currentUser = user;
          this.userProfile = firebase.database()
            .ref(`/userProfile/${user.uid}`);
        }
      });
  }

  // ambil semua user profile
  getUserProfile(): Reference {
    return this.userProfile;
  }

  // proses update nama
  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  // proses update phone
  updatePhone(phone: string): Promise<any> {
    return this.userProfile.update({ phone });
  }

}
