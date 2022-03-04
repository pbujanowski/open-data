import { Language } from "./Language";

const languages = () => {
  const english: Language = {
    code: "en",
    displayName: "English",
  };

  const polish: Language = {
    code: "pl",
    displayName: "Polski",
  };

  const supportedLanguages: Language[] = [english, polish];

  const getLanguageByCode = (code: string): Language | undefined =>
    supportedLanguages.find((language) => language.code === code);

  return { english, polish, supportedLanguages, getLanguageByCode };
};

export { languages };
