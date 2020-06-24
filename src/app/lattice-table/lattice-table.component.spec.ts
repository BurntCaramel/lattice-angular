import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatticeTableComponent } from './lattice-table.component';
import { TableData } from '../table-data';
import { EvaluatorEnvironment, CellEvaluator } from '../evaluator.service';

describe('LatticeTableComponent', () => {
  let component: LatticeTableComponent;
  let fixture: ComponentFixture<LatticeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatticeTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatticeTableComponent);
    component = fixture.componentInstance;

    // component.data = { cellValues: new Map() };
    component.data = new TableData();
    component.evaluatorService = {
      evaluatorForEnvironment(
        environment: EvaluatorEnvironment
      ): CellEvaluator {
        return (cellID) => null;
      },
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
