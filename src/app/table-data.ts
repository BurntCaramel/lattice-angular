type CellID = string;
type CellValue = string;
export type TableCellValues = Map<CellID, CellValue>;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export class TableData {
  cellValues: TableCellValues = new Map<CellID, CellValue>([
    ['A1', 'Value for A1'],
    ['B1', 'Value for B1'],
    ['B2', '= B1'],
    ['B3', '= LEN(B1)'],
    ['C1', '= 5 + 5'],
    ['C2', '= C1 * 10'],
    ['C3', '= C2 * 10'],
  ]);

  static fromObject(object: Record<string, string>): TableData {
    const tableData = new TableData();
    Object.keys(object).forEach((key) => {
      const value = object[key];
      if (key === 'empty' || value === '') {
        return;
      }

      tableData.cellValues.set(key, value);
    });
    return tableData;
  }

  columnCount = 8;
  rowCount = 12;

  get columns(): Iterable<string> {
    return alphabet.slice(0, this.columnCount);
  }

  get rows(): Iterable<string> {
    return Array(this.rowCount)
      .fill('')
      .map((_, i) => `${i + 1}`);
  }
}
