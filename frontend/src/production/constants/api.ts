/**
 * API constants
 */

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh-token',
  AUTH_PASSWORD_RESET_REQUEST: '/auth/password-reset-request',
  AUTH_PASSWORD_RESET: '/auth/password-reset',
  AUTH_CHANGE_PASSWORD: '/auth/change-password',

  // Users
  USERS_ME: '/users/me',
  USERS_UPDATE_PROFILE: '/users/me',

  // Buses
  BUSES_SEARCH: '/buses/search',
  BUSES_LIST: '/buses',
  BUSES_GET: (id: string) => `/buses/${id}`,
  BUSES_AVAILABLE_SEATS: (id: string) => `/buses/${id}/available-seats`,
  BUSES_ROUTES: '/buses/routes',
  BUSES_AMENITIES: '/buses/amenities',

  // Bookings
  BOOKINGS_CREATE: '/bookings',
  BOOKINGS_LIST: '/bookings',
  BOOKINGS_GET: (id: string) => `/bookings/${id}`,
  BOOKINGS_UPDATE: (id: string) => `/bookings/${id}`,
  BOOKINGS_CANCEL: (id: string) => `/bookings/${id}/cancel`,
  BOOKINGS_RECEIPT: (id: string) => `/bookings/${id}/receipt`,

  // Payments
  PAYMENTS_CREATE: '/payments',
  PAYMENTS_LIST: '/payments',
  PAYMENTS_GET: (id: string) => `/payments/${id}`,
  PAYMENTS_REFUND: (id: string) => `/payments/${id}/refund`,
}

export const API_TIMEOUT = 10000 // 10 seconds

export const API_RETRY_ATTEMPTS = 3

export const API_RETRY_DELAY = 1000 // 1 second
