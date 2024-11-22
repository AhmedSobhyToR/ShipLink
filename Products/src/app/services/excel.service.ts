import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as XLSX from 'xlsx';

@Injectable({
    providedIn:'root'
})
export class ExcelService{

    constructor(private translate: TranslateService){}


    exportToExcel(data: any[], columns: any[], file_name: string){

        const header = columns.map(col => this.translate.instant(col.label));
        const rows = data.map(prd => 
            columns.map(col => prd[col.property]) 
        );
    
        const worksheetData = [header, ...rows];
    
        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    
        XLSX.writeFile(workbook, `${file_name}.xlsx`);
      }
}