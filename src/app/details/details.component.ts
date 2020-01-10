import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private sum=0; 
  private result=0; 
  private value;
  constructor() { }
  
  @Input() list;

  ngOnInit() {
    this.value= this.list; 
    for(let j=0;j<this.list.length;j++){
      this.result = +this.value[j].Amount;
        // this.sum += this.result;
        this.sum = this.sum + this.result;
         }
  }
  add(e){
    this.result = 0;
    this.sum = 0;
    this.value= this.list; 
    for(let j=0;j<this.list.length;j++){
      this.result = +this.value[j].Amount;
        // this.sum += this.result;
        this.sum = this.sum + this.result;
         }
  }
}
