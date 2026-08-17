export interface Language {
  code: string;
  name: string;
}

const LANGUAGE_CODES = [
  "en","es","fr","de","it","pt","nl","ru","zh","ja","ko","ar","hi","bn","tl",
  "vi","th","id","ms","tr","pl","uk","el","he","sv","no","da","fi","cs","ro",
  "hu","bg","hr","sk","sl","lt","lv","et","sr","fa","ur","ta","te","mr","gu",
  "kn","ml","pa","sw","am","yo","ig","zu","af","sq","hy","az","be","bs","ca",
  "cy","eu","gl","is","ka","kk","km","ky","lo","mk","mn","mt","my","ne","si",
  "so","tg","uz","xh",
] as const;

const displayNames = new Intl.DisplayNames(["en"], { type: "language" });

export const LANGUAGES: Language[] = LANGUAGE_CODES
  .map((code) => ({ code, name: displayNames.of(code) ?? code }))
  .sort((a, b) => a.name.localeCompare(b.name));