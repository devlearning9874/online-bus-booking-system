import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuthStatus } from './store/slices/authSlice'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import BusSearch from './pages/BusSearch'
import BusDetails from './pages/BusDetails'
import Booking from './pages/Booking'
import UserProfile from './pages/UserProfile'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function App(): JSX.Element {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus() as any)
  }, [dispatch])

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<BusSearch />} />
          <Route path="/bus/:id" element={<BusDetails />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  )
}

export default App
