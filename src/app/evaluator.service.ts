import { Injectable } from '@angular/core';

export interface EvaluatorEnvironment {
  readCell: (cellID: string) => string | null
}

export interface Evaluator {
  evaluate(input: string, environment: EvaluatorEnvironment): string | null
}

function evaluateExpression(expression: string, environment: EvaluatorEnvironment): string {
  console.log("EXP", expression)
  const body = expression.replace(/\b[A-Z][0-9]+/g, (cellID) => {
    cellID = cellID.trim();
    const result = environment.readCell(cellID);
    return JSON.stringify(result);
  })
  console.log("body", body)

  function LEN(input: string): number {
    return input.length;
  }
  function JOIN(first: string, second: string): string {
    return first + second;
  }

  const f = new Function('LEN', 'JOIN', `return ${body}`);
  return f(LEN, JOIN);
}

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  constructor() {}

  primary(): Evaluator {
    return this;
  }

  evaluate(input: string, environment: EvaluatorEnvironment): string | null {
    if (typeof input === 'string' && input.startsWith('=')) {
      // return null;
      return evaluateExpression(input.slice(1), environment);
    }
  }
}
