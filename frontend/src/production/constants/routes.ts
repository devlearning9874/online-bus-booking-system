/**
 * Route constants
 */

export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',

  // User
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  BUSES_SEARCH: '/search',
  BUS_DETAILS: '/buses/:id',
  BOOKINGS: '/bookings',
  BOOKING_DETAILS: '/bookings/:id',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_FAILURE: '/payment/failure',

  // Admin
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_BUSES: '/admin/buses',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_REPORTS: '/admin/reports',

  // Error
  NOT_FOUND: '*',
  UNAUTHORIZED: '/unauthorized',
}

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.FORGOT_PASSWORD]

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.BUSES_SEARCH,
  ROUTES.BOOKINGS,
]

export const ADMIN_ROUTES = [ROUTES.ADMIN_DASHBOARD, ROUTES.ADMIN_USERS, ROUTES.ADMIN_BUSES]
