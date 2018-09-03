import { Component, OnInit } from '@angular/core';

import { PlatformService } from '../services/platform.service';

import { mapConfig } from './map.config';

@Component({
  selector: 'app-linkmap',
  templateUrl: './linkmap.component.html',
  styleUrls: ['./linkmap.component.scss']
})
export class LinkmapComponent implements OnInit {
  private config = mapConfig;

  constructor(private platform: PlatformService) { }

  ngOnInit() {
    this.initMapael();
  }

  initMapael() {
    if (this.platform.platformCheck) {
      const $ = require('jquery');
      require('jquery-mapael');
      require('jquery-mapael/js/maps/world_countries.js');

      const el = document.querySelector('#map');
      $(el).mapael(this.config);
    }
  }

}
