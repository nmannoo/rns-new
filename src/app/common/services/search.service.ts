import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { PlatformService } from '../services/platform.service';

import { environment } from '@environments/environment';

import { Observable, from, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Observable to return from the service function
  algosearch: Observable<any>;

  constructor(
    private afs: AngularFirestore,
    private platform: PlatformService
  ) { }

  searchQuery(query: string): Observable<any> {
    if (this.platform.platformCheck) {
      const algoliasearch = require('algoliasearch/dist/algoliasearch.js');

      // Create an instance of Algolia Search
      const client = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);

      const index = client.initIndex('dev_PRODS');
      this.algosearch = from(index.search(query)).pipe(
        debounceTime(2000)
      );
      return this.algosearch;
    } else {
      return of(null);
    }
  }
}
