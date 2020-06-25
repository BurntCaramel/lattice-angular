import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../table-data';
import { SheetService } from '../sheet.service';
import { EvaluatorService } from '../evaluator.service';

@Component({
  selector: 'app-lattice-sheet',
  templateUrl: './lattice-sheet.component.html',
  styleUrls: ['./lattice-sheet.component.css'],
  providers: [SheetService, EvaluatorService],
})
export class LatticeSheetComponent implements OnInit {
  tableData$: Observable<TableData>;
  evaluatorService: EvaluatorService;

  constructor(sheetService: SheetService, evaluatorService: EvaluatorService) {
    this.tableData$ = sheetService.getTableData();
    this.evaluatorService = evaluatorService;
  }

  ngOnInit(): void {}
}
