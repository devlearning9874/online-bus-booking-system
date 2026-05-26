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
  arrivalTime: string
  rating: number
  totalRatings: number
  createdAt: string
  updatedAt: string
}

export interface BusState {
  buses: Bus[]
  selectedBus: Bus | null
  isLoading: boolean
  error: string | null
  filters: BusFilters
}

export interface BusFilters {
  route: string
  date: string
  minPrice: number
  maxPrice: number
}

export interface BusSearchParams {
  route?: string
  date?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}

export interface BusSearchResponse {
  buses: Bus[]
  total: number
  page: number
  limit: number
}

export type BusFilter = BusFilters

export interface SeatInfo {
  seatNumber: number
  status: 'available' | 'booked' | 'unavailable'
  price: number
}
