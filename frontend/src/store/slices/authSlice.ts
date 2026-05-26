import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User, AuthState } from '@/types/auth'

const readStoredUser = (): User | null => {
  const rawUser = localStorage.getItem('user')

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as User
  } catch {
    return null
  }
}

const initialState: AuthState = {
  user: readStoredUser(),
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
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    checkAuthStatus: (state) => {
      const token = localStorage.getItem('token')
      const savedUser = readStoredUser()

      state.isAuthenticated = !!token
      state.token = token
      state.user = savedUser ?? state.user
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, setUser, checkAuthStatus } =
  authSlice.actions

export default authSlice.reducer
