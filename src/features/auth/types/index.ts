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
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string
  email: string
  image: string
  firstName: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
