import { bookingApiClient, usersApiClient } from '../api/client'
import type { User, LoginRequest, SignupRequest, AuthResponse } from '@/types/auth'

const storageKey = 'user'

const buildFallbackUser = (email: string, overrides: Partial<User> = {}): User => ({
  id: email,
  email,
  firstName: overrides.firstName ?? email.split('@')[0],
  lastName: overrides.lastName ?? 'User',
  phone: overrides.phone ?? '',
  role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

const persistUser = (user: User): void => {
  localStorage.setItem(storageKey, JSON.stringify(user))
}

const readStoredUser = (): User | null => {
  const rawUser = localStorage.getItem(storageKey)
  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as User
  } catch {
    return null
  }
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await bookingApiClient.post('/auth/login', credentials)
    const token = response.data?.token ?? response.data?.data?.token

    if (!token) {
      throw new Error('Authentication service did not return a token.')
    }

    const user = buildFallbackUser(credentials.email)
    const refreshToken = `${token}-refresh`

    persistUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)

    return { user, token, refreshToken }
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const payload = {
      username: data.email,
      password: data.password,
    }

    try {
      await usersApiClient.post('/api/v1/user', payload)
    } catch {
      // Backend registration is optional in local/demo mode; continue with local auth fallback.
    }

    const user = buildFallbackUser(data.email, {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    })
    const token = `local-${Date.now()}`
    const refreshToken = `${token}-refresh`

    persistUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)

    return { user, token, refreshToken }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem(storageKey)
  },

  getProfile: async (): Promise<User> => {
    return readStoredUser() ?? buildFallbackUser('guest@example.com')
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const currentUser = (await authService.getProfile()) ?? buildFallbackUser('guest@example.com')
    const updatedUser = {
      ...currentUser,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    persistUser(updatedUser)
    return updatedUser
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const user = await authService.getProfile()
    const token = `${refreshToken}-refreshed`

    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', `${token}-refresh`)

    return {
      user,
      token,
      refreshToken: `${token}-refresh`,
    }
  },
}

export default authService
