/**
 * Booking related types
 */

export interface Passenger {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: 'M' | 'F' | 'Other'
  seatNumber: number
}

export interface Booking {
  id: string
  userId: string
  busId: string
  busName: string
  route: string
  departureDate: string
  departureTime: string
  passengers: Passenger[]
  totalPrice: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentId?: string
  bookingDate: string
  createdAt: string
  updatedAt: string
}

export interface BookingRequest {
  busId: string
  passengers: Passenger[]
  totalPrice: number
}

export interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  isLoading: boolean
  error: string | null
  totalCount: number
  currentPage: number
}

export interface BookingFilter {
  status?: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded'
  dateFrom?: string
  dateTo?: string
}
