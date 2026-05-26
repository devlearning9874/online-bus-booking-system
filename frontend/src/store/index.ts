import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import busReducer from './slices/busSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
