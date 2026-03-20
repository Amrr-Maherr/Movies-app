/**
 * Auth Service Types
 *
 * Types for authentication-related API responses.
 */

export interface SignupData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  token: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
