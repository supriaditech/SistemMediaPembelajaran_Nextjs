// Tipe data yang sesuai dengan struktur respons API
export interface ApiResponseMateri {
  meta: {
    statusCode: number;
    message: string;
  };
  data: MateriType[];
}

export interface MateriType {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
  guruId: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  guru: GuruType;
  soals: SoalType[];
}

export interface GuruType {
  id: number;
  guruId: number;
  photo: string;
}

export interface SoalType {
  id: number;
  question: string;
  answer: string;
  guruId: number;
  materiId: number;
}

export interface AddMateriType {
  title: string;
  content: string;
  videoUrl: string;
}
