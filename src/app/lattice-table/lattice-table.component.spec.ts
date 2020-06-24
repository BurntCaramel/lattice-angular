import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import user from '@testing-library/user-event';

import { LatticeTableComponent } from './lattice-table.component';
import { TableData } from '../table-data';
import { EvaluatorEnvironment, CellEvaluator } from '../evaluator.service';

// Here we compare Angular’s built-in TestBed, and ‘Testing Library’, which helps with querying the page.

describe('LatticeTableComponent using TestBed', () => {
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

    component.data = new TableData({
      columnCount: 17,
      rowCount: 21,
    });
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

  it('shows table', () => {
    expect(fixture.nativeElement.querySelector('table')).toBeTruthy();
  });

  it('shows 21 rows', () => {
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(21);
  });
});

describe('LatticeTableComponent using Testing Library', () => {
  beforeEach(async () => {
    await render(LatticeTableComponent, {
      componentProperties: {
        data: new TableData({
          columnCount: 17,
          rowCount: 21,
        }),
        evaluatorService: {
          evaluatorForEnvironment(
            environment: EvaluatorEnvironment
          ): CellEvaluator {
            return (cellID) => null;
          },
        },
      },
    });
  });

  it('shows table', () => {
    expect(screen.getByRole('table')).toBeTruthy();
  });

  it('shows 17 column headers', () => {
    expect(screen.getAllByRole('columnheader').length).toBe(17);
  });

  it('shows 21 row headers', () => {
    expect(screen.getAllByRole('rowheader').length).toBe(21);
  });

  it('shows 17 * 21 textbox inputs', () => {
    expect(screen.getAllByRole('textbox').length).toBe(17 * 21);
  });
});
