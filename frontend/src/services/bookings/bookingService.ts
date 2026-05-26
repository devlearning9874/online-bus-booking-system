import { bookingApiClient } from '../api/client'
import type { BookingRequest } from '@/types/booking'

export interface BookingPayload {
  bookingId: string
  busId: string
  dateOfBooking: string
  source: string
  destination: string
  noOfSeats: number
  status: string
}

const createBookingPayload = (request: BookingRequest, source = 'Chennai', destination = 'Bangalore'): BookingPayload => ({
  bookingId: `BK-${Date.now()}`,
  busId: request.busId,
  dateOfBooking: new Date().toISOString(),
  source,
  destination,
  noOfSeats: request.passengers.length,
  status: 'CONFIRMED',
})

export const bookingService = {
  createBooking: async (request: BookingRequest): Promise<string> => {
    const response = await bookingApiClient.post('/bookings', createBookingPayload(request))
    return String(response.data)
  },
}

export default bookingService
