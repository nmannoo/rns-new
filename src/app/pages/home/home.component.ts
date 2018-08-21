import { Component, OnInit } from '@angular/core';

import { SliderService } from '../../common/services/slider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sliderdata: any;
  // test data
  public posts = [
    {
      postname: 'thermal-1',
      blocktitle: 'Thermal',
      images: [
        {
          imagename: 'image-1'
        },
        {
          imagename: 'image-2'
        },
        {
          imagename: 'image-3'
        }
      ]
    },
    {
      postname: 'thermal-2',
      blocktitle: 'Thermal',
      images: [
        {
          imagename: 'image-1'
        },
        {
          imagename: 'image-2'
        },
        {
          imagename: 'image-3'
        }
      ]
    },
    {
      postname: 'thermal-3',
      blocktitle: 'Not Thermal',
      images: [
        {
          imagename: 'image-1'
        },
        {
          imagename: 'image-2'
        },
        {
          imagename: 'image-3'
        }
      ]
    },
    {
      postname: 'thermal-4',
      blocktitle: 'Not Thermal',
      images: [
        {
          imagename: 'image-1'
        }
      ]
    },
  ];

  constructor(private slider: SliderService) { }

  ngOnInit() {
    this.getSlider();
  }

  getSlider() {
    this.slider.fetchSlider().subscribe(data => {
      this.sliderdata = data;
    });
  }

}
