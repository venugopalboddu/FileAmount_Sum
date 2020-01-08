import { Component, ViewChild } from '@angular/core';
import { CSVRecord } from './CSVModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular7-readCSV';

  private sum=0; 
  private result=0; 
  private value;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        
        this.value= this.records; 
        for(let j=0;j<this.records.length;j++){
          this.result = +this.value[j].Amount;
             this.sum += this.result;
             }
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }
  add(e){
    this.result = 0;
    this.sum = 0;
    this.value= this.records;
    console.log(this.records) ;
    for(let j=0;j<this.records.length;j++){
      this.result = +this.value[j].Amount;
         this.sum += this.result;
         }
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.NameOfCounterparty = curruntRecord[0].trim();
        csvRecord.EmailOfCounterparty = curruntRecord[1].trim();
        csvRecord.PhoneNumberOfCounterparty = curruntRecord[2].trim();
        csvRecord.SourceAccountCurrency = curruntRecord[3].trim();
        csvRecord.RecipientAccountCurrency = curruntRecord[4].trim();
        csvRecord.Amount = curruntRecord[5].trim();
        csvRecord.ScheduleDate = curruntRecord[6].trim();
        csvRecord.Reference = curruntRecord[7].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }
}
