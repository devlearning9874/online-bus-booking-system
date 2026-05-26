import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import busService from '@/services/buses/busService'
import type { Bus, SeatInfo } from '@/types/bus'

export default function BusDetails(): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bus, setBus] = useState<Bus | null>(null)
  const [seats, setSeats] = useState<SeatInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadBus = async (): Promise<void> => {
      if (!id) {
        return
      }

      try {
        const currentBus = await busService.getBusById(id)
        const availableSeats = await busService.getAvailableSeats(id)

        if (mounted) {
          setBus(currentBus)
          setSeats(availableSeats)
        }
      } catch {
        if (mounted) {
          setError('This bus is not available right now. Please try another route.')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    void loadBus()

    return () => {
      mounted = false
    }
  }, [id])

  return (
    <Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          {bus && (
            <>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Bus details
                      </Typography>
                      <Typography variant="h3" fontWeight={700}>
                        {bus.name}
                      </Typography>
                      <Typography color="text.secondary">Registration: {bus.registrationNumber}</Typography>
                    </Box>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip label={bus.route} color="primary" />
                      <Chip label={`₹${bus.pricePerSeat} per seat`} />
                      <Chip label={`${bus.availableSeats} seats available`} color="success" />
                      <Chip label={`${bus.rating.toFixed(1)} ★ (${bus.totalRatings} ratings)`} />
                    </Stack>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight={700}>Departure</Typography>
                        <Typography>{bus.departureTime}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight={700}>Arrival</Typography>
                        <Typography>{bus.arrivalTime}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight={700}>Capacity</Typography>
                        <Typography>{bus.capacity} seats</Typography>
                      </Grid>
                    </Grid>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {bus.amenities.map((amenity) => (
                        <Chip key={amenity} label={amenity} variant="outlined" />
                      ))}
                    </Stack>

                    <Button variant="contained" size="large" onClick={() => navigate(`/booking?busId=${bus.id}`)}>
                      Book this bus
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                    Seat availability
                  </Typography>

                  <Grid container spacing={1}>
                    {seats.map((seat) => (
                      <Grid item xs={3} sm={2} md={1.5} key={seat.seatNumber}>
                        <Card variant="outlined" sx={{ textAlign: 'center', py: 1 }}>
                          <Typography>Seat {seat.seatNumber}</Typography>
                          <Typography variant="caption" color="success.main">
                            {seat.status}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </>
          )}
        </Stack>
      )}
    </Box>
  )
}
