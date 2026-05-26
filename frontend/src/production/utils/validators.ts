/**
 * Input validation utilities
 */

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (10 digits)
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\d{10}$/
  const cleaned = phone.replace(/\D/g, '')
  return phoneRegex.test(cleaned)
}

/**
 * Validate password (min 8 chars, 1 uppercase, 1 number, 1 special char)
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

/**
 * Validate password strength
 */
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  let strength = 0

  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[@$!%*?&]/.test(password)) strength++

  if (strength <= 1) return 'weak'
  if (strength <= 2) return 'medium'
  return 'strong'
}

/**
 * Validate name (letters and spaces only)
 */
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/
  return nameRegex.test(name)
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export const isValidDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) return false

  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

/**
 * Check if date is in past
 */
export const isPastDate = (date: string): boolean => {
  const d = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

/**
 * Validate age
 */
export const isValidAge = (age: number): boolean => {
  return age >= 1 && age <= 120
}
