import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@layouts'
import ProtectedRoute from '@components/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@store'
import { checkAuthStatus } from '@store/slices/authSlice'

// Lazy load pages for code splitting
import { lazy, Suspense } from 'react'

const LoginPage = lazy(() => import('@pages/auth').then(m => ({ default: m.LoginPage })))
const SignupPage = lazy(() => import('@pages/auth').then(m => ({ default: m.SignupPage })))
const DashboardPage = lazy(() => import('@pages').then(m => ({ default: m.DashboardPage })))
const SearchPage = lazy(() => import('@pages/buses').then(m => ({ default: m.SearchPage })))
const BusDetailPage = lazy(() => import('@pages/buses').then(m => ({ default: m.DetailPage })))
const BookingPage = lazy(() => import('@pages/bookings').then(m => ({ default: m.BookingPage })))
const ProfilePage = lazy(() => import('@pages/user').then(m => ({ default: m.ProfilePage })))
const AdminDashboard = lazy(() => import('@pages/admin').then(m => ({ default: m.DashboardPage })))
const NotFoundPage = lazy(() => import('@pages').then(m => ({ default: m.NotFoundPage })))

// Loading fallback component
const LoadingFallback = () => <div>Loading...</div>

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  // Check authentication status on app load
  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          {/* Dashboard */}
          <Route path="/" element={<DashboardPage />} />

          {/* Bus Routes */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bus/:id" element={<BusDetailPage />} />

          {/* Booking Routes */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
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

        {/* 404 and Fallback */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
