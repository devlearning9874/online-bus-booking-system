# Bus Reservation System - React Frontend

A production-ready React + TypeScript frontend for the Online Bus Reservation System microservices backend.

## Features

✨ **Modern Stack**
- React 18 with TypeScript
- Vite for fast builds
- Redux Toolkit for state management
- Material-UI for professional components
- React Router v6 for routing

🔐 **Authentication & Security**
- JWT-based authentication with refresh tokens
- Protected routes with role-based access control
- Secure token storage and management
- Automatic token refresh on expiration

🚀 **Core Features**
- Bus search and filtering
- Real-time seat availability
- Multi-step booking flow
- Payment integration ready
- User profile management
- Admin dashboard
- Booking history and management

📱 **Production Ready**
- Docker containerization
- Kubernetes deployment manifests
- Comprehensive test suite (unit, integration, E2E)
- Error tracking and logging
- Performance optimization
- CI/CD pipeline ready
- Mobile responsive design

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── auth/           # Authentication components
│   ├── buses/          # Bus-related components
│   ├── bookings/       # Booking components
│   ├── common/         # Common components
│   └── layout/         # Layout components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
│   ├── api/            # Axios client setup
│   ├── auth.ts         # Authentication service
│   └── bus.ts          # Bus service
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   └── index.ts        # Store configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## Prerequisites

- Node.js >= 16
- npm >= 8 or yarn >= 1.22

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/bus-reservation-frontend.git
cd bus-reservation-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update the environment variables:

```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Bus Reservation System
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will open at `http://localhost:3000`

## Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:ssl         # Start with HTTPS

# Building
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier
npm run type-check      # Check TypeScript types

# Testing
npm run test            # Run unit tests
npm run test:ui         # Run tests with UI
npm run test:coverage   # Generate coverage report
npm run e2e             # Run E2E tests
npm run e2e:ui          # Run E2E tests with UI

# Documentation
npm run storybook       # Start Storybook
npm run build-storybook # Build Storybook
```

## Backend Services Integration

The frontend consumes the following microservices:

| Service | Port | Base URL |
|---------|------|----------|
| User Service | 9900 | http://localhost:9900 |
| Bus Service | 6000 | http://localhost:6000 |
| Booking Service | 7200 | http://localhost:7200 |
| Payment Service | 8500 | http://localhost:8500 |
| API Gateway | 8080 | http://localhost:8080 (recommended) |

**Note**: For production, all services should be accessible through a single API Gateway to avoid CORS issues.

### Recommended Setup: API Gateway

Create an API Gateway service that aggregates all microservices:

```
http://localhost:8080/api/
  ├── /auth/*          → User Service (9900)
  ├── /users/*         → User Service (9900)
  ├── /buses/*         → Bus Service (6000)
  ├── /bookings/*      → Booking Service (7200)
  ├── /payments/*      → Payment Service (8500)
  └── /routes/*        → Route Service
```

## Authentication Flow

1. **Login/Signup**: User credentials sent to `/auth/login` or `/auth/signup`
2. **Token Storage**: JWT token and refresh token stored in localStorage
3. **Token Injection**: Axios interceptor adds token to all requests
4. **Token Refresh**: When 401 received, refresh token used to get new access token
5. **Logout**: Tokens cleared from storage, user redirected to login

## Backend API Requirements

### Authentication Endpoints

```typescript
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": { ... },
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}

POST /auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}

POST /auth/refresh-token
{
  "refreshToken": "refresh_token"
}

POST /auth/logout
```

### User Service Endpoints

```typescript
GET /users/me             # Get current user profile
PUT /users/me             # Update user profile
GET /users/:id            # Get user by ID
```

### Bus Service Endpoints

```typescript
GET /buses                           # List all buses
GET /buses/search?route=&date=      # Search buses
GET /buses/:id                       # Get bus details
GET /buses/:id/available-seats      # Get available seats
```

### Booking Service Endpoints

```typescript
POST /bookings                  # Create booking
GET /bookings                   # List user bookings
GET /bookings/:id              # Get booking details
PUT /bookings/:id              # Update booking
DELETE /bookings/:id           # Cancel booking
```

### Payment Service Endpoints

```typescript
POST /payments                  # Create payment
GET /payments/:id              # Get payment details
GET /payments/history          # Get payment history
```

## CORS Configuration

Backend services must enable CORS for the frontend domain:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000", "https://yourdomain.com")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true)
        .maxAge(3600);
  }
}
```

## Docker Deployment

### Build Docker Image

```bash
docker build -f docker/Dockerfile -t bus-reservation-frontend:latest .
```

### Run with Docker

```bash
docker run -p 3000:80 bus-reservation-frontend:latest
```

### Docker Compose (with Backend)

See `docker-compose.yml` for complete stack setup.

## Kubernetes Deployment

### Apply Manifests

```bash
kubectl apply -f k8s/
```

### Check Deployment

```bash
kubectl get pods
kubectl get services
kubectl logs -f deployment/bus-reservation-frontend
```

## Testing

### Unit Tests

```bash
npm run test
npm run test:coverage
```

### E2E Tests

```bash
npm run e2e
```

### Test Coverage

Target: >80% coverage for critical paths

## Performance Optimization

- Code splitting with React.lazy
- Image optimization
- Bundle size monitoring
- Service Worker support
- Lazy loading of routes and components

## Security Considerations

✅ CORS properly configured  
✅ XSS protection enabled  
✅ JWT tokens in httpOnly cookies (when backend supports)  
✅ Input validation and sanitization  
✅ CSRF protection (when needed)  
✅ Rate limiting on frontend  
✅ Security headers configured  

## Monitoring & Analytics

- Error tracking with Sentry (optional)
- Google Analytics integration
- Performance monitoring
- User behavior tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

### Code Standards

- ESLint for linting
- Prettier for formatting
- TypeScript for type safety
- Test coverage >80%

## Deployment

### Development

```bash
npm run dev
```

### Staging

```bash
npm run build
npm run preview
```

### Production

```bash
npm run build
# Deploy dist/ folder to CDN or server
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | http://localhost:8080 |
| VITE_APP_NAME | Application name | Bus Reservation System |
| VITE_APP_VERSION | Application version | 1.0.0 |
| VITE_ENVIRONMENT | Environment | development, staging, production |

## Troubleshooting

### CORS Errors

Ensure backend services have CORS enabled and API Gateway is configured properly.

### Token Refresh Issues

Check that:
- Refresh token endpoint is working
- Refresh token is stored correctly
- Backend returns new token in correct format

### Build Errors

```bash
npm run type-check  # Check TypeScript errors
npm run lint        # Check linting errors
rm -rf node_modules package-lock.json
npm install         # Reinstall dependencies
```

## Performance Metrics

- Lighthouse Score: >90
- Initial Load Time: <3s
- Bundle Size: <150KB (gzipped)
- Time to Interactive: <5s

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: support@example.com

## Roadmap

- [ ] Real-time notifications
- [ ] Advanced payment integration
- [ ] User reviews and ratings
- [ ] Mobile app (React Native)
- [ ] GraphQL API support
- [ ] Multi-language support
- [ ] Accessibility improvements
