import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../common/services/content.service';
import { productCol } from '../../../common/classes/admin.table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataSource$: any[];
  columns = productCol;

  constructor(
    private content: ContentService
  ) { }

  ngOnInit() {
    this.content.fetchProds().subscribe(data => {
      this.dataSource$ = data;
      console.log(data);
    });
  }

  update(value) {
    console.log(value.name);
  }

}
