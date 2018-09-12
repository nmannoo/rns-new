import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ContentService } from '../../common/services/content.service';
import { SliderService } from '../../common/services/slider.service';
import { PlatformService } from '../../common/services/platform.service';

import { Subscription, Observable, of } from 'rxjs';
import { filter, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-prodcat',
  templateUrl: './prodcat.component.html',
  styleUrls: ['./prodcat.component.scss']
})
export class ProdcatComponent implements OnInit, OnDestroy, AfterViewInit {
  public params: any;
  public sliderdata: any;
  public state: string;

  public posts: any;

  private id: string;

  // Subscriptions
  private slidesData: Subscription;
  private pageData: Subscription;
  private productsData: Subscription;

  private count: Subscription;

  showSpinner = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private content: ContentService,
    private slider: SliderService,
    private platform: PlatformService
  ) {
    this.route.params.subscribe(data => {
      this.state = data['child'];
    });
  }

  ngOnInit() {
    this.getPageData();
    this.getSlider(this.state);
    this.getProducts();
  }

  ngOnDestroy() {
    this.slidesData.unsubscribe();
    this.pageData.unsubscribe();
    this.productsData.unsubscribe();
    this.count.unsubscribe();
  }

  ngAfterViewInit() {

  }

  getPageData() {
    this.route.params.forEach((params: Params) => {
      this.pageData = this.content.fetchContent().subscribe(data => {
        this.params = data;
      });
    });
  }

  getSlider(value) {
    this.route.params.forEach((params: Params) => {
      this.slidesData = this.slider.fetchSlider(params['child']).subscribe(data => {
        this.sliderdata = data;
      });
    });
  }

  getProducts() {
    this.route.params.forEach((params: Params) => {
      this.productsData = this.content.fetchProdbyChild().subscribe(data => {
        this.posts = data;
        this.showSpinner = false;
        this.count = of(true).pipe(delay(700)).subscribe(() => {
          this.scrollTo();
        });
      });
    });
  }

  scrollTo() {
    this.route.queryParams
      .pipe(filter(params => params.id))
      .subscribe(params => {
        if (this.platform.platformCheck) {
          if (params) {
            const el = document.getElementById(`${params.id}`);
            if (el !== null) {
              el.scrollIntoView({ behavior: 'smooth' });
              el.parentElement.classList.add('anim');
            }
          }
        }
      });
  }

}
