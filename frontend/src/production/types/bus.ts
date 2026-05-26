/**
 * Bus related types
 */

export interface Bus {
  id: string
  name: string
  registrationNumber: string
  capacity: number
  availableSeats: number
  amenities: string[]
  pricePerSeat: number
  route: string
  departureTime: string
  departureDate: string
  arrivalTime: string
  arrivalDate: string
  rating: number
  totalRatings: number
  operatorId: string
  operatorName: string
  busType: 'AC' | 'Non-AC' | 'Sleeper'
  totalSeats: number
  createdAt: string
  updatedAt: string
}

export interface BusFilter {
  route: string
  departureDate: string
  minPrice: number
  maxPrice: number
  amenities: string[]
}

export interface BusState {
  buses: Bus[]
  selectedBus: Bus | null
  isLoading: boolean
  error: string | null
  totalCount: number
  currentPage: number
  pageSize: number
  filters: BusFilter
}

export interface BusSearchParams {
  route?: string
  departureDate?: string
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
  page?: number
  limit?: number
}

export interface BusSearchResponse {
  buses: Bus[]
  total: number
  page: number
  limit: number
}

export interface SeatInfo {
  seatNumber: number
  status: 'available' | 'booked' | 'unavailable'
  price: number
}
