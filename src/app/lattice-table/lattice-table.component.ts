import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableData } from '../table-data';
import {
  FormControl,
  FormGroup,
  AbstractControl,
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';
import { Evaluator } from '../evaluator.service';

class TableFormGroup extends FormGroup {
  constructor(
    controls: {
      [key: string]: AbstractControl;
    },
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);

    this.registerControl('empty', new FormControl(''));
  }

  // contains(controlName: string) {
  //   return true;
  // }

  get(path: Array<string | number> | string): AbstractControl | null {
    const control = super.get(path);
    if (!control) {
      return super.get('empty');
    }

    return control;
  }
}

@Component({
  selector: 'app-lattice-table',
  templateUrl: './lattice-table.component.html',
  styleUrls: ['./lattice-table.component.css'],
})
export class LatticeTableComponent implements OnInit {
  @Input() data: TableData;
  @Input() evaluator: Evaluator;
  @ViewChild('tableBody', { static: true }) tableBodyRef: {
    nativeElement: HTMLTableSectionElement;
  };
  form: FormGroup;

  focusedCell: { column: string; row: string } | null = null;

  constructor() {}

  ngOnInit(): void {
    let group: any = {};

    this.data.cellValues.forEach((cellValue, cellID) => {
      group[cellID] = new FormControl(cellValue);
    });
    this.form = new TableFormGroup(group);

    this.form.valueChanges.subscribe({
      next: (value) => {
        this.data = TableData.fromObject(value);
      },
    });
  }

  cellIDFor(column: string, row: string) {
    return `${column}${row}`;
  }

  isFocused(column: string, row: string): boolean {
    if (this.focusedCell === null) {
      return false;
    }

    return this.focusedCell.column === column && this.focusedCell.row === row;
  }

  readRawValueForCellID(cellID: string): string | null {
    return this.data.cellValues.get(cellID) || null;
  }

  calculateValueForCell(column: string, row: string): string | null {
    const cellID = this.cellIDFor(column, row);
    const rawValue = this.readRawValueForCellID(cellID);
    if (typeof rawValue === 'string') {
      return this.evaluator.evaluate(rawValue, {
        readCell: (cellID) => {
          const value = this.readRawValueForCellID(cellID)
          console.log("READ", cellID, value)
          return value;
        }
      });
    }

    return null;
  }

  focusCellInput(column: string, row: string) {
    this.focusedCell = { column, row };

    const cellID = `${column}${row}`;
    console.log('focus', cellID);
    if (!this.form.contains(cellID)) {
      this.form.addControl(cellID, new FormControl(''));
    }
  }

  blurCellInput(column: string, row: string) {
    this.focusedCell = null;

    const cellID = `${column}${row}`;
    console.log('blur', cellID);
    const control = this.form.get(cellID);
    if (control.value === '') {
      this.form.removeControl(cellID);
    }
  }

  enterKey(column: string, row: string) {
    const tableBodyEl = this.tableBodyRef.nativeElement;
    const targetRow = parseInt(row, 10) + 1;
    const targetEl = tableBodyEl.querySelector(
      `input[data-column="${column}"][data-row="${targetRow}"]`
    );
    if (targetEl instanceof HTMLElement) {
      targetEl.focus();
    }
  }
}
