# 🚀 Quick Start Guide - Phase 1 Complete

## Download & Setup (5 minutes)

### 1. Get All Files
All files are in: `C:\Users\abhis\.copilot\session-state\7669b687-1092-48ea-9190-c7e2b2091f9e\files\`

### 2. Create Project
```bash
mkdir bus-reservation-frontend
cd bus-reservation-frontend
```

### 3. Copy Configuration Files
Copy these to your project root:
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
README.md
PHASE1_SETUP_GUIDE.md
```

### 4. Create Directory Structure
```bash
mkdir -p src/{components,pages,hooks,services,store,types,utils}
mkdir -p src/components/{auth,buses,bookings,common,layout}
mkdir -p src/store/slices
mkdir -p src/services/api
mkdir -p public
mkdir -p docker
mkdir -p k8s
```

### 5. Copy Source Files
Copy to `src/store/slices/`:
- `src_store_slices_authSlice.ts` → `authSlice.ts`
- `src_store_slices_busSlice.ts` → `busSlice.ts`

Copy to `src/store/`:
- `src_store_index.ts` → `index.ts`

Copy to `src/services/api/`:
- `src_services_api_client.ts` → `client.ts`

Copy to `src/services/`:
- `src_services_auth.ts` → `auth.ts`
- `src_services_bus.ts` → `bus.ts`

Copy to `src/types/`:
- `src_types_auth.ts` → `auth.ts`
- `src_types_bus.ts` → `bus.ts`

Copy to `src/components/auth/`:
- `src_components_auth_ProtectedRoute.tsx` → `ProtectedRoute.tsx`

Copy to `src/components/layout/`:
- `src_components_layout_Layout.tsx` → `Layout.tsx`

Copy to `src/`:
- `src_App.tsx` → `App.tsx`
- `src_main.tsx` → `main.tsx`

### 6. Create Remaining Files
**src/index.css:**
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Roboto', sans-serif; background-color: #f5f5f5; }
html, body, #root { height: 100%; width: 100%; }
```

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

**Create placeholder pages** in `src/pages/`:
- `Login.tsx`
- `Signup.tsx`
- `Dashboard.tsx`
- `BusSearch.tsx`
- `BusDetails.tsx`
- `Booking.tsx`
- `UserProfile.tsx`
- `AdminDashboard.tsx`
- `NotFound.tsx`

Template for each page:
```tsx
import { Typography } from '@mui/material'
function PageName(): JSX.Element {
  return <Typography>Page Name - Coming Soon</Typography>
}
export default PageName
```

**Create placeholder components** in `src/components/layout/`:
- `Header.tsx` (see PHASE1_SETUP_GUIDE.md)
- `Footer.tsx` (see PHASE1_SETUP_GUIDE.md)

### 7. Copy DevOps Files
Copy Kubernetes files to `k8s/`:
- `k8s_deployment.yaml` → `deployment.yaml`
- `k8s_service.yaml` → `service.yaml`
- `k8s_ingress.yaml` → `ingress.yaml`
- `k8s_configmap_hpa.yaml` → `configmap_hpa.yaml`

### 8. Setup Environment
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

### 9. Install & Run
```bash
npm install
npm run dev
```

Open: http://localhost:3000

## 📋 What's Included

### ✅ Core Setup
- [x] React 18 + TypeScript
- [x] Vite build tool
- [x] Redux Toolkit
- [x] Material-UI
- [x] React Router
- [x] Axios HTTP client
- [x] Protected routes
- [x] JWT authentication framework

### ✅ Configuration
- [x] TypeScript strict mode
- [x] ESLint + Prettier
- [x] Vite optimization
- [x] Path aliases (@/)
- [x] Environment variables
- [x] Git ignore patterns

### ✅ DevOps
- [x] Docker multi-stage build
- [x] Kubernetes deployment
- [x] Service & Ingress
- [x] ConfigMap & HPA
- [x] Health checks

### ✅ Documentation
- [x] README.md
- [x] PHASE1_SETUP_GUIDE.md
- [x] PHASE1_COMPLETE.md
- [x] This quick start guide

## 🎯 Key Features Ready

**JWT Auth:**
- ✅ Interceptors for token injection
- ✅ Automatic refresh on 401
- ✅ Logout mechanism

**State Management:**
- ✅ Auth slice (user, token, login status)
- ✅ Bus slice (buses, filters, search)
- ✅ Async actions support

**Routing:**
- ✅ Public routes (login, signup)
- ✅ Protected routes (dashboard, profile)
- ✅ Role-based access (admin)
- ✅ 404 handling

## 📝 Development Commands

```bash
npm run dev              # 🚀 Start dev server
npm run build            # 📦 Build for production
npm run lint             # 🔍 Check code quality
npm run format           # ✨ Format code
npm run type-check       # 🔎 Check types
npm run test             # ✅ Run tests
npm run e2e              # 🎭 Run E2E tests
```

## 🔗 Backend Requirements

Backend must have CORS enabled and provide:

```
POST /auth/login → JWT token + refresh token
POST /auth/signup → JWT token + refresh token  
POST /auth/refresh-token → New JWT token
GET /users/me → Current user
GET /buses → Bus list
... (see README.md for full API list)
```

## 🐳 Docker

Build and run:
```bash
docker build -f docker/Dockerfile -t bus-frontend:latest .
docker run -p 3000:80 bus-frontend:latest
```

## ☸️ Kubernetes

Deploy:
```bash
kubectl apply -f k8s/
```

## 📊 File Count

- Configuration: 8 files
- Source code: 12 files
- DevOps: 7 files
- Documentation: 4 files
- **Total: 31 files**

## ⏱️ Time Estimates

- Setup: 5-10 minutes
- First run: 2-5 minutes (npm install)
- Build: 30 seconds
- Dev server startup: < 2 seconds

## ❓ Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- --port 3001` |
| npm install fails | `npm cache clean --force && npm install` |
| Type errors | `npm run type-check` to see details |
| Build fails | `npm run lint && npm run type-check` |
| API connection fails | Check `VITE_API_URL` in `.env` |

## 🎓 Learning Path

1. **Now**: Start dev server, explore UI
2. **Phase 2**: Build login/signup pages
3. **Phase 3**: Build bus search & booking
4. **Phase 4**: Add payments & admin
5. **Phase 5**: Testing & optimization

## ✨ Next Steps

1. ✅ Complete setup above
2. ✅ Run `npm run dev`
3. ✅ Test in browser
4. ✅ Review the `README.md` for architecture
5. ⏭️ Move to Phase 2: Authentication Implementation

## 📞 Support

- Read `PHASE1_SETUP_GUIDE.md` for detailed instructions
- Check `README.md` for backend requirements
- Review `PHASE1_COMPLETE.md` for what was built

---

**Ready?** Let's build this! 🚀

All files are in session folder ready to copy.
