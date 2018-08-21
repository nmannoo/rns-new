import { Component, OnInit } from '@angular/core';

import { SliderService } from '../../common/services/slider.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
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
