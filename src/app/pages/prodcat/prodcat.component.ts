import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ContentService } from '../../common/services/content.service';

@Component({
  selector: 'app-prodcat',
  templateUrl: './prodcat.component.html',
  styleUrls: ['./prodcat.component.scss']
})
export class ProdcatComponent implements OnInit {
  public params: any;

  constructor(private router: Router, private route: ActivatedRoute, private content: ContentService) { }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    this.route.params.forEach((params: Params) => {
      this.content.fetchContent().subscribe(data => {
        this.params = data;
      });
    });
  }

}
