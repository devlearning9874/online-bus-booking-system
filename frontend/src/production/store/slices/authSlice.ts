import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User, AuthState } from '@types/auth'

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      // Persist to localStorage
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
      state.user = null
      state.isAuthenticated = false
    },

    // Signup actions
    signupStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    signupSuccess: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },

    // Logout
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },

    // Update user
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },

    // Update token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },

    // Check auth status from localStorage
    checkAuthStatus: (state) => {
      const token = localStorage.getItem('token')
      state.isAuthenticated = !!token
      state.token = token
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  setUser,
  setToken,
  checkAuthStatus,
  clearError,
} = authSlice.actions

export default authSlice.reducer
