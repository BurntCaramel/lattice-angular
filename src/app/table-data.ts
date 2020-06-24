type CellID = string;
type CellValue = string;
export type TableCellValues = Map<CellID, CellValue>;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export class TableData {
  cellValues: TableCellValues = new Map<CellID, CellValue>([
    ["A1", "Value for A1"],
    ["B1", "Value for B1"]
  ]);

  static fromObject(object: Record<string, string>): TableData {
    const tableData = new TableData();
    Object.keys(object).forEach(key => {
      if (key === "empty") {
        return;
      }

      tableData.cellValues.set(key, object[key]);
    })
    return tableData;
  }

  get columns(): Iterable<string> {
    return alphabet;
  }

  get rows(): Iterable<string> {
    return Array(10).fill("").map((_, i) => `${i + 1}`);
  }
}
