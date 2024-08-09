interface Meta {
  statusCode: number;
  message: string;
}

export interface UserType {
  id: number;
  userId: string;
  password: string;
  name: string;
  role: "ADMIN" | "GURU" | "MURID";
  createdAt: string;
  updatedAt: string;
  Admin: any | null;
  Guru: any | null;
  Murid: any | null;
}

export interface ApiUserType {
  meta: Meta;
  data: UserType[];
}
