type CellID = string;
type CellValue = string;
export type TableCellValues = Map<CellID, CellValue>;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export class TableData {
  cellValues: TableCellValues = new Map<CellID, CellValue>([
    ['A1', 'Type any text'],
    ['B1', 'This will appear twice'],
    ['B2', '= B1'],
    ['B4', 'Count using `LEN`'],
    ['B5', '= LEN(B1)'],
    ['D1', '= 5 + 5'],
    ['D2', '= D1 * 10'],
    ['D3', '= D2 * 10'],
    ['D4', '= D3 * D3'],
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
