import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Bus, BusState } from '@/types/bus'

const initialState: BusState = {
  buses: [],
  selectedBus: null,
  isLoading: false,
  error: null,
  filters: {
    route: '',
    date: '',
    minPrice: 0,
    maxPrice: 10000,
  },
}

const busSlice = createSlice({
  name: 'buses',
  initialState,
  reducers: {
    fetchBusesStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchBusesSuccess: (state, action: PayloadAction<Bus[]>) => {
      state.buses = action.payload
      state.isLoading = false
    },
    fetchBusesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    setSelectedBus: (state, action: PayloadAction<Bus>) => {
      state.selectedBus = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<BusState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const {
  fetchBusesStart,
  fetchBusesSuccess,
  fetchBusesFailure,
  setSelectedBus,
  setFilters,
  clearFilters,
} = busSlice.actions

export default busSlice.reducer
