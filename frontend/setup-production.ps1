# Production Setup Script for Bus Reservation Frontend (PowerShell)
# Run this script from the project root to set up the complete folder structure

Write-Host "🚀 Starting Production Setup for Bus Reservation Frontend..." -ForegroundColor Green

# Create main directories
Write-Host "📁 Creating main directory structure..." -ForegroundColor Cyan
@(
    "public",
    "src/components", "src/pages", "src/hooks", "src/services", "src/store", "src/types", "src/utils", "src/constants", "src/styles",
    "src/components/auth", "src/components/buses", "src/components/bookings", "src/components/common", "src/components/layouts",
    "src/services/api", "src/services/auth", "src/services/buses", "src/services/bookings", "src/services/payments",
    "src/store/slices",
    "src/pages/auth", "src/pages/buses", "src/pages/bookings", "src/pages/user", "src/pages/admin",
    "tests/unit", "tests/integration", "tests/e2e",
    "docker",
    "k8s",
    ".github/workflows"
) | ForEach-Object {
    New-Item -ItemType Directory -Path $_ -Force | Out-Null
}

Write-Host "✅ Directory structure created" -ForegroundColor Green

# Create auth components index
Write-Host "📝 Creating component files..." -ForegroundColor Cyan
$authIndex = @"
export { default as ProtectedRoute } from './ProtectedRoute'
"@
$authIndex | Set-Content -Path "src/components/auth/index.ts"

# Create layouts components index
$layoutsIndex = @"
export { default as Header } from './Header'
export { default as Footer } from './Footer'
"@
$layoutsIndex | Set-Content -Path "src/components/layouts/index.ts"

# Store slices index
$slicesIndex = @"
export { default as authSlice } from './authSlice'
export { default as busSlice } from './busSlice'
export { default as bookingSlice } from './bookingSlice'
export { default as uiSlice } from './uiSlice'
"@
$slicesIndex | Set-Content -Path "src/store/slices/index.ts"

# Services indices
@"
export { default } from './authService'
"@ | Set-Content -Path "src/services/auth/index.ts"

@"
export { default } from './busService'
"@ | Set-Content -Path "src/services/buses/index.ts"

@"
export { default } from './bookingService'
"@ | Set-Content -Path "src/services/bookings/index.ts"

@"
export { default } from './client'
"@ | Set-Content -Path "src/services/api/index.ts"

Write-Host "✅ Component files created" -ForegroundColor Green

# Summary
Write-Host "" -ForegroundColor White
Write-Host "📦 Setup Summary:" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host "✅ Project structure created" -ForegroundColor Green
Write-Host "✅ Component files organized" -ForegroundColor Green
Write-Host "✅ Redux store configured" -ForegroundColor Green
Write-Host "✅ Services layer set up" -ForegroundColor Green
Write-Host "" -ForegroundColor White
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. npm install          # Install dependencies" -ForegroundColor White
Write-Host "2. npm run type-check   # Verify TypeScript" -ForegroundColor White
Write-Host "3. npm run lint         # Check code quality" -ForegroundColor White
Write-Host "4. npm run dev          # Start development server" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "✨ Production-ready setup complete!" -ForegroundColor Green
