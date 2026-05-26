# Phase 1 Review & Testing Guide

## 📋 Overview

This guide walks you through reviewing and testing all Phase 1 deliverables to ensure everything is production-ready before moving to Phase 2.

## ✅ Review Checklist

### 1. Configuration Review

#### package.json Review
- [ ] All React/TypeScript dependencies present
- [ ] Redux Toolkit included
- [ ] Material-UI dependencies present
- [ ] Axios included
- [ ] Dev tools (ESLint, Prettier, TypeScript) present
- [ ] All build scripts defined

**Key Dependencies to Check:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@reduxjs/toolkit": "^1.9.7",
  "react-redux": "^8.1.3",
  "@mui/material": "^5.14.13",
  "axios": "^1.6.2"
}
```

#### TypeScript Configuration Review
- [ ] Target is ES2020
- [ ] Strict mode enabled (strict: true)
- [ ] noUnusedLocals enabled
- [ ] Path aliases configured (@/, @components/, etc.)
- [ ] JSX set to react-jsx

**Verify in tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "noUnusedLocals": true,
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

#### Vite Configuration Review
- [ ] Dev server port is 3000
- [ ] React plugin configured
- [ ] Path aliases match tsconfig
- [ ] API proxy configured for backend
- [ ] Code splitting in build config

### 2. Source Code Review

#### Store Configuration (src/store/index.ts)
- [ ] configureStore properly initialized
- [ ] auth reducer registered
- [ ] buses reducer registered
- [ ] RootState exported
- [ ] AppDispatch exported

**Quick Check:**
```typescript
// Should have:
export const store = configureStore({...})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

#### Auth Slice (src/store/slices/authSlice.ts)
- [ ] Initial state has user, token, refreshToken, isAuthenticated, isLoading, error
- [ ] loginStart, loginSuccess, loginFailure actions defined
- [ ] logout action clears all state
- [ ] checkAuthStatus reads from localStorage
- [ ] Token/refresh token persisted to localStorage

**Key Actions to Find:**
```typescript
loginStart, loginSuccess, loginFailure, logout, setUser, checkAuthStatus
```

#### Bus Slice (src/store/slices/busSlice.ts)
- [ ] Buses array initialized
- [ ] Filters object initialized
- [ ] fetchBusesStart, fetchBusesSuccess, fetchBusesFailure defined
- [ ] setSelectedBus action exists
- [ ] setFilters and clearFilters defined

#### API Client (src/services/api/client.ts)
- [ ] Axios instance created with baseURL from env
- [ ] Request interceptor adds Authorization header with token
- [ ] Response interceptor handles 401 errors
- [ ] Token refresh mechanism implemented
- [ ] Automatic logout on failed refresh

**Key Features to Check:**
```typescript
apiClient.interceptors.request.use(...)  // JWT injection
apiClient.interceptors.response.use(...)  // Token refresh
```

#### Services (src/services/auth.ts, bus.ts)
- [ ] Auth service has login, signup, logout, getProfile, updateProfile
- [ ] Bus service has searchBuses, getBusById, getAvailableSeats
- [ ] All use apiClient instance

#### Type Definitions (src/types/)
- [ ] User interface defined with all fields
- [ ] AuthState interface complete
- [ ] Bus interface defined
- [ ] BusState interface complete
- [ ] Request/Response types defined

#### App Component (src/App.tsx)
- [ ] Router setup with BrowserRouter
- [ ] Public routes (login, signup) defined
- [ ] Protected routes wrapped with ProtectedRoute
- [ ] Layout component wraps main routes
- [ ] Admin routes have role check

#### Main Entry (src/main.tsx)
- [ ] React 18 createRoot used
- [ ] Redux Provider wraps app
- [ ] Theme provider configured
- [ ] CssBaseline applied

### 3. Component Review

#### ProtectedRoute Component
- [ ] Checks isAuthenticated from Redux
- [ ] Redirects to /login if not authenticated
- [ ] Can check requiredRole prop
- [ ] Redirects to / if role doesn't match

#### Layout Component
- [ ] Uses Outlet from React Router
- [ ] Renders Header at top
- [ ] Renders Footer at bottom
- [ ] Provides Container wrapper

### 4. DevOps Review

#### Dockerfile
- [ ] Uses multi-stage build (builder and production)
- [ ] Node 18 alpine used
- [ ] Build stage runs npm ci and npm run build
- [ ] Production stage uses serve
- [ ] Non-root user created for security
- [ ] Exposes port 80

#### Kubernetes Manifests
- [ ] deployment.yaml has 3 replicas
- [ ] LivenessProbe and readinessProbe configured
- [ ] Resource requests/limits set
- [ ] Security context applied
- [ ] Service exposes port 80
- [ ] Ingress routes to service
- [ ] ConfigMap has environment variables
- [ ] HPA scales 2-10 replicas based on CPU/Memory

### 5. Documentation Review

#### README.md
- [ ] Project overview clear
- [ ] Features listed
- [ ] Architecture explained
- [ ] Setup instructions present
- [ ] Scripts documented
- [ ] Backend API requirements listed
- [ ] CORS configuration shown
- [ ] Docker/Kubernetes instructions present

#### QUICK_START.md
- [ ] 5-minute setup possible
- [ ] File copy instructions clear
- [ ] Directory structure shown
- [ ] Commands listed
- [ ] Troubleshooting included

---

## 🧪 Testing Instructions

### Step 1: Project Setup

```bash
# 1. Create project directory
mkdir bus-reservation-frontend
cd bus-reservation-frontend

# 2. Create directory structure
mkdir -p src/{components,pages,hooks,services,store,types,utils}
mkdir -p src/components/{auth,buses,bookings,common,layout}
mkdir -p src/store/slices
mkdir -p src/services/api
mkdir -p public
mkdir -p k8s

# 3. Copy ALL files from session folder
# Configuration files → root
# src_*.ts/tsx files → src/
# k8s_*.yaml files → k8s/
```

### Step 2: File Verification

```bash
# Verify key files exist:
ls -la package.json
ls -la tsconfig.json
ls -la vite.config.ts
ls -la src/App.tsx
ls -la src/main.tsx
ls -la src/store/index.ts
ls -la src/services/api/client.ts
```

### Step 3: Create Missing Files

**Create src/index.css:**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.5;
}

html, body, #root {
  height: 100%;
  width: 100%;
}

a {
  text-decoration: none;
  color: inherit;
}
```

**Create public/index.html:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bus Reservation System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Create .env file:**
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Bus Reservation System
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
```

**Create placeholder pages in src/pages/:**
```bash
# Create all 9 placeholder page files
touch src/pages/{Login,Signup,Dashboard,BusSearch,BusDetails,Booking,UserProfile,AdminDashboard,NotFound}.tsx

# Add this template to each:
```

```tsx
import { Typography, Container } from '@mui/material'

function PageName(): JSX.Element {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Page Name - Coming Soon
      </Typography>
    </Container>
  )
}

export default PageName
```

**Create src/components/layout/Header.tsx:**
```tsx
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store'
import { logout } from '@store/slices/authSlice'

function Header(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ fontSize: '1.2rem' }}
          >
            🚌 Bus Reservation
          </Button>
        </Box>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={RouterLink} to="/search">
              Search Buses
            </Button>
            <Button color="inherit" component={RouterLink} to="/profile">
              {user?.firstName || 'Profile'}
            </Button>
            {user?.role === 'admin' && (
              <Button color="inherit" component={RouterLink} to="/admin">
                Admin
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/signup"
              variant="outlined"
              sx={{ ml: 1 }}
            >
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

**Create src/components/layout/Footer.tsx:**
```tsx
import { Box, Container, Typography, Link } from '@mui/material'

function Footer(): JSX.Element {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 8,
        borderTop: '1px solid #ddd',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2024 Bus Reservation System. All rights reserved. |{' '}
          <Link href="#" color="inherit" sx={{ cursor: 'pointer' }}>
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit" sx={{ cursor: 'pointer' }}>
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
```

### Step 4: Install Dependencies

```bash
npm install
```

Expected output should show all packages installing without errors. Should complete in 2-5 minutes.

**Verify installation:**
```bash
npm list react
npm list react-redux
npm list @mui/material
npm list axios
```

### Step 5: Verify TypeScript

```bash
npm run type-check
```

**Expected result:** No errors or warnings (or only minor warnings)

### Step 6: Run Linter

```bash
npm run lint
```

**Expected result:** No errors

### Step 7: Test Build

```bash
npm run build
```

**Expected result:**
```
✓ 123 modules transformed.
dist/index.html                   2.45 kB
dist/assets/index-abc123.js     145.67 kB
dist/assets/index-def456.css      3.21 kB

✓ built in 0.87s
```

### Step 8: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

**Leave this running and open another terminal for next steps**

### Step 9: Test in Browser

1. Open http://localhost:3000
2. Should see:
   - Header with "Bus Reservation" title
   - Login and Signup buttons
   - Main content area
   - Footer
3. Try these actions:
   - Click Login button → should see placeholder login page
   - Click Signup button → should see placeholder signup page
   - Click home button → should return to dashboard

### Step 10: Test Routing

#### Public Routes
- [ ] http://localhost:3000/login - Shows Login page
- [ ] http://localhost:3000/signup - Shows Signup page
- [ ] http://localhost:3000/ - Shows Dashboard

#### Protected Routes (should redirect to login)
- [ ] http://localhost:3000/search - Redirects to login
- [ ] http://localhost:3000/profile - Redirects to login
- [ ] http://localhost:3000/booking - Redirects to login

#### 404 Handling
- [ ] http://localhost:3000/nonexistent - Shows 404 page

### Step 11: Test Redux DevTools

1. Install Redux DevTools browser extension (if not already installed)
2. Open browser DevTools (F12)
3. Look for "Redux" tab
4. Should show:
   - auth state with initial values
   - buses state with initial values

### Step 12: Test CSS & Styling

- [ ] Material-UI theme applied (check colors)
- [ ] Responsive design (resize browser, check mobile view)
- [ ] Header and Footer properly styled
- [ ] No missing fonts or styling issues

### Step 13: Test Environment Variables

Create a test file to verify:

**Create src/test-env.tsx:**
```tsx
function TestEnv(): JSX.Element {
  return (
    <div>
      <p>API URL: {import.meta.env.VITE_API_URL}</p>
      <p>App Name: {import.meta.env.VITE_APP_NAME}</p>
      <p>Version: {import.meta.env.VITE_APP_VERSION}</p>
      <p>Environment: {import.meta.env.VITE_ENVIRONMENT}</p>
    </div>
  )
}

export default TestEnv
```

Add to App.tsx temporarily to verify env vars are loaded correctly.

### Step 14: Test API Client (Optional)

Create a test component:

**Create src/test-api.tsx:**
```tsx
import { useEffect, useState } from 'react'
import apiClient from '@services/api/client'

function TestAPI(): JSX.Element {
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    // Test that apiClient is configured
    setResult('API client configured successfully')
  }, [])

  return <div>{result}</div>
}

export default TestAPI
```

---

## 🔍 Manual Verification Checklist

### Build & Performance
- [ ] `npm run build` completes in <2 seconds
- [ ] Bundle size <200KB (can verify with `npm run build`)
- [ ] No console errors when building
- [ ] Dev server starts in <1 second

### Code Quality
- [ ] `npm run lint` passes with no errors
- [ ] `npm run type-check` passes with no errors
- [ ] All TypeScript files compile
- [ ] No unused imports or variables

### Routing & Navigation
- [ ] All routes accessible
- [ ] Protected routes redirect to login
- [ ] Header shows correct buttons based on auth state
- [ ] Navigation between pages works smoothly

### Redux State
- [ ] Redux DevTools shows initial state
- [ ] Auth state has correct shape
- [ ] Bus state has correct shape
- [ ] State persists across page refreshes

### UI/Components
- [ ] Material-UI theme applied
- [ ] Responsive on mobile (use browser dev tools)
- [ ] All buttons clickable
- [ ] No layout issues or misalignment

### Docker
- [ ] Dockerfile syntax correct
- [ ] Can build: `docker build -f docker/Dockerfile -t bus-frontend:test .`
- [ ] Can run: `docker run -p 3000:80 bus-frontend:test`
- [ ] App accessible at http://localhost:3000

### Kubernetes
- [ ] All YAML files valid
- [ ] Can check syntax: `kubectl apply -f k8s/ --dry-run=client`
- [ ] Deployment has correct labels
- [ ] Service exposes correct port
- [ ] HPA configured correctly

---

## 📊 Testing Results Template

Use this to document your findings:

```markdown
# Phase 1 Testing Results

## Configuration
- [ ] package.json: PASS/FAIL
- [ ] tsconfig.json: PASS/FAIL
- [ ] vite.config.ts: PASS/FAIL
- [ ] Environment setup: PASS/FAIL

## Code Quality
- [ ] npm run lint: PASS/FAIL
- [ ] npm run type-check: PASS/FAIL
- [ ] npm run build: PASS/FAIL
- [ ] npm run dev startup: PASS/FAIL

## Routing
- [ ] Public routes: PASS/FAIL
- [ ] Protected routes: PASS/FAIL
- [ ] 404 handling: PASS/FAIL

## Redux
- [ ] Auth slice: PASS/FAIL
- [ ] Bus slice: PASS/FAIL
- [ ] Redux DevTools: PASS/FAIL

## UI/Components
- [ ] Header renders: PASS/FAIL
- [ ] Footer renders: PASS/FAIL
- [ ] Material-UI theme: PASS/FAIL
- [ ] Responsive design: PASS/FAIL

## API Client
- [ ] Axios configured: PASS/FAIL
- [ ] JWT interceptor ready: PASS/FAIL
- [ ] Token refresh logic: PASS/FAIL

## DevOps
- [ ] Dockerfile builds: PASS/FAIL
- [ ] Kubernetes YAML valid: PASS/FAIL

## Overall: PASS/FAIL
```

---

## 🐛 Common Issues & Solutions

### Issue: npm install fails
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Use different port
npm run dev -- --port 3001

# Or find and kill process
lsof -i :3000
kill -9 <PID>
```

### Issue: TypeScript errors
**Solution:**
```bash
npm run type-check  # See specific errors
# Fix file paths, imports, type issues
```

### Issue: Build fails
**Solution:**
```bash
npm run lint        # Check lint errors
npm run type-check  # Check type errors
# Fix issues before retrying build
```

### Issue: Redux not working
**Solution:**
- Check Provider in main.tsx
- Verify store export in src/store/index.ts
- Check Redux DevTools

### Issue: Routing not working
**Solution:**
- Check BrowserRouter in App.tsx
- Verify all Route paths
- Check component imports

---

## ✅ Sign-Off Checklist

Before proceeding to Phase 2:

- [ ] All files copied correctly
- [ ] npm install completed successfully
- [ ] npm run dev starts without errors
- [ ] Application loads in browser
- [ ] No console errors
- [ ] Routing works correctly
- [ ] Protected routes redirect to login
- [ ] Redux state initialized
- [ ] Material-UI theme applied
- [ ] Docker builds successfully
- [ ] Kubernetes manifests valid
- [ ] All tests pass

---

## 📝 Notes

Record any issues or observations here:

```
Issue 1:
Description:
Solution:

Issue 2:
Description:
Solution:
```

---

## ✨ Phase 1 Testing Complete

Once all checks pass, Phase 1 is verified and ready for Phase 2!

**Next Phase:** Authentication Module Implementation (2-3 hours)
