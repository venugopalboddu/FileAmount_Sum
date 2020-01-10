import { Component, ViewChild } from '@angular/core';
import { CSVRecord } from './CSVModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular7-readCSV';
  status: boolean = true;
  status1: boolean = false;
  data: any;
  fn(e) {
    this.data = e;
    this.status = false;
    this.status1 = true;
  }
}
