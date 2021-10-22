import { readFile } from "fs/promises";
import { resolve } from "path";

const getConfig = async () => {
  const configPath = resolve(process.cwd(), "config.txt");

  const config = await readFile(configPath, "utf8");

  console.log();
};
