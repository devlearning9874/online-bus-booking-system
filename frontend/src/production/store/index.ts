import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import busReducer from './slices/busSlice'
import bookingReducer from './slices/bookingSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busReducer,
    bookings: bookingReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ['auth/loginSuccess', 'auth/signupSuccess'],
        ignoredActionPaths: ['payload.user'],
        ignoredPaths: ['auth.user'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
