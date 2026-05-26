/**
 * Error and notification messages
 */

export const ERROR_MESSAGES = {
  // Auth
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters',
  PASSWORD_MISMATCH: 'Passwords do not match',
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  SIGNUP_FAILED: 'Signup failed. Please try again.',
  LOGOUT_FAILED: 'Logout failed. Please try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',

  // Buses
  BUS_NOT_FOUND: 'Bus not found.',
  NO_BUSES_FOUND: 'No buses found for the selected criteria.',
  INVALID_SEARCH_CRITERIA: 'Please provide valid search criteria.',

  // Booking
  BOOKING_FAILED: 'Booking failed. Please try again.',
  BOOKING_NOT_FOUND: 'Booking not found.',
  SEATS_NOT_AVAILABLE: 'Selected seats are not available.',
  INVALID_PASSENGERS: 'Please provide valid passenger information.',
  CANCELLATION_FAILED: 'Failed to cancel booking.',

  // Payment
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  INVALID_PAYMENT_METHOD: 'Invalid payment method selected.',
  REFUND_FAILED: 'Refund processing failed.',

  // Validation
  REQUIRED_FIELD: 'This field is required.',
  INVALID_FORMAT: 'Invalid format.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
}

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Signup successful! Please login.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  BOOKING_CONFIRMED: 'Booking confirmed!',
  BOOKING_CANCELLED: 'Booking cancelled successfully.',
  PAYMENT_SUCCESS: 'Payment successful!',
  REFUND_INITIATED: 'Refund has been initiated.',
}

export const INFO_MESSAGES = {
  LOADING: 'Loading...',
  PROCESSING: 'Processing...',
  PLEASE_WAIT: 'Please wait...',
  SEARCHING: 'Searching buses...',
}

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  NAME_REQUIRED: 'Name is required',
  NAME_INVALID: 'Name must contain only letters and spaces',
  PHONE_REQUIRED: 'Phone number is required',
  PHONE_INVALID: 'Phone number must be 10 digits',
  AGE_INVALID: 'Age must be between 1 and 120',
  DATE_INVALID: 'Please select a valid date',
  PAST_DATE_ERROR: 'Cannot select a past date',
}
