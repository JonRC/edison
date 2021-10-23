import { getConfig } from "./getConfig";
import { getXlsxData } from "./getXlsxData";
import { replaceStakeholders } from "./replaceStakeHolders";

const main = async () => {
  console.log(`
    Idealizado por Leandro Oliveira || https://www.instagram.com/chirodinguer/
    Desenvolvidor por Jonathan Rodrigues || https://www.linkedin.com/in/jonathan-rodrigues-cardoso/
  `);

  const waiting = wait(5000);

  const data = await getXlsxData();

  const { savarComo: outPath } = await getConfig();

  await replaceStakeholders(data, outPath);

  await waiting;
};

main().catch((error) => {
  console.log("Erro inesperado");
  setTimeout(() => process.exit(1), 3000);
});

function wait(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
