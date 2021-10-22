import { replaceStakeholders } from "./replaceStakeHolders";

const data = [
  {
    nome: "jonathan",
    cidade: "terras do mar",
    cpf: "123.456.789-10",
  },
  {
    nome: "leandro",
    cidade: "montanhas da matemática",
    cpf: "321.654.987-01",
  },
];

replaceStakeholders(data, "documento {{rg}}").catch(console.error);
