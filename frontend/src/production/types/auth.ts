/**
 * Authentication related types
 */

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}
