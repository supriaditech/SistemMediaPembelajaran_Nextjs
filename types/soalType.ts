// OptionType.ts
export interface OptionType {
  id: number;
  text: string;
  soalId: number;
}

// SoalType.ts
export interface SoalType {
  id: number;
  question: string;
  answer: string;
  guruId: number;
  materiId: number;
  options: OptionType[];
}

// SoalsResponseType.ts
export interface SoalsResponseType {
  meta: {
    statusCode: number;
    message: string;
  };
  data: SoalType[];
}

interface Option {
  text: string;
}

export interface AddSoalType {
  question: string;
  answer: string;
  options: Option[];
  materiId: number;
}
