import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ContentService } from '../../common/services/content.service';
import { SliderService } from '../../common/services/slider.service';

@Component({
  selector: 'app-prodcat',
  templateUrl: './prodcat.component.html',
  styleUrls: ['./prodcat.component.scss']
})
export class ProdcatComponent implements OnInit {
  public params: any;
  public sliderdata: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private content: ContentService,
    private slider: SliderService
  ) { }

  ngOnInit() {
    this.getPageData();
    this.getSlider();
  }

  getPageData() {
    this.route.params.forEach((params: Params) => {
      this.content.fetchContent().subscribe(data => {
        this.params = data;
      });
    });
  }

  getSlider() {
    this.slider.fetchSlider().subscribe(data => {
      this.sliderdata = data;
    });
  }

}
