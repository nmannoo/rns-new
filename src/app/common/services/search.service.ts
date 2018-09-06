import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

const algoliasearch = require('algoliasearch/dist/algoliasearch.js');

import { environment } from '../../../environments/environment';

import { Observable, combineLatest, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private client = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);

  searchRes: AngularFirestoreCollection<any[]>;
  search: Observable<any[]>;

  algosearch: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  searchQuery(query: string) {
    const index = this.client.initIndex('dev_PRODS');
    this.algosearch = from(index.search(query));
    return this.algosearch;
  }
}
