import { Injectable } from '@angular/core';
import { TableData } from './table-data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  constructor() {}

  tableData = new TableData({
    columnCount: 8,
    rowCount: 12,
    useDefaultValues: true,
  });

  getTableData() {
    return of(this.tableData);
  }
}
