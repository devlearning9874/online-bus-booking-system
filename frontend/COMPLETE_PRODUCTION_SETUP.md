# 🚀 Complete Production Setup Guide - Bus Reservation Frontend

## 📊 Project Summary

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI
- **HTTP Client**: Axios with JWT interceptors
- **Deployment**: Docker + Kubernetes

---

## 📁 Complete Folder Structure

```
bus-reservation-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── index.ts
│   │   ├── buses/
│   │   ├── bookings/
│   │   ├── common/
│   │   └── layouts/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── index.ts
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── index.ts
│   │   ├── buses/
│   │   ├── bookings/
│   │   ├── user/
│   │   ├── admin/
│   │   ├── DashboardPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   ├── auth/
│   │   │   ├── authService.ts
│   │   │   └── index.ts
│   │   ├── buses/
│   │   ├── bookings/
│   │   └── index.ts
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── busSlice.ts
│   │   │   ├── bookingSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── bus.ts
│   │   ├── booking.ts
│   │   ├── payment.ts
│   │   ├── api.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── api.ts
│   │   ├── routes.ts
│   │   └── messages.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docker/
│   ├── Dockerfile
│   └── .dockerignore
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── configmap.yaml
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .env.example
├── .env.local
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── README.md
```

---

## 🔧 Setup Instructions

### Step 1: Create Project Structure

```bash
# Navigate to project directory
cd d:\Edureka\project\onlinebusreservationproject

# Create and enter project directory
mkdir bus-reservation-frontend
cd bus-reservation-frontend

# Create main directories
mkdir public src tests docker k8s .github

# Create src subdirectories
mkdir -p src/{components,pages,hooks,services,store,types,utils,constants,styles,layouts}
mkdir -p src/components/{auth,buses,bookings,common,layouts}
mkdir -p src/services/{api,auth,buses,bookings,payments}
mkdir -p src/store/slices
mkdir -p src/pages/{auth,buses,bookings,user,admin}

# Create tests subdirectories
mkdir -p tests/{unit,integration,e2e}

# Create GitHub workflows
mkdir -p .github/workflows
```

### Step 2: Copy All Configuration Files

Copy these files from session folder to root:

```
package.json
tsconfig.json
tsconfig.node.json
vite.config.ts
eslint.config.js
.prettierrc
.env.example
.gitignore
Dockerfile
k8s files
```

### Step 3: Create Source Files

#### Main Entry Files

**src/main.tsx** - Use `src_main_production.tsx`
**src/App.tsx** - Use `src_App_production.tsx`
**src/App.css** - Create empty
**src/index.css** - Create with global styles

#### Redux Store

```
src/store/index.ts           ← src_store_index_production.ts
src/store/slices/authSlice.ts        ← src_store_authSlice_production.ts
src/store/slices/busSlice.ts         ← src_store_busSlice_production.ts
src/store/slices/bookingSlice.ts     ← src_store_bookingSlice_production.ts
src/store/slices/uiSlice.ts          ← src_store_uiSlice_production.ts
src/store/slices/index.ts            ← Create with barrel exports
```

#### Services

```
src/services/api/client.ts            ← src_services_api_client_production.ts
src/services/auth/authService.ts      ← src_services_auth_production.ts
src/services/auth/index.ts            ← Create with barrel export
src/services/buses/busService.ts      ← src_services_bus_production.ts
src/services/buses/index.ts           ← Create with barrel export
src/services/bookings/bookingService.ts ← src_services_booking_production.ts
src/services/bookings/index.ts        ← Create with barrel export
src/services/index.ts                 ← Create with all exports
```

#### Types

```
src/types/auth.ts          ← src_types_auth_production.ts
src/types/bus.ts           ← src_types_bus_production.ts
src/types/booking.ts       ← src_types_booking_production.ts
src/types/payment.ts       ← src_types_payment_production.ts
src/types/api.ts           ← src_types_api_production.ts
src/types/index.ts         ← Create with barrel export
```

#### Hooks

```
src/hooks/useAuth.ts       ← src_hooks_useAuth_production.ts
src/hooks/useFetch.ts      ← Create similar pattern
src/hooks/index.ts         ← Create with barrel export
```

#### Utils

```
src/utils/formatters.ts    ← src_utils_formatters_production.ts
src/utils/validators.ts    ← src_utils_validators_production.ts
src/utils/helpers.ts       ← Create helper functions
src/utils/index.ts         ← Create with barrel export
```

#### Components

**src/components/auth/ProtectedRoute.tsx**
```tsx
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@store'

interface Props {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

export function ProtectedRoute({ children, requiredRole }: Props) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) return <Navigate to="/login" />
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" />

  return <>{children}</>
}

export default ProtectedRoute
```

**src/components/layouts/Header.tsx**
```tsx
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store'
import { logout } from '@store/slices/authSlice'

export function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [anchorEl, setAnchorEl] = useOpen()

  const handleLogout = () => {
    dispatch(logout())
    setAnchorEl(null)
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontSize: '1.2rem' }}>
            🚌 Bus Reservation
          </Button>
        </Box>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/search">
              Search
            </Button>
            <Button
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {user?.firstName}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem component={Link} to="/profile">
                Profile
              </MenuItem>
              <MenuItem component={Link} to="/bookings">
                My Bookings
              </MenuItem>
              {user?.role === 'admin' && (
                <MenuItem component={Link} to="/admin">
                  Admin
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup" variant="outlined">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
```

**src/components/layouts/Footer.tsx**
```tsx
import { Box, Container, Typography, Link } from '@mui/material'

export function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2024 Bus Reservation System. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
```

#### Pages (Create placeholders for now)

```tsx
// src/pages/DashboardPage.tsx
import { Typography, Container } from '@mui/material'
export default function DashboardPage() {
  return <Typography>Dashboard - Coming Soon</Typography>
}

// Similar structure for other pages
```

#### Layout Component

**src/layouts/index.tsx**
```tsx
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Header from '@components/layouts/Header'
import Footer from '@components/layouts/Footer'

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  )
}
```

### Step 4: Create Public Files

**public/index.html**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bus Reservation System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Step 5: Create Environment Files

**.env.example**
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Bus Reservation System
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
VITE_LOG_LEVEL=debug
```

**.env.local**
```env
VITE_API_URL=http://localhost:8080
VITE_ENVIRONMENT=development
```

### Step 6: Install Dependencies

```bash
npm install
```

### Step 7: Verify Setup

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build

# Start development
npm run dev
```

---

## 📋 File Checklist

### Configuration (8 files)
- [ ] package.json
- [ ] tsconfig.json
- [ ] tsconfig.node.json
- [ ] vite.config.ts
- [ ] eslint.config.js
- [ ] .prettierrc
- [ ] .env.example
- [ ] .gitignore

### Store (5 files)
- [ ] src/store/index.ts
- [ ] src/store/slices/authSlice.ts
- [ ] src/store/slices/busSlice.ts
- [ ] src/store/slices/bookingSlice.ts
- [ ] src/store/slices/uiSlice.ts

### Services (7 files)
- [ ] src/services/api/client.ts
- [ ] src/services/auth/authService.ts
- [ ] src/services/buses/busService.ts
- [ ] src/services/bookings/bookingService.ts
- [ ] src/services/payments/paymentService.ts

### Types (6 files)
- [ ] src/types/auth.ts
- [ ] src/types/bus.ts
- [ ] src/types/booking.ts
- [ ] src/types/payment.ts
- [ ] src/types/api.ts
- [ ] src/types/index.ts

### Utils & Hooks (5 files)
- [ ] src/utils/formatters.ts
- [ ] src/utils/validators.ts
- [ ] src/utils/helpers.ts
- [ ] src/hooks/useAuth.ts
- [ ] src/hooks/useFetch.ts

### Components & Pages (8 files minimum)
- [ ] src/components/auth/ProtectedRoute.tsx
- [ ] src/components/layouts/Header.tsx
- [ ] src/components/layouts/Footer.tsx
- [ ] src/pages/DashboardPage.tsx
- [ ] src/pages/auth/LoginPage.tsx
- [ ] src/pages/auth/SignupPage.tsx
- [ ] src/pages/NotFoundPage.tsx

### Main Entry (3 files)
- [ ] src/main.tsx
- [ ] src/App.tsx
- [ ] src/index.css

---

## ✅ Design Patterns Used

1. **Container/Presentational** - Smart components in pages/, dumb in components/
2. **Custom Hooks** - Extract logic into reusable hooks
3. **Service Layer** - All API calls in services/
4. **Redux Slices** - Modern Redux Toolkit pattern
5. **Module Exports** - Barrel exports via index.ts

---

## 🚀 Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # Run linter
npm run lint:fix         # Fix linting issues
npm run type-check       # TypeScript check
npm run format           # Format code
npm run test             # Run tests
npm run e2e              # Run E2E tests
```

---

## 📦 All Files in Session Folder

All production-ready files are in:
```
C:\Users\abhis\.copilot\session-state\7669b687-1092-48ea-9190-c7e2b2091f9e\files\
```

Look for files named:
- `src_*_production.ts` - Source files ready to use
- `*.ts` configuration files
- Markdown documentation files

---

## ✨ Next Steps

1. Create the folder structure
2. Copy all files from session folder
3. Run `npm install`
4. Run `npm run dev`
5. Verify in browser at http://localhost:3000

**You now have production-ready boilerplate!** 🎉
