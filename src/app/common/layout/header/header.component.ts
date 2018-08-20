import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { filter } from 'rxjs/operators';

import { MDCTemporaryDrawer, MDCTemporaryDrawerFoundation } from '@material/drawer';

import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import { MDCLinearProgress, MDCLinearProgressFoundation } from '@material/linear-progress';

import { Navigation } from '../../classes/navigation';

import { PlatformService } from '../../services/platform.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public parent;
  public child;
  public nav = Navigation;

  constructor(
    private platform: PlatformService,
    private loading: LoadingService,
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

}
