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
  public state: string;

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
  }

  getPageData() {
    this.route.params.forEach((params: Params) => {
      this.content.fetchContent().subscribe(data => {
        this.params = data;
      });
    });
  }

  getSlider(value) {
    this.slider.fetchSlider(value).subscribe(data => {
      this.sliderdata = data;
    });
  }

}
