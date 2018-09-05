import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchRes: AngularFirestoreCollection<any[]>;
  search: Observable<any[]>;

  constructor(private afs: AngularFirestore) { }

  searchQuery(start, end) {
    this.searchRes = this.afs.collection('products', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.limit(5).orderBy('category').startAt(start).endAt(end);
      return query;
    });
    this.search = this.searchRes.valueChanges();
    return this.search;
  }
}
