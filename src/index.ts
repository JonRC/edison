import { getConfig } from "./getConfig";
import { getXlsxData } from "./getXlsxData";
import { replaceStakeholders } from "./replaceStakeHolders";

const main = async () => {
  const data = await getXlsxData();

  const { savarComo: outPath } = await getConfig();

  replaceStakeholders(data, outPath);
};

main().catch(() => {
  process.exit(1);
});
