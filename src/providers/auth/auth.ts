//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  // signup user baru
  signupUser(email: string,
    password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {    // resolve
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/email`)
          .set(email);
      })
      .catch(error => {   // bila error lempar ke catch
        console.log("terjadi error: " + error);
        throw new Error(error);
      });
  }

  // login user
  loginUser(email: string,
    password: string): Promise<void> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  // logout user
  logoutUser(): Promise<void> {
    const userId: string =
      firebase.auth().currentUser.uid;
    firebase.database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }

  // lupa password user
  resetPassword(email: string): Promise<void> {
    return firebase
      .auth()
      .sendPasswordResetEmail(email);
  }

}
