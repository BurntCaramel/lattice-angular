import { Injectable } from '@angular/core';

export interface EvaluatorEnvironment {
  readCell: (cellID: string) => string | null;
}

type Value = string | number;

export interface CellEvaluator {
  (cellID: string): Value | null;
}

function evaluateExpression(
  expression: string,
  environment: EvaluatorEnvironment
): string {
  const body = expression.replace(/\b[A-Z][0-9]+/g, (cellID) => {
    cellID = cellID.trim();
    const result = environment.readCell(cellID);
    return JSON.stringify(result);
  });


  function LEN(input: Value): number {
    return `${input}`.length;
  }
  function JOIN(first: Value, second: Value): string {
    return `${first}${second}`;
  }

  const f = new Function('LEN', 'JOIN', `return ${body}`);
  return f(LEN, JOIN);
}

function evaluatorForEnvironment(
  environment: EvaluatorEnvironment
): (cellID: string) => string | null {
  const visitedCellIDs = new Set<string>();
  const evaluatedCells = new Map<string, string>();

  function readCell(cellID: string): string | null {
    if (visitedCellIDs.has(cellID)) {
      throw Object.assign(new Error('Circular references'), { visitedCellIDs });
    }

    visitedCellIDs.add(cellID);
    return environment.readCell(cellID);
  }

  const evaluatingEnvironment = {
    readCell: evaluateCell,
  };

  function evaluateCell(cellID: string): string | null {
    if (evaluatedCells.has(cellID)) {
      return evaluatedCells.get(cellID);
    }

    const rawValue = readCell(cellID);

    if (typeof rawValue === 'string' && rawValue.startsWith('=')) {
      const value = evaluateExpression(
        rawValue.slice(1),
        evaluatingEnvironment
      );
      evaluatedCells.set(cellID, value);
      return value;
    }

    evaluatedCells.set(cellID, rawValue);
    return rawValue;
  }

  return evaluateCell;
}

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  constructor() {}

  evaluatorForEnvironment(environment: EvaluatorEnvironment): CellEvaluator {
    return evaluatorForEnvironment(environment);
  }
}
