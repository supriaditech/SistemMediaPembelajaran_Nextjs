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
  createdAt: string;
  updatedAt: string;
}
export interface AddMateriType {
  title: string;
  content: string;
  videoUrl: string;
}
