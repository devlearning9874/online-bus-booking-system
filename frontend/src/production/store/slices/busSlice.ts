import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Bus, BusState, BusFilter } from '@types/bus'

const initialState: BusState = {
  buses: [],
  selectedBus: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  filters: {
    route: '',
    departureDate: '',
    minPrice: 0,
    maxPrice: 10000,
    amenities: [],
  },
}

const busSlice = createSlice({
  name: 'buses',
  initialState,
  reducers: {
    // Fetch buses
    fetchBusesStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchBusesSuccess: (state, action: PayloadAction<{ buses: Bus[]; total: number }>) => {
      state.buses = action.payload.buses
      state.totalCount = action.payload.total
      state.isLoading = false
      state.error = null
    },
    fetchBusesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },

    // Select bus
    selectBus: (state, action: PayloadAction<Bus>) => {
      state.selectedBus = action.payload
    },
    deselectBus: (state) => {
      state.selectedBus = null
    },

    // Filters
    setFilters: (state, action: PayloadAction<Partial<BusFilter>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.currentPage = 1 // Reset to first page on filter change
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
      state.currentPage = 1
    },

    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  fetchBusesStart,
  fetchBusesSuccess,
  fetchBusesFailure,
  selectBus,
  deselectBus,
  setFilters,
  clearFilters,
  setCurrentPage,
  setPageSize,
  clearError,
} = busSlice.actions

export default busSlice.reducer
