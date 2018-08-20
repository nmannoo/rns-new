import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { PlatformService } from './common/services/platform.service';
import { CookieService } from './common/services/cookie.service';
import { MetadataService } from './common/services/metadata.service';
import { SeoService } from './common/services/seo.service';

import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Roll n Sheet Ltd';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookie: CookieService,
    private platform: PlatformService,
    private seo: SeoService,
    private meta: MetadataService
  ) {

  }

  ngOnInit() {
    this.scrollTop();
    this.cookie.subscribe();
    this.initSkype();
  }

  ngOnDestroy() {
    this.cookie.unsubscribe();
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
      s.innerText = `(function(i, s, o, g, r, a, m) {i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function() {(i[r].q = i[r].q || []).push(arguments)}, i[r].l = 1 * new Date();a = s.createElement(o),m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m)})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');ga('create', 'UA-121710325-1', 'auto');`;
      return document.getElementsByTagName('head')[0].appendChild(s);
    }
  }

  initSkype() {
    if (this.platform.platformCheck) {
      const scriptID = 'skype';
      if (document.getElementById(scriptID)) {
        return;
      }

      const s = document.createElement('script') as any;
      s.type = 'text/javascript';
      s.src = 'https://swc.cdn.skype.com/sdk/v1/sdk.min.js';
      return document.getElementsByTagName('head')[0].appendChild(s);
    }
  }

  updateMetadata() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        // tslint:disable-next-line:curly
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((event) => {
      if (event.state !== undefined) {
        this.seo.getPage(event.state).subscribe(pages => {
          if (pages) {
            this.meta.generateTags({
              title: this.title + ' | ' + pages.title,
              description: pages.description,
              keywords: pages.keywords
            });
          }
        });
      } else {
        this.router.events.pipe(
          filter(evt => evt instanceof NavigationEnd)
        ).subscribe((evt) => {
          let r = this.route;
          // tslint:disable-next-line:curly
          while (r.firstChild) r = r.firstChild;
          r.params.subscribe(params => {
            this.seo.getPage(params['child']).subscribe(data => {
              if (data) {
                this.meta.generateTags({
                  title: this.title + ' | ' + data.title,
                  description: data.description,
                  keywords: data.keywords
                });
              }
            });
          });
        });
      }
    });
  }


}
