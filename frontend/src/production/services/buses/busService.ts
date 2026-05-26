/**
 * Bus API service
 */

import apiClient, { getErrorMessage } from './api/client'
import type { Bus, BusSearchParams, BusSearchResponse, SeatInfo } from '@types/bus'
import type { ApiResponse, PaginatedResponse } from '@types/api'

/**
 * Bus service with all bus-related API calls
 */
const busService = {
  /**
   * Search buses with filters
   */
  searchBuses: async (params: BusSearchParams): Promise<BusSearchResponse> => {
    try {
      const response = await apiClient.get<ApiResponse<BusSearchResponse>>('/buses/search', {
        params,
      })
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Get all buses (paginated)
   */
  getAllBuses: async (page = 1, limit = 10): Promise<PaginatedResponse<Bus>> => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Bus>>>('/buses', {
        params: { page, limit },
      })
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Get bus by ID
   */
  getBusById: async (busId: string): Promise<Bus> => {
    try {
      const response = await apiClient.get<ApiResponse<Bus>>(`/buses/${busId}`)
      return response.data.data || response.data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Get available seats for a bus on a specific date
   */
  getAvailableSeats: async (busId: string, date: string): Promise<SeatInfo[]> => {
    try {
      const response = await apiClient.get<ApiResponse<SeatInfo[]>>(
        `/buses/${busId}/available-seats`,
        {
          params: { date },
        },
      )
      return response.data.data || response.data || []
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Get bus routes
   */
  getRoutes: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<ApiResponse<string[]>>('/buses/routes')
      return response.data.data || response.data || []
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * Get bus amenities
   */
  getAmenities: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<ApiResponse<string[]>>('/buses/amenities')
      return response.data.data || response.data || []
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },
}

export default busService
