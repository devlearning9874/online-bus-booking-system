/**
 * Custom hook for authentication
 * Provides authentication state and functions
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@store'
import { loginStart, loginSuccess, loginFailure, logout, clearError } from '@store/slices/authSlice'
import authService from '@services/auth'
import type { LoginRequest, SignupRequest } from '@types/auth'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector((state: RootState) => state.auth)

  /**
   * Login user
   */
  const login = useCallback(
    async (credentials: LoginRequest) => {
      dispatch(loginStart())
      try {
        const response = await authService.login(credentials)
        dispatch(loginSuccess(response))
        return true
      } catch (error: any) {
        dispatch(loginFailure(error.message))
        return false
      }
    },
    [dispatch],
  )

  /**
   * Signup user
   */
  const signup = useCallback(
    async (data: SignupRequest) => {
      dispatch(loginStart()) // Use loginStart for loading state
      try {
        const response = await authService.signup(data)
        dispatch(loginSuccess(response))
        return true
      } catch (error: any) {
        dispatch(loginFailure(error.message))
        return false
      }
    },
    [dispatch],
  )

  /**
   * Logout user
   */
  const handleLogout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      dispatch(logout())
    }
  }, [dispatch])

  /**
   * Clear error messages
   */
  const clear = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    ...auth,
    login,
    signup,
    logout: handleLogout,
    clearError: clear,
  }
}

export default useAuth
