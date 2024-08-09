export interface UserSession {
  id: number;
  userId: string;
  password: string;
  name: string;
  role: "ADMIN" | "GURU" | "MURID"; // Specify allowed roles
  createdAt: string;
  updatedAt: string;
}

// Define interface for session
export interface SessionType {
  user: UserSession;
  expires: string;
  accessToken: string;
}
