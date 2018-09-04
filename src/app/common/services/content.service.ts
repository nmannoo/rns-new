import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from '../services/auth.service';

import { Observable, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Content } from '../classes/content';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  pageCollection: AngularFirestoreCollection<Content[]>;
  pageContent: AngularFirestoreDocument<Content>;
  pageData: Observable<Content>;
  pageArrData: Observable<Content[]>;

  productsCollection: AngularFirestoreCollection<any[]>;
  products: Observable<any[]>;

  parent: string;
  child: string;

  constructor(private afs: AngularFirestore, private auth: AuthService, private route: ActivatedRoute, private router: Router) {
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

  // Content

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

  fetchAllContent() {
    this.pageCollection = this.afs.collection('pages');
    this.pageArrData = this.pageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.pageArrData;
  }

  // Add New Content

  addPage(info) {
    const promise = from(this.afs.collection('pages').doc(`${info.id}`).set(info));
    return promise;
  }

  // Update Content

  updatePage(info) {
    const promise = from(this.afs.collection('pages').doc(`${info.id}`).update(info));
    return promise;
  }

  // Delete Content

  deletePage(info) {
    const promise = from(this.afs.collection('pages').doc(info.id).delete());
    return promise;
  }

  // Get Product Data

  fetchfProducts() {
    this.productsCollection = this.afs.collection('products', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('featured', '==', true);
      query = query.orderBy('blocktitle');
      return query;
    });
    this.products = this.productsCollection.valueChanges();
    return this.products;
  }

  fetchProdbyChild() {
    this.productsCollection = this.afs.collection('products', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('category', '==', `${this.child}`);
      query = query.orderBy('order');
      return query;
    });
    this.products = this.productsCollection.valueChanges();
    return this.products;
  }

  fetchProds() {
    this.productsCollection = this.afs.collection('products', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.orderBy('blocktitle').orderBy('category');
      return query;
    });
    this.products = this.productsCollection.valueChanges();
    return this.products;
  }

  // Add Product Data

  addProduct(info) {
    const data = info;
    delete data.image;
    delete data.f_image;
    const promise = from(this.afs.collection('products').doc(`${info.name}`).set(data));
    return promise;
  }

  // Update Product Data

  updateProduct(info) {
    delete info.image;
    delete info.f_image;
    const promise = from(this.afs.collection('products').doc(info.name).update(info));
    return promise;
  }

  // Delete Product Data

  deleteProduct(info) {
    const promise = from(this.afs.collection('products').doc(info.name).delete());
    return promise;
  }


}
