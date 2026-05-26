import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import bookingService from '@/services/bookings/bookingService'
import busService from '@/services/buses/busService'
import type { Bus } from '@/types/bus'
import type { BookingRequest, Passenger } from '@/types/booking'

export default function Booking(): JSX.Element {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const busId = searchParams.get('busId') ?? (location.state as { busId?: string } | undefined)?.busId
  const [bus, setBus] = useState<Bus | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [seats, setSeats] = useState(1)
  const [passenger, setPassenger] = useState<Passenger>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: 18,
    gender: 'M',
    seatNumber: 1,
  })

  useEffect(() => {
    if (!busId) {
      setError('Choose a bus before continuing with booking.')
      return
    }

    busService.getBusById(busId).then(setBus).catch(() => {
      setError('Unable to load bus details right now.')
    })
  }, [busId])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (!busId || !bus) {
      setError('Select a valid bus before placing the booking.')
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const request: BookingRequest = {
        busId,
        passengers: Array.from({ length: seats }, (_, index) => ({
          ...passenger,
          seatNumber: index + 1,
        })),
        totalPrice: bus.pricePerSeat * seats,
      }

      const result = await bookingService.createBooking(request)
      setSuccess(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking could not be completed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto' }}>
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h4" fontWeight={700}>
              Complete your booking
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Add your passenger details and confirm the seats you want.
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            {bus && (
              <Card variant="outlined" sx={{ mt: 2, mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{bus.name}</Typography>
                  <Typography color="text.secondary">{bus.route}</Typography>
                  <Typography>
                    {bus.departureTime} • ₹{bus.pricePerSeat} per seat
                  </Typography>
                </CardContent>
              </Card>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First name"
                    value={passenger.firstName}
                    onChange={(event) => setPassenger((current) => ({ ...current, firstName: event.target.value }))}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last name"
                    value={passenger.lastName}
                    onChange={(event) => setPassenger((current) => ({ ...current, lastName: event.target.value }))}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    type="email"
                    value={passenger.email}
                    onChange={(event) => setPassenger((current) => ({ ...current, email: event.target.value }))}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    value={passenger.phone}
                    onChange={(event) => setPassenger((current) => ({ ...current, phone: event.target.value }))}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Age"
                    type="number"
                    value={passenger.age}
                    onChange={(event) => setPassenger((current) => ({ ...current, age: Number(event.target.value) || 18 }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Gender"
                    select
                    value={passenger.gender}
                    onChange={(event) => setPassenger((current) => ({ ...current, gender: event.target.value as Passenger['gender'] }))}
                    fullWidth
                  >
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Seats"
                    type="number"
                    value={seats}
                    onChange={(event) => setSeats(Number(event.target.value) || 1)}
                    inputProps={{ min: 1, max: bus?.availableSeats ?? 1 }}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                <Button type="submit" variant="contained" size="large" disabled={isSubmitting || !bus}>
                  {isSubmitting ? 'Confirming booking...' : 'Confirm booking'}
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/search')}>
                  Back to search
                </Button>
              </Stack>

              {bus && (
                <Typography sx={{ mt: 2 }}>
                  Total amount: ₹{bus.pricePerSeat * seats}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
