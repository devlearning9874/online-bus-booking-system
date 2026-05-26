/**
 * Booking API service
 */

import apiClient, { getErrorMessage } from './api/client'
import type { Booking, BookingRequest, BookingFilter } from '@types/booking'
import type { ApiResponse, PaginatedResponse } from '@types/api'

/**
 * Booking service with all booking-related API calls
 */
const bookingService = {
  /**
   * Create new booking
   */
  createBooking: async (data: BookingRequest): Promise<Booking> => {
    try {
      const response = await apiClient.post<ApiResponse<Booking>>('/bookings', data)
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Get user's bookings
   */
  getUserBookings: async (
    page = 1,
    limit = 10,
    filters?: BookingFilter,
  ): Promise<PaginatedResponse<Booking>> => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Booking>>>('/bookings', {
        params: { page, limit, ...filters },
      })
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Get booking by ID
   */
  getBookingById: async (bookingId: string): Promise<Booking> => {
    try {
      const response = await apiClient.get<ApiResponse<Booking>>(`/bookings/${bookingId}`)
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Update booking
   */
  updateBooking: async (bookingId: string, data: Partial<Booking>): Promise<Booking> => {
    try {
      const response = await apiClient.put<ApiResponse<Booking>>(`/bookings/${bookingId}`, data)
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Cancel booking
   */
  cancelBooking: async (bookingId: string, reason?: string): Promise<Booking> => {
    try {
      const response = await apiClient.post<ApiResponse<Booking>>(
        `/bookings/${bookingId}/cancel`,
        { reason },
      )
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Download booking receipt/invoice
   */
  downloadReceipt: async (bookingId: string): Promise<Blob> => {
    try {
      const response = await apiClient.get(`/bookings/${bookingId}/receipt`, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },
}

export default bookingService
