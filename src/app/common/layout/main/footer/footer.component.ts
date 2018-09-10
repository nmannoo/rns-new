import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public get year(): string {
    const date = new Date();
    const year = date.getFullYear();
    return year.toString();
  }

  constructor() { }

  ngOnInit() {
  }

}
