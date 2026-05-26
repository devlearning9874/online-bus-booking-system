/**
 * API service with Axios and JWT interceptors
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

interface RequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

/**
 * Create Axios instance with custom configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

/**
 * Request interceptor - Attach JWT token to all requests
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor - Handle token refresh on 401
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RequestConfig

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
          // No refresh token, redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          return Promise.reject(error)
        }

        // Attempt to refresh token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        })

        const { token } = response.data

        // Update token in localStorage
        localStorage.setItem('token', token)

        // Update authorization header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${token}`

        // Retry original request with new token
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Other error responses
    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      window.location.href = '/'
    }

    return Promise.reject(error)
  },
)

/**
 * Helper function to extract error message from response
 */
export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  if (error?.response?.data?.error) {
    return error.response.data.error
  }
  if (error?.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export default apiClient
