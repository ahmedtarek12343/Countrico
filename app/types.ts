export type country = {
  name: { common: string; official: string };
  borders: string[];
  capital: string;
  flags: { png: string };
  population: number;
  region: string;
  languages: { key: string; value: string };
};
