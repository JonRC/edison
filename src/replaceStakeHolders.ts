import fs from "fs/promises";
import createReport from "docx-templates";
import { resolve } from "path";

export type ReplaceDataDTO = Record<string, string>;

export const replaceStakeholders = async (
  dataToReplace: ReplaceDataDTO[],
  outFile?: string
) => {
  const templatePath = resolve(process.cwd(), "modelo.docx");
  const outPath = (name: string) =>
    resolve(process.cwd(), "gerados", `${name}.docx`);

  const template = await fs.readFile(templatePath);

  const fileWrites = dataToReplace.map(async (data, index) => {
    console.log(data);
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

    const fileWrite = await fs.writeFile(outPath(fileName), buffer);
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
