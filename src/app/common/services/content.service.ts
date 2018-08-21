import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Content } from '../classes/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  pageContent: AngularFirestoreDocument<Content>;
  pageData: Observable<Content>;

  parent: string;
  child: string;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        let r = this.route;
        while (r.firstChild) {
          r = r.firstChild;
        }
        r.params.subscribe(params => {
          this.parent = params['parent'];
          this.child = params['child'];
        });
      });
  }

  fetchContent() {
    this.pageContent = this.afs.collection('pages').doc(`${this.child}`);
    this.pageData = this.pageContent.snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as any;
        const id = a.payload.id;
        return { id, ...data };
      })
    );
    return this.pageData;
  }
}
