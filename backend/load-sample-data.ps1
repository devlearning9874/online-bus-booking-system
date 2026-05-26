# Load sample SQL files into the MySQL container using docker compose exec -T
# Run from the backend folder
$files = @(
  'db-schema.sql',
  'sample-bus.sql',
  'sample-route.sql',
  'sample-user.sql',
  'sample-inventory.sql',
  'sample-booking.sql',
  'sample-passanger.sql',
  'sample-payment.sql'
)

foreach ($f in $files) {
  if (Test-Path $f) {
    Write-Host "Loading $f..."
    # Pipe file contents into the container to avoid PowerShell TTY stdin issues
    Get-Content $f -Raw | docker compose exec -T db mysql -uroot -psecret onlinebusbooking
  }
  else {
    Write-Host "Skipping $f (not found)"
  }
}
Write-Host "Done"
