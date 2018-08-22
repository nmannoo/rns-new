import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ContentService } from '../../common/services/content.service';
import { SliderService } from '../../common/services/slider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prodcat',
  templateUrl: './prodcat.component.html',
  styleUrls: ['./prodcat.component.scss']
})
export class ProdcatComponent implements OnInit, OnDestroy {
  public params: any;
  public sliderdata: any;
  public state: string;

  public posts: any;

  // Subscriptions
  private slidesData: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private content: ContentService,
    private slider: SliderService
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
  }

  getPageData() {
    this.route.params.forEach((params: Params) => {
      this.content.fetchContent().subscribe(data => {
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
      this.content.fetchProdbyChild().subscribe(data => {
        this.posts = data;
      });
    });
  }

}
