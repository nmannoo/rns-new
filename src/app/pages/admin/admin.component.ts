import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  uploadFile(event) {
    const elem = event.target;
    const formData = new FormData();
    if (elem.files.length > 0) {
      formData.append('file', elem.files[0]);
    }
    console.log(elem.files[0]);
    this.http.post('/upload', formData).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
