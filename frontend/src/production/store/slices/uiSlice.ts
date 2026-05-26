import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  notification: {
    open: boolean
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
  }
  loading: boolean
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'light',
  notification: {
    open: false,
    message: '',
    type: 'info',
  },
  loading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },

    // Theme
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },

    // Notifications
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>,
    ) => {
      state.notification = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    hideNotification: (state) => {
      state.notification.open = false
    },

    // Global loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  showNotification,
  hideNotification,
  setLoading,
} = uiSlice.actions

export default uiSlice.reducer
