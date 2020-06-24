import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../table-data';
import { SheetService } from '../sheet.service';
import { EvaluatorService, Evaluator } from '../evaluator.service';

@Component({
  selector: 'app-lattice-sheet',
  templateUrl: './lattice-sheet.component.html',
  styleUrls: ['./lattice-sheet.component.css'],
  providers: [SheetService, EvaluatorService],
})
export class LatticeSheetComponent implements OnInit {
  tableData$: Observable<TableData>;
  evaluator: Evaluator;

  // constructor(@Inject(SheetService) sheetService: SheetService, @Inject(EvaluatorService) evaluatorService: EvaluatorService) {
  constructor(sheetService: SheetService, evaluatorService: EvaluatorService) {
    this.tableData$ = sheetService.getTableData();
    this.evaluator = evaluatorService.primary();
  }

  ngOnInit(): void {}
}
