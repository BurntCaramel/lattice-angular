type CellID = string;
type CellValue = string;

export class TableData {
  cellValues = new Map<CellID, CellValue>();
}
