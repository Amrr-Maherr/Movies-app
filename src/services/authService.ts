/**
 * Auth Service
 *
 * Handles all authentication API calls.
 * Includes endpoints for signup, login, and user management.
 */

import axios from "axios";

// API Configuration
const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth";

// ============= Types =============

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

// ============= Signup Endpoint =============

/**
 * Create a new user account.
 *
 * @param data - Signup data including name, email, password, and phone
 * @returns AuthResponse with user data and token on success
 * @throws ApiError on failure
 *
 * @example
 * await signup({
 *   name: "Ahmed Abd Al-Muti",
 *   email: "ahmedmuttii4012@gmail.com",
 *   password: "Ahmed@123",
 *   rePassword: "Ahmed@123",
 *   phone: "01010700701"
 * })
 */
export async function signup(data: SignupData): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/signup`, {
      name: data.name,
      email: data.email,
      password: data.password,
      rePassword: data.rePassword,
      phone: data.phone,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = {
        message: error.response?.data?.message || "Signup failed",
        status: error.response?.status,
      };
      throw apiError;
    }
    throw { message: "An unexpected error occurred" } as ApiError;
  }
}

// ============= Login Endpoint =============

/**
 * Authenticate user with email and password.
 *
 * @param data - Login data including email and password
 * @returns AuthResponse with user data and token on success
 * @throws ApiError on failure
 *
 * @example
 * await login({
 *   email: "user@example.com",
 *   password: "password123"
 * })
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/signin`, {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = {
        message: error.response?.data?.message || "Login failed",
        status: error.response?.status,
      };
      throw apiError;
    }
    throw { message: "An unexpected error occurred" } as ApiError;
  }
}
