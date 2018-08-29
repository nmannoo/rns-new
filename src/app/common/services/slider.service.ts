import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, from } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  sliderCollection: AngularFirestoreCollection<any[]>;
  sliderDoc: AngularFirestoreDocument<any>;
  sliderArr: Observable<any[]>;
  slider: Observable<any>;

  state: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((rewt) => {
        // tslint:disable-next-line:curly
        while (rewt.firstChild) rewt = rewt.firstChild;
        return rewt;
      }),
      filter((rewt) => rewt.outlet === 'primary'),
      mergeMap((rewt) => rewt.data)
    ).subscribe((event) => {
        this.state = event.state;
    });
  }

  fetchSlider(value) {
    if (value === '') {
      value = this.state;
    }
    this.sliderDoc = this.afs.collection('sliders').doc(`${value}`);
    this.slider = this.sliderDoc.valueChanges();
    return this.slider;
  }

  fetchAllSliders() {
    this.sliderCollection = this.afs.collection('sliders');
    this.sliderArr = this.sliderCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.sliderArr;
  }

  // Add New Slider

  addSlider(info) {
    const name = info.name;
    delete info.image;
    delete info.name;
    const promise = from(this.afs.collection('sliders').doc(`${name}`).set(info));
    return promise;
  }

  // Edit Slider

  updateSlider(info) {
    const name = info.name;
    delete info.image;
    delete info.name;
    const promise = from(this.afs.collection('sliders').doc(`${name}`).update(info));
    return promise;
  }

  // Delete Slider

  deleteSlider(info) {
    const promise = from(this.afs.collection('sliders').doc(info.name).delete());
    return promise;
  }
}
