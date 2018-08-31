import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../common/services/content.service';
import { SliderService } from '../../common/services/slider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sliderdata: any;
  public null = '';
  // test data
  public posts: any;

  showSpinner = true;
  showSpinner2 = true;

  constructor(private slider: SliderService, private content: ContentService) { }

  ngOnInit() {
    this.getSlider(this.null);
    this.getPosts();
  }

  getSlider(value) {
    this.slider.fetchSlider(value).subscribe(data => {
      this.sliderdata = data;
      this.showSpinner2 = false;
    });
  }

  getPosts() {
    this.content.fetchfProducts().subscribe(data => {
      this.posts = data;
      this.showSpinner = false;
    });
  }

}
