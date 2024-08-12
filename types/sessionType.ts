export interface Guru {
  id: number;
  guruId: number;
  photo: string;
}

export interface Murid {
  id: number;
  muridId: number;
  photo: string;
  gayaBelajar: string;
}

export interface Admin {
  id: number;
  adminId: number;
  photo: string;
}

export interface UserSession {
  id: number;
  userId: string;
  password: string;
  name: string;
  phoneNumber: string;
  role: "ADMIN" | "GURU" | "MURID"; // Specify allowed roles
  createdAt: string;
  updatedAt: string;
  Guru: Guru | null;
  Murid: Murid | null;
  Admin: Admin | null;
}

export interface SessionType {
  user: UserSession;
  expires: string;
  accessToken: string;
}
