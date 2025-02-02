import { User } from "./User";

export interface AuthState extends User {
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
}
