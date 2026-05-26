# Integration Test Script: Event Communication & Security Validation
# Tests Kafka event flow + JWT authentication end-to-end

Write-Host "=== Online Bus Reservation System - Integration Test ===" -ForegroundColor Green
Write-Host "Testing: Kafka Events + JWT Security" -ForegroundColor Cyan
Write-Host ""

$BaseURL = "http://localhost:8080"
$PaymentURL = "http://localhost:8081"
$AuthEndpoint = "/auth/login"
$BookingsEndpoint = "/bookings"

# Test 1: JWT Login & Token Generation
Write-Host "[TEST 1] JWT Authentication - Generate Token" -ForegroundColor Yellow
$LoginPayload = @{
    username = "admin"
    password = "password"
} | ConvertTo-Json

try {
    $LoginResponse = Invoke-RestMethod -Uri "$BaseURL$AuthEndpoint" `
        -Method Post `
        -ContentType "application/json" `
        -Body $LoginPayload `
        -TimeoutSec 5
    
    $Token = $LoginResponse.token
    Write-Host "✓ TOKEN GENERATED: $($Token.Substring(0,20))..." -ForegroundColor Green
    $AuthHeader = @{ Authorization = "Bearer $Token" }
} catch {
    Write-Host "✗ JWT Login Failed: $($_.Exception.Message)" -ForegroundColor Red
    $AuthHeader = $null
}

Write-Host ""

# Test 2: Kafka Connectivity Check
Write-Host "[TEST 2] Kafka Broker Connectivity" -ForegroundColor Yellow
try {
    $KafkaCheck = docker exec obr_kafka bash -lc "kafka-topics --bootstrap-server localhost:9092 --list" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Kafka Broker: REACHABLE" -ForegroundColor Green
    } else {
        Write-Host "✗ Kafka Broker: UNREACHABLE" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Kafka Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: MySQL Database Connectivity
Write-Host "[TEST 3] MySQL Database Connectivity" -ForegroundColor Yellow
try {
    $DBCheck = docker exec -T obr_db mysql -uroot -psecret -e "SELECT 1" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ MySQL Database: CONNECTED" -ForegroundColor Green
    } else {
        Write-Host "✗ MySQL Database: CONNECTION FAILED" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Database Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Create Booking Event (Triggers Kafka)
Write-Host "[TEST 4] Create Booking and Trigger Kafka Event" -ForegroundColor Yellow
$BookingPayload = @{
    busId = "BUS001"
    noOfSeats = 2
    dateOfBooking = (Get-Date).ToString("yyyy-MM-dd")
} | ConvertTo-Json

if ($AuthHeader) {
    try {
        $BookingResponse = Invoke-RestMethod -Uri "$BaseURL$BookingsEndpoint" `
            -Method Post `
            -ContentType "application/json" `
            -Headers $AuthHeader `
            -Body $BookingPayload `
            -TimeoutSec 5
        Write-Host "✓ Booking Created: $BookingResponse" -ForegroundColor Green
    } catch {
        Write-Host "✗ Booking Creation Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⊘ SKIPPED: No valid token" -ForegroundColor Yellow
}

Write-Host ""

# Test 5: Verify Kafka Topics Exist
Write-Host "[TEST 5] Verify Kafka Topics for Events" -ForegroundColor Yellow
$RequiredTopics = @("booking_created_event", "payment_created_event", "inventory_failed_event")
$TopicList = docker exec obr_kafka bash -lc "kafka-topics --bootstrap-server localhost:9092 --list" 2>&1 | Out-String
Write-Host "Available Topics: $TopicList" -ForegroundColor Gray

foreach ($topic in $RequiredTopics) {
    if ($TopicList -match $topic) {
        Write-Host "✓ Topic EXISTS: $topic" -ForegroundColor Green
    } else {
        Write-Host "⊘ Topic MISSING: $topic" -ForegroundColor Yellow
    }
}

Write-Host ""

# Test 6: Service Port Availability
Write-Host "[TEST 6] Service Port Availability" -ForegroundColor Yellow
$Services = @{
    "Booking Service" = "8080"
    "Payment Service" = "8081"
    "Route Service" = "9800"
    "Inventory Service" = "9500"
}

foreach ($service in $Services.GetEnumerator()) {
    try {
        $Test = Test-NetConnection -ComputerName localhost -Port $service.Value -WarningAction SilentlyContinue -InformationLevel Quiet
        if ($Test) {
            Write-Host "✓ $($service.Name) (port $($service.Value)): READY" -ForegroundColor Green
        } else {
            Write-Host "✗ $($service.Name) (port $($service.Value)): NOT RUNNING" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ $($service.Name) (port $($service.Value)): ERROR" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Integration Test Complete ===" -ForegroundColor Green
