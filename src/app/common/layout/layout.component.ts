import { Component, OnInit } from '@angular/core';

import { fadeAnimation } from '../classes/router.animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [ fadeAnimation ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
