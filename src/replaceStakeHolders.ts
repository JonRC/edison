import fs from "fs/promises";
import { existsSync } from "fs";
import createReport from "docx-templates";
import { resolve } from "path";

export type ReplaceDataDTO = Record<string, string>;

export const replaceStakeholders = async (
  dataToReplace: ReplaceDataDTO[],
  outFile?: string
) => {
  const templatePath = resolve(process.cwd(), "modelo.docx");

  const outPath = resolve(process.cwd(), "gerados");
  createPath(outPath);

  const outFilePath = (name: string) => resolve(outPath, `${name}.docx`);

  const template = await fs.readFile(templatePath);

  const fileWrites = dataToReplace.map(async (data, index) => {
    const buffer = await createReport({
      template,
      data,
      cmdDelimiter: ["{{", "}}"],
    });

    const fileName = fileNameGenerator({
      name: outFile,
      data,
      index,
    });

    const fileWrite = await fs.writeFile(outFilePath(fileName), buffer);
    return fileWrite;
  });

  await Promise.all(fileWrites);
};

const fileNameGenerator = (i: {
  name: string;
  data: ReplaceDataDTO;
  index: number;
}) => {
  const { name, data, index } = i;

  const stakeholderRegExp = new RegExp(`\\{\\{(\\w+)\\}\\}`);

  const [, stakeHolder] = name.match(stakeholderRegExp) || [];
  const replacedFileName = name.replace(
    stakeholderRegExp,
    data?.[stakeHolder] || `não-encontrado-${index + 1}`
  );

  if (stakeHolder) {
    return replacedFileName;
  } else {
    return `${name} - ${index + 1}`;
  }
};

const createPath = (path: string) => {
  const pathNotExists = !existsSync(path);
  if (pathNotExists) fs.mkdir(path, { recursive: true });
};
