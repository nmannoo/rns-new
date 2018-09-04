import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private formData: FormData;
  private filename: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  loadFile(event) {
    this.formData = null;
    const elem = event.target;
    this.formData = new FormData();
    if (elem.files.length > 0) {
      this.filename = elem.files[0].name;
      this.formData.append('file', elem.files[0]);
    }
    console.log(this.filename);
    console.log(this.formData);
  }

  uploadFile() {
    this.http.post('/upload', this.formData).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
