import { User } from "./User";

export interface AuthState extends User {
  isAuthenticated: boolean;
  status: "pending" | "loading" | "success" | "error";
  loading: boolean;
  error?: string;
}
