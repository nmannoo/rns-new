import { Component, OnInit, OnDestroy } from '@angular/core';

import { ContentService } from '../../common/services/content.service';
import { SliderService } from '../../common/services/slider.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sliderdata: any;
  public null = '';
  // test data
  public posts: any;

  private sliderSub: Subscription;
  private contentSub: Subscription;

  showSpinner = true;
  showSpinner2 = true;

  constructor(private slider: SliderService, private content: ContentService) { }

  ngOnInit() {
    this.getSlider(this.null);
    this.getPosts();
  }

  ngOnDestroy() {
    this.sliderSub.unsubscribe();
    this.contentSub.unsubscribe();
  }

  getSlider(value) {
    this.sliderSub = this.slider.fetchSlider(value).subscribe(data => {
      this.sliderdata = data;
      this.showSpinner2 = false;
    });
  }

  getPosts() {
    this.contentSub = this.content.fetchfProducts().subscribe(data => {
      this.posts = data;
      this.showSpinner = false;
    });
  }

}
