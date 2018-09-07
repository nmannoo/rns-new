import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { MDCTemporaryDrawer, MDCTemporaryDrawerFoundation } from '@material/drawer';
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import { MDCLinearProgress, MDCLinearProgressFoundation } from '@material/linear-progress';

import { Navigation } from '../../classes/navigation';

import { PlatformService } from '../../services/platform.service';
import { SearchService } from '../../services/search.service';
import { LoadingService } from '../../services/loading.service';

import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public parent;
  public child;
  public nav: any = Navigation;

  private startAt = new BehaviorSubject<string>('');
  private startObs = this.startAt.asObservable();

  public searchResults = [];

  constructor(
    private platform: PlatformService,
    private loading: LoadingService,
    private search: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        let r = this.route;
        // tslint:disable-next-line:curly
        while (r.firstChild) r = r.firstChild;
        r.params.subscribe(params => {
          this.parent = params['parent'];
          this.child = params['child'];
        });
      });
  }

  ngOnInit() {
    this.materialise();
    this.load();
  }

  materialise() {
    if (this.platform.platformCheck) {
      const drawList = document.querySelector('.mdc-list');
      const mdcList = new MDCList(drawList);

      const menuItems = document.getElementsByClassName('menu-item');
      for (let i = 0; i < menuItems.length; i++) {
          (window as any).button = new MDCRipple(menuItems[i]);
      }

      const navRespButton = new MDCRipple(document.querySelector('.rns-menu-button'));
    }
  }

  triggerDrawer() {
    if (this.platform.platformCheck) {
      const drawerEl = document.querySelector('aside#menu-drawer');
      const tempDrawer = new MDCTemporaryDrawer(drawerEl);
      tempDrawer.open = true;
    }
  }

  closeDrawer() {
    if (this.platform.platformCheck) {
      const drawerEl = document.querySelector('aside#menu-drawer');
      const tempDrawer = new MDCTemporaryDrawer(drawerEl);
      tempDrawer.open = false;
    }
  }

  load() {
    if (this.platform.platformCheck) {
      const linearBar = <HTMLElement>document.querySelector('.mdc-linear-progress');
      const mdcLinearBar = MDCLinearProgress.attachTo(linearBar);
      mdcLinearBar.close();
      mdcLinearBar.progress = 0;
      this.router.events.subscribe((event) => {
        this.loading.startLoading(mdcLinearBar);
      });
    }
  }

  searchAuto($event: any) {
    if ($event.target.value !== '') {
      const q = $event.target.value;
      this.startAt.next(q);

      this.startObs.subscribe((value) => {
        this.search.searchQuery(value).subscribe((responses) => {
          this.searchResults = this.parseBlock(responses.hits);
        });
      });
    } else {
      this.searchResults = [];
    }
  }

  parseBlock(data: any[]) {
    // tslint:disable-next-line:curly
    if (!data) return null;

    const newarr = data.slice();
    for (let i = 0; i < newarr.length; i++) {
      const item = newarr[i].blocktitle;
      if (item === '1') {
        newarr[i].blocktitle = 'paper';
      } else if (item === '2') {
        newarr[i].blocktitle = 'stationery';
      } else {
        newarr[i].blocktitle = 'packaging';
      }
    }
    return newarr;
  }

  resetSearch() {
    this.searchResults = [];
  }

}
