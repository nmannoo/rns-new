import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Users, User } from '../classes/users';

import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  state: boolean;
  loggedInUser: any;
  userlist = Users;
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
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
      .signInWithEmailAndPassword(info.username, info.password)
      .then((creds) => {
        // this.updateUserData(creds.user);
      }));
  }

  logout() {
    return from(this.afAuth.auth
      .signOut());
  }

  forgotPassword(email: string) {
    return from(this.afAuth.auth
      .sendPasswordResetEmail(email));
  }

  get auth() {
    return this.afAuth.auth.currentUser;
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    // tslint:disable-next-line:curly
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.role === role) {
        return true;
      }
    }
    return false;
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      role: 'admin'
    };

    return userRef.set(data, { merge: true });
  }
}
