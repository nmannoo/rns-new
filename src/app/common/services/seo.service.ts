import { Injectable } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { MetadataService } from './metadata.service';

import { Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

const PAGE_KEY = makeStateKey<any>('pages');

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  pagesData: Observable<any>;
  pagesCollection: AngularFirestoreCollection<any>;
  pageDoc: AngularFirestoreDocument<any>;

  private title = 'Roll n Sheet Ltd';

  constructor(
    private afs: AngularFirestore,
    private state: TransferState,
    private meta: MetadataService
  ) { }

  getPage(name: string) {
    this.pageDoc = this.afs.doc(`pages/${name}`);
    this.pagesData = this.pageDoc.valueChanges();
    return this.pagesData;
  }

  ssrFirestoreDoc(path: string) {
    const exists = this.state.get(PAGE_KEY, {} as any);
    this.pagesData = this.afs.doc<any>(path).valueChanges()
      .pipe(
        tap(page => {
          if (page) {
            this.state.set(PAGE_KEY, page);
            this.meta.generateTags({
              title: this.title + ' | ' + page.title,
              description: page.description,
              keywords: page.keywords
            });
          }
        }),
        startWith(exists)
      );
    return this.pagesData;
  }
}
