import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {
  public glossary: any;
  public searchString: string;
  public alphabets: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getContent().subscribe(data => {
      this.glossary = data;
    });
    this.searchString = 'a';
    this.alphabets = this.genCharArray('a', 'z');
  }

  getContent() {
    return this.http.get('assets/data/glossary.json');
  }

  genCharArray(charA, charZ) {
    // tslint:disable-next-line:prefer-const
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i ) {
        a.push(String.fromCharCode(i));
    }
    return a;
  }

  switch(char) {
    this.searchString = char;
  }

  navigate(value: string) {
    const arr = this.alphabets;
    const idx = this.alphabets.indexOf(this.searchString);
    for (let i = 0; i < arr.length; i++) {
      if (arr[idx] === arr[i]) {
        if (value === 'prev') {
          console.log(arr[0]);
          if (idx !== 0) {
            this.searchString = arr[i - 1];
          } else {
            this.searchString = arr[arr.length - 1];
          }
        } else {
          if (idx !== 26 - 1) {
            this.searchString = arr[i + 1];
          } else {
            this.searchString = arr[0];
          }
        }
      }
    }
  }

}
