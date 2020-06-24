import { Injectable } from '@angular/core';
import { TableData } from './table-data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  constructor() { }

  tableData = new TableData();

  getTableData() {
    return of(this.tableData);
  }
}
