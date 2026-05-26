import { busApiClient } from '../api/client'
import type { Bus, BusSearchParams, BusSearchResponse, SeatInfo } from '@/types/bus'

const fallbackBuses: Bus[] = [
  {
    id: '1',
    name: 'Elite Express',
    registrationNumber: 'TN-01-AB-1234',
    capacity: 42,
    availableSeats: 12,
    amenities: ['Wi-Fi', 'Charging', 'Water Bottle'],
    pricePerSeat: 750,
    route: 'Chennai - Bangalore',
    departureTime: '06:30',
    arrivalTime: '12:00',
    rating: 4.8,
    totalRatings: 128,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Skyline Coach',
    registrationNumber: 'TN-09-CD-5678',
    capacity: 36,
    availableSeats: 8,
    amenities: ['AC', 'Sleeper', 'Refreshments'],
    pricePerSeat: 980,
    route: 'Chennai - Coimbatore',
    departureTime: '08:00',
    arrivalTime: '15:30',
    rating: 4.7,
    totalRatings: 94,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Sunrise Delux',
    registrationNumber: 'TN-12-EF-9101',
    capacity: 48,
    availableSeats: 18,
    amenities: ['AC', 'Wi-Fi', 'Reading Light'],
    pricePerSeat: 860,
    route: 'Bangalore - Mysore',
    departureTime: '10:15',
    arrivalTime: '13:45',
    rating: 4.6,
    totalRatings: 76,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mapBus = (bus: any): Bus => ({
  id: String(bus.id ?? bus.busId ?? bus.bus_id ?? 'unknown'),
  name: bus.name ?? bus.busName ?? bus.bus_name ?? 'Unnamed Bus',
  registrationNumber: bus.registrationNumber ?? bus.registration_number ?? 'N/A',
  capacity: Number(bus.capacity ?? bus.totalSeats ?? bus.total_seats ?? 36),
  availableSeats: Number(bus.availableSeats ?? bus.available_seats ?? Math.max(1, Number(bus.totalSeats ?? bus.total_seats ?? 36) - 4)),
  amenities: Array.isArray(bus.amenities) ? bus.amenities : ['AC', 'Wi-Fi'],
  pricePerSeat: Number(bus.pricePerSeat ?? bus.price_per_seat ?? 750),
  route: bus.route ?? bus.source ?? 'Chennai - Bangalore',
  departureTime: bus.departureTime ?? bus.departure_time ?? '06:30',
  arrivalTime: bus.arrivalTime ?? bus.arrival_time ?? '12:30',
  rating: Number(bus.rating ?? 4.5),
  totalRatings: Number(bus.totalRatings ?? bus.total_ratings ?? 0),
  createdAt: bus.createdAt ?? new Date().toISOString(),
  updatedAt: bus.updatedAt ?? new Date().toISOString(),
})

const mapSeatInfo = (bus: Bus): SeatInfo[] =>
  Array.from({ length: bus.availableSeats }, (_, index) => ({
    seatNumber: index + 1,
    status: 'available',
    price: bus.pricePerSeat,
  }))

export const busService = {
  searchBuses: async (params: BusSearchParams): Promise<BusSearchResponse> => {
    try {
      const response = await busApiClient.get('/api/v1/bus')
      const buses = Array.isArray(response.data) ? response.data.map(mapBus) : []
      const filtered = buses.filter((bus) => {
        const routeMatch = !params.route || bus.route.toLowerCase().includes(params.route.toLowerCase())
        const priceMatch =
          (!params.minPrice || bus.pricePerSeat >= params.minPrice) &&
          (!params.maxPrice || bus.pricePerSeat <= params.maxPrice)

        return routeMatch && priceMatch
      })

      return {
        buses: filtered,
        total: filtered.length,
        page: params.page ?? 1,
        limit: params.limit ?? (filtered.length || 10),
      }
    } catch {
      const filtered = fallbackBuses.filter((bus) => {
        const routeMatch = !params.route || bus.route.toLowerCase().includes(params.route.toLowerCase())
        const priceMatch =
          (!params.minPrice || bus.pricePerSeat >= params.minPrice) &&
          (!params.maxPrice || bus.pricePerSeat <= params.maxPrice)

        return routeMatch && priceMatch
      })

      return {
        buses: filtered,
        total: filtered.length,
        page: params.page ?? 1,
        limit: params.limit ?? (filtered.length || 10),
      }
    }
  },

  getBusById: async (id: string): Promise<Bus> => {
    try {
      const response = await busApiClient.get(`/api/v1/bus/${id}`)
      return mapBus(response.data)
    } catch {
      return fallbackBuses.find((bus) => bus.id === id) ?? fallbackBuses[0]
    }
  },

  getAllBuses: async (): Promise<Bus[]> => {
    try {
      const response = await busApiClient.get('/api/v1/bus')
      const buses = Array.isArray(response.data) ? response.data.map(mapBus) : fallbackBuses
      return buses
    } catch {
      return fallbackBuses
    }
  },

  getAvailableSeats: async (busId: string): Promise<SeatInfo[]> => {
    const bus = await busService.getBusById(busId)
    return mapSeatInfo(bus)
  },
}

export default busService
