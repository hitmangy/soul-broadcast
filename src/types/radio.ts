export interface RadioStation {
  id: string;
  name: string;
  translatedNames: Record<string, string>;
  urlResolved: string;
  urlResolved2?: string;
  urlResolved3?: string;
  favicon: string;
  isHLS: boolean;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}
