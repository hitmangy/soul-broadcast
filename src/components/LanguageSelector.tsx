import { Language } from "@/types/radio";

interface LanguageSelectorProps {
  languages: Language[];
  onSelectLanguage: (language: Language) => void;
}

export const LanguageSelector = ({ languages, onSelectLanguage }: LanguageSelectorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass rounded-3xl p-8 w-full max-w-md animate-scale-in">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">📻</div>
          <h1 className="text-3xl font-bold mb-2">Quran Radio</h1>
          <p className="text-muted-foreground">Select Your Language</p>
        </div>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onSelectLanguage(language)}
              className="w-full glass-hover rounded-xl p-4 flex items-center gap-4 text-left"
            >
              <span className="text-3xl">{language.flag}</span>
              <div className="flex-1">
                <div className="font-semibold">{language.nativeName}</div>
                <div className="text-sm text-muted-foreground">{language.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
