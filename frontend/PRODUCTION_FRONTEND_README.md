# 🚌 Bus Reservation System - React Frontend (Production Ready)

Complete, production-grade React + TypeScript frontend for the Online Bus Reservation System microservices backend.

## 📋 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

### Installation (5 minutes)

```bash
# 1. Clone or create project directory
mkdir bus-reservation-frontend
cd bus-reservation-frontend

# 2. Run setup script (Windows PowerShell)
powershell -ExecutionPolicy Bypass -File setup-production.ps1

# 3. Copy all files from session folder to appropriate directories
# See COMPLETE_PRODUCTION_SETUP.md for detailed file mapping

# 4. Install dependencies
npm install

# 5. Verify setup
npm run type-check
npm run lint
npm run build

# 6. Start development
npm run dev
```

Browse to **http://localhost:3000** 🎉

---

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (sub-2s HMR)
- **State Management**: Redux Toolkit with Thunk middleware
- **HTTP Client**: Axios with JWT interceptors
- **UI Library**: Material-UI v5 (production-grade components)
- **Routing**: React Router v6 (lazy loading, protected routes)
- **Forms**: React Hook Form (performance-optimized)
- **Testing**: Vitest + React Testing Library + Playwright
- **Code Quality**: ESLint + Prettier
- **Deployment**: Docker + Kubernetes

### Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layouts/        # Page layouts
│   ├── buses/          # Bus feature components
│   ├── bookings/       # Booking feature components
│   └── common/         # Shared components
├── pages/              # Page/route components
│   ├── auth/           # Login, signup, password reset
│   ├── buses/          # Search, details
│   ├── bookings/       # Create, list, details
│   └── admin/          # Admin pages
├── services/           # API service layer
│   ├── api/            # Axios client with interceptors
│   ├── auth/           # Auth API calls
│   ├── buses/          # Bus API calls
│   ├── bookings/       # Booking API calls
│   └── payments/       # Payment API calls
├── store/              # Redux store
│   └── slices/         # Redux Toolkit slices
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # App constants
└── styles/             # Global styles
```

---

## 🔐 Authentication & Security

### JWT Token Flow
1. **Login** → Backend returns `token` + `refreshToken`
2. **Store** → Tokens saved in localStorage
3. **Auto-Inject** → Request interceptor adds `Authorization: Bearer {token}`
4. **Token Refresh** → 401 response triggers refresh mechanism
5. **Retry** → Original request retried with new token

### Interceptors
```typescript
// Request Interceptor: Attach JWT token
GET /api/buses → Authorization: Bearer eyJhbG...

// Response Interceptor: Handle 401
401 Response → Refresh token → Retry request

// Error Handling: Redirect to login on refresh failure
Refresh Failed → Clear tokens → Redirect /login
```

### Protected Routes
```tsx
<ProtectedRoute requiredRole="user">
  <DashboardPage />
</ProtectedRoute>
```

---

## 📊 State Management (Redux)

### Store Shape
```typescript
{
  auth: {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
  },
  buses: {
    buses: Bus[]
    selectedBus: Bus | null
    filters: BusFilter
    pagination: Pagination
    isLoading: boolean
    error: string | null
  },
  bookings: {
    bookings: Booking[]
    currentBooking: Booking | null
    pagination: Pagination
    isLoading: boolean
    error: string | null
  },
  ui: {
    sidebarOpen: boolean
    theme: 'light' | 'dark'
    notification: Notification | null
    loading: boolean
  }
}
```

### Usage
```typescript
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@store'
import { loginSuccess } from '@store/slices/authSlice'

function MyComponent() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleLogin = () => {
    dispatch(loginSuccess(userData))
  }

  return ...
}
```

---

## 🔗 API Integration

### Backend Services
- **User Service** (9900) - Auth, profiles
- **Bus Service** (6000) - Bus management
- **Booking Service** (7200) - Booking operations
- **Payment Service** (8500) - Payment processing
- **Route Service** - Routes data
- **Schedule Service** - Schedules data
- **Inventory Service** - Seat availability

### API Client Configuration

```typescript
// src/services/api/client.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Auto-injects JWT token
// Handles 401 errors with token refresh
// Provides error mapping
```

### Example Service

```typescript
// src/services/buses/busService.ts
const busService = {
  searchBuses: (params) => apiClient.get('/buses/search', { params }),
  getBusById: (id) => apiClient.get(`/buses/${id}`),
  getAvailableSeats: (busId, date) => 
    apiClient.get(`/buses/${busId}/available-seats`, { params: { date } })
}
```

---

## 🎨 Styling & Theme

### Material-UI Integration
```tsx
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, Button, Container } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
})

// Used in main.tsx
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

### Responsive Design
```tsx
<Box sx={{
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: 2
}}>
  Content
</Box>
```

---

## 🧪 Testing Strategy

### Unit Tests
```bash
npm run test            # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Example Test
```typescript
import { render, screen } from '@testing-library/react'
import { LoginForm } from '@components/auth'

test('renders login form', () => {
  render(<LoginForm />)
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
})
```

### E2E Tests
```bash
npm run e2e            # Run Playwright tests
npm run e2e:ui        # UI mode
```

---

## 📦 Available Scripts

```bash
# Development
npm run dev             # Start dev server (port 3000)
npm run build           # Production build
npm run preview         # Preview build locally

# Code Quality
npm run lint            # ESLint check
npm run lint:fix        # Auto-fix linting
npm run format          # Prettier formatting
npm run type-check      # TypeScript check

# Testing
npm run test            # Unit & integration tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
npm run e2e            # E2E tests (Playwright)

# DevOps
npm run docker:build    # Build Docker image
npm run docker:run      # Run Docker container
npm run k8s:deploy     # Deploy to Kubernetes
```

---

## 🐳 Docker & Kubernetes

### Docker
```bash
# Build
docker build -f docker/Dockerfile -t bus-reservation-frontend:1.0.0 .

# Run
docker run -p 3000:80 bus-reservation-frontend:1.0.0

# Docker Compose
docker-compose -f docker/docker-compose.yml up
```

### Kubernetes
```bash
# Deploy
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

# Check status
kubectl get pods
kubectl get svc
kubectl logs <pod-name>
```

---

## 🔧 Environment Configuration

### Variables
```env
# .env.local
VITE_API_URL=http://localhost:8080          # Backend API URL
VITE_APP_NAME=Bus Reservation System
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
VITE_LOG_LEVEL=debug
```

### Per-Environment
```bash
# Development
npm run dev                    # Uses .env.local

# Production
npm run build                  # Uses .env.production
```

---

## 📋 File Organization & Naming

### Components
```
✅ Login.tsx          # Feature-specific component
✅ LoginForm.tsx      # Form components
✅ LoginCard.tsx      # Styled containers

❌ login.tsx          # Use PascalCase
❌ LoginComponent     # Don't add redundant suffix
```

### Services
```
✅ authService.ts     # Service file
✅ busService.ts      # API service layer

❌ service.ts         # Too generic
❌ api-service.ts     # Use camelCase
```

### Types
```
✅ auth.ts            # Feature-specific types
✅ User, LoginRequest # Export specific types

❌ types.ts           # Too generic
❌ interfaces.ts      # Use types.ts name
```

### Utils
```
✅ formatters.ts      # Related utilities grouped
✅ validators.ts      # Specific purpose

❌ utils.ts           # Too generic
❌ helper.ts          # Use helpers.ts
```

---

## ⚙️ Performance Optimization

### Code Splitting
```typescript
// Automatic via Vite
const DashboardPage = React.lazy(() => import('@pages/Dashboard'))

<Suspense fallback={<Loading />}>
  <DashboardPage />
</Suspense>
```

### Bundle Analysis
```bash
npm run build -- --analyze
```

### Performance Metrics
- Initial Load: < 3s
- TTI (Time to Interactive): < 4.5s
- FCP (First Contentful Paint): < 1.5s
- Bundle Size: < 200KB gzipped (with code splitting)

---

## 🛣️ Routes & Navigation

### Public Routes
```
/                 # Home
/login           # Login page
/signup          # Registration
/forgot-password # Password reset
```

### Protected Routes
```
/dashboard       # User dashboard
/profile         # User profile
/search          # Bus search
/buses/:id       # Bus details
/bookings        # Booking list
/bookings/:id    # Booking details
```

### Admin Routes
```
/admin           # Admin dashboard
/admin/users     # User management
/admin/buses     # Bus management
/admin/bookings  # Booking management
```

---

## 📚 API Endpoints Reference

### Authentication
```
POST   /auth/login
POST   /auth/signup
POST   /auth/logout
POST   /auth/refresh-token
POST   /auth/password-reset-request
POST   /auth/password-reset
POST   /auth/change-password
```

### Buses
```
GET    /buses
GET    /buses/search
GET    /buses/:id
GET    /buses/:id/available-seats
GET    /buses/routes
GET    /buses/amenities
```

### Bookings
```
POST   /bookings
GET    /bookings
GET    /bookings/:id
PUT    /bookings/:id
POST   /bookings/:id/cancel
GET    /bookings/:id/receipt
```

### Payments
```
POST   /payments
GET    /payments
GET    /payments/:id
POST   /payments/:id/refund
```

---

## 🐛 Debugging

### TypeScript Errors
```bash
npm run type-check    # Full check
```

### Runtime Errors
```bash
# Browser DevTools
F12 → Console         # Check for errors
F12 → Network        # Check API calls
```

### Redux DevTools
```bash
# Install extension
# Inspect state and actions in browser
```

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoint verified
- [ ] JWT token handling tested
- [ ] All routes protected correctly
- [ ] Build succeeds: `npm run build`
- [ ] No console errors/warnings
- [ ] Performance metrics met
- [ ] Security audit passed
- [ ] Docker image builds
- [ ] Kubernetes manifests updated
- [ ] CI/CD pipeline working

---

## 📞 Support & Documentation

### In This Repo
- `COMPLETE_PRODUCTION_SETUP.md` - Detailed setup guide
- `PRODUCTION_FOLDER_CHECKLIST.md` - File checklist
- `PRODUCTION_SETUP_SCRIPT.md` - Step-by-step instructions
- `PHASE1_TESTING_GUIDE.md` - Testing procedures
- `PHASE1_CODE_REVIEW.md` - Code quality analysis

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Material-UI Documentation](https://mui.com)
- [Vite Documentation](https://vitejs.dev)

---

## 📝 License

This project is part of the Online Bus Reservation System.

---

## 🎯 Key Features Implemented

✅ JWT Authentication with token refresh
✅ Protected & role-based routes
✅ Redux Toolkit state management
✅ Material-UI components
✅ Axios with automatic token injection
✅ Error handling & validation
✅ Responsive design
✅ TypeScript strict mode
✅ ESLint & Prettier configured
✅ Docker & Kubernetes ready
✅ Performance optimized
✅ Code split and lazy loaded
✅ Clean code & design patterns
✅ Comprehensive documentation

---

**🎉 Production-ready frontend is ready to go!**

Start with `npm install` and `npm run dev` to begin development.
