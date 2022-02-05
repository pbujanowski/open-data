import { Language } from "./language.type";

export const english: Language = {
  code: "en",
  displayName: "English",
};

export const polish: Language = {
  code: "pl",
  displayName: "Polski",
};

export const supportedLanguages: Language[] = [english, polish];

export const getLanguageByCode = (code: string): Language | undefined =>
  supportedLanguages.find((language) => language.code === code);
