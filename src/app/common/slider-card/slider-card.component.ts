import { Component, OnInit, Input } from '@angular/core';
import { SliderCard } from '../classes/slider-card';

@Component({
  selector: 'app-slider-card',
  templateUrl: './slider-card.component.html',
  styleUrls: ['./slider-card.component.scss']
})
export class SliderCardComponent implements OnInit {
  @Input() elId: string;
  // tslint:disable-next-line:no-input-rename
  @Input('post') slidePost: any;

  constructor() { }

  ngOnInit() {
  }

}
