# Production-Ready Project Setup Script

## 📁 Project Structure Overview

This guide creates a production-ready React frontend following design patterns and clean coding principles.

```
bus-reservation-frontend/
│
├── public/                          # Static files
│   └── index.html
│
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── index.ts
│   │   ├── buses/
│   │   │   ├── BusCard.tsx
│   │   │   ├── BusSearch.tsx
│   │   │   ├── SeatMap.tsx
│   │   │   └── index.ts
│   │   ├── bookings/
│   │   │   ├── BookingForm.tsx
│   │   │   ├── BookingSummary.tsx
│   │   │   └── index.ts
│   │   ├── common/
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorAlert.tsx
│   │   │   ├── SuccessAlert.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   └── layouts/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Sidebar.tsx
│   │       └── index.ts
│   │
│   ├── pages/                       # Page components (one per route)
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── index.ts
│   │   ├── buses/
│   │   │   ├── SearchPage.tsx
│   │   │   ├── DetailPage.tsx
│   │   │   └── index.ts
│   │   ├── bookings/
│   │   │   ├── BookingPage.tsx
│   │   │   ├── HistoryPage.tsx
│   │   │   └── index.ts
│   │   ├── user/
│   │   │   ├── ProfilePage.tsx
│   │   │   └── index.ts
│   │   ├── admin/
│   │   │   ├── DashboardPage.tsx
│   │   │   └── index.ts
│   │   ├── DashboardPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   └── index.ts
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   ├── useForm.ts
│   │   └── index.ts
│   │
│   ├── services/                    # API and business logic
│   │   ├── api/
│   │   │   ├── client.ts            # Axios instance
│   │   │   ├── interceptors.ts      # Request/Response interceptors
│   │   │   └── index.ts
│   │   ├── auth/
│   │   │   ├── authService.ts
│   │   │   └── index.ts
│   │   ├── buses/
│   │   │   ├── busService.ts
│   │   │   └── index.ts
│   │   ├── bookings/
│   │   │   ├── bookingService.ts
│   │   │   └── index.ts
│   │   ├── payments/
│   │   │   ├── paymentService.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── store/                       # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── busSlice.ts
│   │   │   ├── bookingSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── types.ts
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── bus.ts
│   │   ├── booking.ts
│   │   ├── payment.ts
│   │   ├── user.ts
│   │   ├── api.ts
│   │   └── index.ts
│   │
│   ├── utils/                       # Utility functions
│   │   ├── formatters.ts            # Date, currency formatters
│   │   ├── validators.ts            # Input validation
│   │   ├── errorHandler.ts          # Error handling utilities
│   │   ├── constants.ts             # App constants
│   │   ├── helpers.ts               # Helper functions
│   │   └── index.ts
│   │
│   ├── constants/                   # Application constants
│   │   ├── api.ts
│   │   ├── routes.ts
│   │   ├── messages.ts
│   │   └── index.ts
│   │
│   ├── styles/                      # Global styles
│   │   ├── theme.ts
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── App.tsx                      # Root component
│   ├── App.css
│   ├── main.tsx                     # Entry point
│   └── index.css
│
├── tests/                           # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docker/
│   ├── Dockerfile
│   └── .dockerignore
│
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── configmap.yaml
│
├── .github/
│   └── workflows/                   # CI/CD pipelines
│       └── deploy.yml
│
├── config/                          # Configuration files
│   ├── jest.config.ts              # Jest configuration
│   └── eslint.config.js            # ESLint configuration
│
├── .env.example
├── .env.local
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
├── README.md
└── .npmrc
```

---

## 🔧 Step-by-Step Creation Guide

### Step 1: Create Root Directory Structure

```bash
cd d:\Edureka\project\onlinebusreservationproject

# Create main directory
mkdir bus-reservation-frontend
cd bus-reservation-frontend

# Create root directories
mkdir public
mkdir src
mkdir tests
mkdir docker
mkdir k8s
mkdir .github
mkdir .github/workflows
mkdir config
```

### Step 2: Create src Structure

```bash
# Main src directories
mkdir src/{components,pages,hooks,services,store,types,utils,constants,styles,layouts}

# Components subdirectories
mkdir src/components/{auth,buses,bookings,common,layouts}

# Services subdirectories
mkdir src/services/{api,auth,buses,bookings,payments}

# Store subdirectories
mkdir src/store/slices

# Pages subdirectories
mkdir src/pages/{auth,buses,bookings,user,admin}

# Tests subdirectories
mkdir tests/{unit,integration,e2e}
```

### Step 3: Create Configuration Files

Copy these files to root:
- package.json
- tsconfig.json
- tsconfig.node.json
- vite.config.ts
- eslint.config.js
- .prettierrc
- .env.example
- .gitignore

### Step 4: Create Source Files

#### Core Files (src/)
- main.tsx
- App.tsx
- App.css
- index.css

#### Redux Store (src/store/)
- slices/authSlice.ts
- slices/busSlice.ts
- slices/bookingSlice.ts
- slices/uiSlice.ts
- slices/index.ts
- index.ts
- types.ts

#### Services (src/services/)
- api/client.ts
- api/interceptors.ts
- api/index.ts
- auth/authService.ts
- auth/index.ts
- buses/busService.ts
- buses/index.ts
- bookings/bookingService.ts
- bookings/index.ts
- payments/paymentService.ts
- payments/index.ts
- index.ts

#### Types (src/types/)
- auth.ts
- bus.ts
- booking.ts
- payment.ts
- user.ts
- api.ts
- index.ts

#### Utils (src/utils/)
- formatters.ts
- validators.ts
- errorHandler.ts
- constants.ts
- helpers.ts
- index.ts

#### Constants (src/constants/)
- api.ts
- routes.ts
- messages.ts
- index.ts

#### Hooks (src/hooks/)
- useAuth.ts
- useFetch.ts
- useLocalStorage.ts
- useDebounce.ts
- useForm.ts
- index.ts

#### Layouts (src/layouts/)
- Header.tsx
- Footer.tsx
- Sidebar.tsx
- index.ts

#### Components
- components/auth/ProtectedRoute.tsx
- components/auth/index.ts
- components/common/Loading.tsx
- components/common/ErrorAlert.tsx
- components/common/index.ts
- (and more as needed)

#### Pages
- pages/auth/LoginPage.tsx
- pages/auth/SignupPage.tsx
- pages/auth/index.ts
- pages/buses/SearchPage.tsx
- pages/buses/DetailPage.tsx
- pages/buses/index.ts
- (and more as needed)

### Step 5: Create Public Files

**public/index.html:**
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

### Step 6: Create Environment Files

**.env.example:**
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Bus Reservation System
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
VITE_LOG_LEVEL=debug
```

**.env.local:**
```env
VITE_API_URL=http://localhost:8080
VITE_ENVIRONMENT=development
```

### Step 7: Create .gitignore

```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build
dist/
build/
.tsbuildinfo

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Testing
coverage/
.nyc_output/

# Logs
logs/
*.log
```

### Step 8: Create DevOps Files

- Dockerfile
- docker/.dockerignore
- k8s/deployment.yaml
- k8s/service.yaml
- k8s/ingress.yaml
- k8s/configmap.yaml

### Step 9: Install Dependencies

```bash
npm install
```

### Step 10: Verify Setup

```bash
npm run type-check
npm run lint
npm run build
```

---

## 🏗️ Design Patterns Implemented

### 1. **Container/Presentational Component Pattern**
- **Smart Components** (in pages/): Connected to Redux, handle data
- **Dumb Components** (in components/): Pure, reusable UI components

### 2. **Service Layer Pattern**
- API calls isolated in services/
- Business logic separated from UI
- Easy to test and mock

### 3. **Custom Hooks Pattern**
- Extract component logic into reusable hooks
- Easy composition and testing

### 4. **Redux Slice Pattern**
- Modern Redux with Redux Toolkit
- Co-located actions, reducers, selectors
- Immutability built-in

### 5. **Module Index Pattern**
- Each module exports via index.ts
- Clean imports: `import { Component } from '@components'`

### 6. **Separation of Concerns**
- API calls: services/
- State management: store/
- Components: components/ & pages/
- Business logic: utils/
- Configuration: constants/

---

## 📋 File Organization Principles

### Clean Code Principles

1. **Single Responsibility**
   - Each file has one purpose
   - Each component does one thing

2. **Naming Conventions**
   - Components: PascalCase (LoginForm.tsx)
   - Utilities: camelCase (formatDate.ts)
   - Constants: UPPER_SNAKE_CASE
   - Private files: with underscore (_helper.ts)

3. **File Size**
   - Components: <500 lines
   - Services: <300 lines
   - Utils: <200 lines

4. **Export Patterns**
   - Default export for main component
   - Named exports for helpers
   - Index files for barrel exports

---

## 🔒 Security Best Practices

- JWT tokens in localStorage (consider httpOnly cookies)
- CORS configured
- Input validation
- Error boundary ready
- Environment variables for secrets
- No sensitive data in code

---

## ⚡ Performance Optimizations

- Code splitting by route
- Vendor bundle separation
- Lazy component loading
- Redux selectors for efficient updates
- Material-UI optimization

---

## 🧪 Testing Structure

```
tests/
├── unit/
│   ├── hooks/
│   ├── utils/
│   └── services/
├── integration/
│   ├── auth/
│   ├── buses/
│   └── bookings/
└── e2e/
    ├── auth.spec.ts
    ├── search.spec.ts
    └── booking.spec.ts
```

---

## 📝 Next Steps After Setup

1. Run `npm install`
2. Run `npm run dev` to start development
3. Review code structure
4. Start building components in Phase 2
5. Add tests as you develop

---

## ✅ Setup Checklist

- [ ] Created directory structure
- [ ] Copied all configuration files
- [ ] Created all directories
- [ ] Set up environment files
- [ ] Ran npm install
- [ ] npm run type-check passed
- [ ] npm run lint passed
- [ ] npm run build succeeded
- [ ] Ready for Phase 2

---

**This structure ensures:**
✅ Production-ready setup
✅ Scalable architecture
✅ Clean, maintainable code
✅ Design patterns followed
✅ Easy testing
✅ DevOps ready
