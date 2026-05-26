import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Booking, BookingState } from '@types/booking'

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
}

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    // Fetch bookings
    fetchBookingsStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchBookingsSuccess: (state, action: PayloadAction<{ bookings: Booking[]; total: number }>) => {
      state.bookings = action.payload.bookings
      state.totalCount = action.payload.total
      state.isLoading = false
    },
    fetchBookingsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },

    // Create booking
    createBookingStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    createBookingSuccess: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload
      state.bookings.unshift(action.payload)
      state.isLoading = false
    },
    createBookingFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },

    // Cancel booking
    cancelBookingStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    cancelBookingSuccess: (state, action: PayloadAction<string>) => {
      const index = state.bookings.findIndex(b => b.id === action.payload)
      if (index > -1) {
        state.bookings[index].status = 'cancelled'
      }
      state.isLoading = false
    },
    cancelBookingFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },

    // Select booking
    selectBooking: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload
    },

    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  createBookingStart,
  createBookingSuccess,
  createBookingFailure,
  cancelBookingStart,
  cancelBookingSuccess,
  cancelBookingFailure,
  selectBooking,
  setCurrentPage,
  clearError,
} = bookingSlice.actions

export default bookingSlice.reducer
