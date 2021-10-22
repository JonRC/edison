import { readFile } from "fs/promises";
import { resolve } from "path";

type Config = {
  savarComo: string;
};

export const getConfig = async () => {
  const configPath = resolve(process.cwd(), "config.txt");

  const configText = await readFile(configPath, "utf8");

  const configPattern = new RegExp(`\\w+\\s*=\\s*\\w+`);

  const config: Config = configText
    .split(new RegExp(`[\\n\\r]+`))
    .filter((text) => text.match(configPattern))
    .reduce((config, line) => {
      const [key, value] = line.split(new RegExp(`\\s*=\\s*`));
      return { ...config, [key]: value };
    }, {} as Config);

  return config;
};
