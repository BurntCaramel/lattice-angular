import { TestBed } from '@angular/core/testing';

import { EvaluatorService, CellEvaluator } from './evaluator.service';

describe('EvaluatorService', () => {
  let service: EvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('cell evaluator', () => {
    let cellEvaluator: CellEvaluator;

    beforeEach(() => {
      cellEvaluator = service.evaluatorForEnvironment({
        readCell(cellID) {
          if (cellID === 'A1') {
            return 'Some text for A1';
          } else if (cellID === 'A2') {
            return '= A1';
          } else if (cellID === 'E1') {
            return '= 5 + 5';
          } else if (cellID === 'E2') {
            return '= E1';
          }
        },
      });
    });

    it('returns text for cell with just text', () => {
      expect(cellEvaluator('A1')).toEqual('Some text for A1');
    });

    it('returns text for cell that refers to cell with just text', () => {
      expect(cellEvaluator('A2')).toEqual('Some text for A1');
    });

    it('evaluates maths expression', () => {
      expect(cellEvaluator('E1')).toEqual(10);
    });

    it('evaluates cell that refers to cell with maths expression', () => {
      expect(cellEvaluator('E2')).toEqual(10);
    });

    describe('LEN function', () => {
      beforeEach(() => {
        cellEvaluator = service.evaluatorForEnvironment({
          readCell(cellID) {
            if (cellID === 'L1') {
              return 'abcdefghijklmnopqrstuvwxyz';
            } else if (cellID === 'L2') {
              return '= LEN(L1)';
            }
          },
        });
      });

      it('calculates length of alphabet', () => {
        expect(cellEvaluator('L2')).toEqual(26);
      });
    });

    describe('JOIN function', () => {
      beforeEach(() => {
        cellEvaluator = service.evaluatorForEnvironment({
          readCell(cellID) {
            if (cellID === 'J1') {
              return 'first';
            } else if (cellID === 'J2') {
              return 'second';
            } else if (cellID === 'J3') {
              return '= JOIN(J1, J2)';
            }
          },
        });
      });

      it('joins the two cells text together', () => {
        expect(cellEvaluator('J3')).toEqual('firstsecond');
      });
    });
  });
});
