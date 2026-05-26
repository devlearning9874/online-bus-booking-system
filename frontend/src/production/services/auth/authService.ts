/**
 * Authentication API service
 */

import apiClient, { getErrorMessage } from './api/client'
import type { User, LoginRequest, SignupRequest, AuthResponse } from '@types/auth'
import type { ApiResponse } from '@types/api'

/**
 * Authentication service with all auth-related API calls
 */
const authService = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials)
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Register new user
   */
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data)
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/users/me')
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      const response = await apiClient.put<ApiResponse<User>>('/users/me', data)
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/password-reset-request', { email })
      return { message: response.data.message || 'Password reset email sent' }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/password-reset', {
        token,
        newPassword,
      })
      return { message: response.data.message || 'Password reset successful' }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Change password (authenticated user)
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/change-password', {
        oldPassword,
        newPassword,
      })
      return { message: response.data.message || 'Password changed successfully' }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },
}

export default authService
