import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  sliderDoc: AngularFirestoreDocument<any>;
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
      if (event.state !== undefined) {
        this.state = event.state;
      } else {
        this.router.events.pipe(
          filter(evt => evt instanceof NavigationEnd)
        ).subscribe((evt) => {
          let r = this.route;
          // tslint:disable-next-line:curly
          while (r.firstChild) r = r.firstChild;
          r.params.subscribe(params => {
            this.state = params['child'];
          });
        });
      }
    });
  }

  fetchSlider() {
    console.log(this.state);
    this.sliderDoc = this.afs.collection('sliders').doc(`${this.state}`);
    this.slider = this.sliderDoc.valueChanges();
    return this.slider;
  }
}
