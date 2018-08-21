import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getContent().subscribe(data => {
      console.log(data);
    });
  }

  getContent() {
    return this.http.get('assets/data/glossary.json');
  }

}
