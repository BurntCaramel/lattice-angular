import { Component, OnInit, Input } from '@angular/core';
import { TableData } from '../table-data';
import {
  FormControl,
  FormGroup,
  AbstractControl,
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';

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
    // super(
    //   controls,
    //   (control: AbstractControl) => {
    //     console.log("validate", control)
    //     return null;
    //   },
    //   asyncValidator
    // );

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
  form: FormGroup;

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
        // console.log("form changed", value);
      }
    })
  }

  focusCellInput(column: string, row: string) {
    const cellID = `${column}${row}`;
    console.log("focus", cellID);
    if (!this.form.contains(cellID)) {
      this.form.addControl(cellID, new FormControl(""));
    }
  }
}
