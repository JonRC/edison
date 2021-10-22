import { getXlsxData } from "./getXlsxData";
import { replaceStakeholders } from "./replaceStakeHolders";

const main = async () => {
  const data = await getXlsxData();

  replaceStakeholders(data, "documento {{cpf}}");
};

main().catch(() => {
  process.exit(1);
});
