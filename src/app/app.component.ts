import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Data } from '@angular/router';

import { PlatformService } from './common/services/platform.service';
import { SeoService } from './common/services/seo.service';

import { Subscription, BehaviorSubject, of } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Roll n Sheet Ltd';

  child = new BehaviorSubject<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platform: PlatformService,
    private seo: SeoService,
  ) {
    router.events
      .pipe(
        filter(evt => evt instanceof NavigationEnd),
        map(() => this.route),
        map((rt) => {
          // tslint:disable-next-line:curly
          while (rt.firstChild) rt = rt.firstChild;
          return rt;
        }),
        map(r => r.params),
        switchMap((params) => params)
      )
      .subscribe((params) => {
        if (params['child']) {
          this.child.next(params['child']);
        }
      });
  }

  ngOnInit() {
    this.updateMetadata().subscribe();
    this.scrollTop();
    this.initGAnalytics();
    this.sendPageView();
  }

  ngOnDestroy() {

  }

  scrollTop() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.platform.platformCheck) {
        window.scrollTo(0, 0);
      }
    });
  }

  initGAnalytics() {
    if (this.platform.platformCheck) {
      const scriptID = 'google-analytics';
      if (document.getElementById(scriptID)) {
        return;
      }

      const s = document.createElement('script') as any;
      s.type = 'text/javascript';
      s.id = scriptID;
      // tslint:disable-next-line:max-line-length
      s.innerText = `(function(i, s, o, g, r, a, m) {i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function() {(i[r].q = i[r].q || []).push(arguments)}, i[r].l = 1 * new Date();a = s.createElement(o),m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m)})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');ga('create', 'UA-121710325-2', 'auto');`;
      return document.getElementsByTagName('head')[0].appendChild(s);
    }
  }

  sendPageView() {
    if (this.platform.platformCheck) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (environment.production) {
            (window as any).ga('set', 'page', event.urlAfterRedirects);
            (window as any).ga('send', 'pageview');
          }
        }
      });
    }
  }

  updateMetadata() {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        // tslint:disable-next-line:curly
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
      switchMap((event: Data) => {
        if (event !== undefined) {
          if (event.state !== undefined) {
            return this.seo.ssrFirestoreDoc(`pages/${event.state}`);
          } else {
            return this.seo.ssrFirestoreDoc(`pages/${this.child.value}`);
          }
        }
      })
    );
  }


}
