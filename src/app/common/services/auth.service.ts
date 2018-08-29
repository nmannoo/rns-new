import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Users } from '../classes/users';

import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  state: boolean;
  loggedInUser: any;
  userlist = Users;
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user = afAuth.authState;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get loginCheck(): boolean {
    if (this.afAuth.auth.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  login(info) {
    return from(this.afAuth.auth
      .signInWithEmailAndPassword(info.username, info.password));
  }

  logout() {
    return from(this.afAuth.auth
      .signOut());
  }

  forgotPassword(email: string) {
    return from(this.afAuth.auth
      .sendPasswordResetEmail(email));
  }

  get currentUser() {
    for (let i = 0; i < this.userlist.length; i++) {
      if (this.afAuth.auth.currentUser.email === this.userlist[i].email) {
        return this.userlist[i].username;
      }
    }
  }

  get auth() {
    return this.afAuth.auth.currentUser;
  }
}
