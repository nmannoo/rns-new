import { Component, OnInit } from '@angular/core';

import { SliderService } from '../../common/services/slider.service';

@Component({
  selector: 'app-regional-market',
  templateUrl: './regional-market.component.html',
  styleUrls: ['./regional-market.component.scss']
})
export class RegionalMarketComponent implements OnInit {
  public sliderdata: any;
  public null = '';

  constructor(private slider: SliderService) { }

  ngOnInit() {
    this.getSlider();
  }

  getSlider() {
    this.slider.fetchSlider(this.null).subscribe(data => {
      this.sliderdata = data;
    });
  }

}
