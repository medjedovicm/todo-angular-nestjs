import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() { }

  public downloadCSV(data:any, filename:string){
    var csvData = this.ConvertToCSV(data);
    var a: any = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    
    var isIE = /*@cc_on!@*/false || !!(<any> document).documentMode;
    
    if (isIE)
    {   
        var retVal = navigator.msSaveBlob(blob, filename+'.csv');
    }
    else{
        a.download = filename+'.csv';
    }    
    a.click();
}

private ConvertToCSV(objArray:any) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        for (var index in objArray[0]) {            
            row += index + ',';
        }
        row = row.slice(0, -1);        
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += '"'+array[i][index]+'"';
            }

            str += line + '\r\n';
        }

        return str;
    }
}
