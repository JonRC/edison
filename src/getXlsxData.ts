import { Workbook, Worksheet } from "exceljs";
import { resolve } from "path";

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
      const value = cell.value.toString();
      const key = sheet.getCell(1, column).value.toString();

      dataItem = { ...dataItem, [key]: value };
    });

    data.push(dataItem);
  });

  return data;
};
