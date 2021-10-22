import { Cell, CellValue, Workbook, Worksheet } from "exceljs";
import { resolve } from "path";
import moment from "moment";

export const getXlsxData = async () => {
  const workbook = new Workbook();

  const xlsxPath = resolve(process.cwd(), "dados.xlsx");

  await workbook.xlsx.readFile(xlsxPath);

  const sheet = workbook.worksheets[0];

  const data = getData(sheet);

  return data;
};

const getData = (sheet: Worksheet) => {
  const data: Record<string, string>[] = [];

  sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return;

    let dataItem: Record<string, string> = {};

    row.eachCell((cell) => {
      const column = cell.col;
      const value = valueToString(cell.value);
      const keyValue = sheet.getCell(1, column).value.toString();
      const key = valueToString(keyValue);

      dataItem = { ...dataItem, [key]: value };
    });

    data.push(dataItem);
  });

  return data;
};

const valueToString = (cellValue: CellValue) => {
  if (cellValue instanceof Date) {
    return moment(cellValue).format("DD/MM/YYYY");
  }

  return cellValue.toString();
};
