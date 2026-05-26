# Phase 1: Project Setup & Core Infrastructure - Implementation Guide

## Overview

This guide walks through setting up the production-ready React frontend for the Bus Reservation System. Phase 1 establishes the foundational project structure, build tools, state management, and API client.

## Completed Artifacts

The following files have been created and are ready to use:

### Configuration Files
- ✅ `package.json` - Dependencies and scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tsconfig.node.json` - Node TypeScript config
- ✅ `vite.config.ts` - Vite build configuration
- ✅ `eslint.config.js` - Linting rules
- ✅ `.prettierrc` - Code formatting rules
- ✅ `.env.example` - Environment variables template
- ✅ `.gitignore` - Git ignore patterns

### Source Code
- ✅ `src/main.tsx` - Application entry point
- ✅ `src/App.tsx` - Root component with routing
- ✅ `src/store/index.ts` - Redux store configuration
- ✅ `src/store/slices/authSlice.ts` - Authentication state
- ✅ `src/store/slices/busSlice.ts` - Bus listing state
- ✅ `src/services/api/client.ts` - Axios HTTP client with interceptors
- ✅ `src/services/auth.ts` - Authentication API service
- ✅ `src/services/bus.ts` - Bus API service
- ✅ `src/types/auth.ts` - Auth TypeScript types
- ✅ `src/types/bus.ts` - Bus TypeScript types
- ✅ `src/components/auth/ProtectedRoute.tsx` - Route protection component
- ✅ `src/components/layout/Layout.tsx` - Main layout component

### DevOps
- ✅ `Dockerfile` - Docker container setup
- ✅ `k8s/deployment.yaml` - Kubernetes deployment
- ✅ `k8s/service.yaml` - Kubernetes service
- ✅ `k8s/ingress.yaml` - Kubernetes ingress
- ✅ `k8s/configmap_hpa.yaml` - ConfigMap and HPA

### Documentation
- ✅ `README.md` - Comprehensive project documentation

## Step-by-Step Setup Instructions

### Step 1: Create Project Directory Structure

```bash
# Navigate to your projects directory
cd d:\Edureka\project

# Create frontend directory (or separate repo)
mkdir bus-reservation-frontend
cd bus-reservation-frontend

# Initialize as git repository (optional, if separate repo)
git init
```

### Step 2: Copy Configuration Files

Copy these files from the session files to your project:
- `package.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `eslint.config.js`
- `.prettierrc`
- `.env.example`
- `.gitignore`
- `Dockerfile`
- `README.md`

### Step 3: Create Source Directory Structure

```bash
mkdir -p src/{components,pages,hooks,services,store,types,utils}
mkdir -p src/components/{auth,buses,bookings,common,layout}
mkdir -p src/store/slices
mkdir -p src/services/api
mkdir -p src/types
mkdir -p public
mkdir -p tests/{unit,integration,e2e}
mkdir -p docker
mkdir -p k8s
```

### Step 4: Copy Source Files

**Redux Store:**
```bash
# Copy store files
cp store/index.ts src/store/
cp store/slices/authSlice.ts src/store/slices/
cp store/slices/busSlice.ts src/store/slices/
```

**Services:**
```bash
# Copy service files
cp services/api/client.ts src/services/api/
cp services/auth.ts src/services/
cp services/bus.ts src/services/
```

**Types:**
```bash
# Copy type definitions
cp types/auth.ts src/types/
cp types/bus.ts src/types/
```

**Components:**
```bash
# Copy components
cp components/auth/ProtectedRoute.tsx src/components/auth/
cp components/layout/Layout.tsx src/components/layout/
```

**App & Main:**
```bash
# Copy main entry files
cp App.tsx src/
cp main.tsx src/
```

### Step 5: Create Placeholder Files

**Create `src/index.css`:**
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
}

html, body, #root {
  height: 100%;
  width: 100%;
}
```

**Create `public/index.html`:**
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

**Create placeholder pages** in `src/pages/`:
```bash
# Create placeholder component files
touch src/pages/{Login,Signup,Dashboard,BusSearch,BusDetails,Booking,UserProfile,AdminDashboard,NotFound}.tsx

# For each file, add:
import { Typography } from '@mui/material'
function PageName(): JSX.Element {
  return <Typography>Page Name - Coming Soon</Typography>
}
export default PageName
```

### Step 6: Create .env File

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Bus Reservation System
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
```

### Step 7: Install Dependencies

```bash
npm install
```

This will install:
- React 18 + React DOM
- React Router v6
- Redux Toolkit + React Redux
- Material-UI components
- Axios for HTTP
- TypeScript & dev tools
- Vite build tool

### Step 8: Verify Installation

```bash
# Check TypeScript compilation
npm run type-check

# Run linter
npm run lint

# Check build
npm run build

# If build succeeds, remove dist for now
rm -rf dist
```

### Step 9: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### Step 10: Create Placeholder Components

**Create `src/components/layout/Header.tsx`:**
```tsx
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store'
import { logout } from '@store/slices/authSlice'

function Header(): JSX.Element {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Bus Reservation
          </Button>
        </Box>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={RouterLink} to="/search">
              Search
            </Button>
            <Button color="inherit" component={RouterLink} to="/profile">
              {user?.firstName || 'Profile'}
            </Button>
            <Button
              color="inherit"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/signup">
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

**Create `src/components/layout/Footer.tsx`:**
```tsx
import { Box, Container, Typography, Link } from '@mui/material'

function Footer(): JSX.Element {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2">
          © 2024 Bus Reservation System. All rights reserved. |{' '}
          <Link href="#" color="inherit">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
```

### Step 11: Copy DevOps Files

```bash
# Copy Docker file
mkdir -p docker
cp Dockerfile docker/Dockerfile
cp .dockerignore docker/

# Copy Kubernetes manifests
mkdir -p k8s
cp k8s/*.yaml k8s/
```

### Step 12: Initialize Git (if separate repo)

```bash
git add .
git commit -m "Initial commit: Phase 1 project setup with Vite, Redux, and Material-UI"
git branch -M main
```

## Verification Checklist

After setup, verify everything is working:

- [ ] `npm install` completes without errors
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run dev` starts server on port 3000
- [ ] Browser opens to http://localhost:3000
- [ ] No TypeScript errors in IDE
- [ ] `npm run build` succeeds
- [ ] All configuration files present
- [ ] Environment variables loaded correctly

## Project Structure After Phase 1

```
bus-reservation-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── buses/
│   │   ├── bookings/
│   │   ├── common/
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Layout.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── BusSearch.tsx
│   │   ├── BusDetails.tsx
│   │   ├── Booking.tsx
│   │   ├── UserProfile.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── NotFound.tsx
│   ├── hooks/
│   ├── services/
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── auth.ts
│   │   └── bus.ts
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   └── busSlice.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── auth.ts
│   │   └── bus.ts
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── configmap_hpa.yaml
├── docker/
│   ├── Dockerfile
│   └── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Common Issues & Troubleshooting

### Port 3000 Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000
# Kill process
taskkill /PID <PID> /F
# Or use different port
npm run dev -- --port 3001
```

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### TypeScript Errors
```bash
npm run type-check
# Fix errors shown, may need to update types
```

### Build Failures
```bash
npm run lint
npm run type-check
# Fix issues found
```

## Next Steps

Phase 1 setup is complete! You now have:
- ✅ Development environment configured
- ✅ Redux state management initialized
- ✅ API client with JWT interceptors
- ✅ Routing structure with protected routes
- ✅ Type-safe foundation with TypeScript
- ✅ Production Docker & Kubernetes setup

**Next Phase**: Build authentication pages (Login/Signup) in Phase 2.

## Quick Commands Reference

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run linter
npm run lint:fix         # Fix linting issues
npm run format           # Format code
npm run type-check       # Check TypeScript
npm run test             # Run tests
npm run e2e              # Run E2E tests
```

## Support & Documentation

- See `README.md` for complete documentation
- Review `plan.md` for implementation plan
- Check backend requirements in README.md Backend API Requirements section
