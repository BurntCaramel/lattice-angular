import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../table-data';
import { SheetService } from '../sheet.service';

@Component({
  selector: 'app-lattice-sheet',
  templateUrl: './lattice-sheet.component.html',
  styleUrls: ['./lattice-sheet.component.css'],
  providers:  [SheetService]
})
export class LatticeSheetComponent implements OnInit {
  tableData$: Observable<TableData>;

  constructor(service: SheetService) {
    this.tableData$ = service.getTableData();
  }

  ngOnInit(): void {
  }

}
