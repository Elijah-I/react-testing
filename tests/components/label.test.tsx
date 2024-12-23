import Label from "@/components/Label";
import en from "@/providers/language/data/en.json";
import es from "@/providers/language/data/es.json";
import { LanguageProvider } from "@/providers/language/LanguageProvider";
import type { PropsWithChildren } from "react";

enum Language {
  en = "en",
  es = "es"
}

type LanguageCase = {
  language: Language;
  labelId: string;
  translation: string;
};

const languageCases = [
  { label: Language.en, content: en },
  { label: Language.es, content: es }
].reduce<LanguageCase[]>(
  (cases, languageData) =>
    cases.concat(
      Object.entries(languageData.content).map<LanguageCase>(
        ([labelId, translation]) => ({
          labelId,
          translation,
          language: languageData.label
        })
      )
    ),
  []
);

describe("Label", () => {
  it.each(languageCases)(
    "should render label $translation for $labelId ($language)",
    (languageCase) => {
      const { translation } = renderLabel(languageCase);

      expect(translation).toBeInTheDocument();
    }
  );

  it("should throw an error if given an invalid labelId", () => {
    const invalidLanguageCase = {
      labelId: "invalid",
      language: Language.en,
      translation: ""
    };

    expect(() => renderLabel(invalidLanguageCase)).toThrowError(/invalid/i);
  });
});

const renderLabel = ({ language, labelId, translation }: LanguageCase) => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <LanguageProvider language={language} children={children} />
  );

  render(<Label labelId={labelId} />, { wrapper });

  return {
    translation: screen.getByText(translation)
  };
};
