import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import busService from '@/services/buses/busService'
import type { Bus } from '@/types/bus'

export default function Dashboard(): JSX.Element {
  const { user } = useSelector((state: RootState) => state.auth)
  const [buses, setBuses] = useState<Bus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    busService
      .getAllBuses()
      .then((result) => {
        if (!mounted) {
          return
        }

        setBuses(result)
      })
      .catch(() => {
        if (!mounted) {
          return
        }

        setError('Live bus data is currently unavailable. Showing a demo feed instead.')
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  const stats = useMemo(() => {
    const totalSeats = buses.reduce((sum, bus) => sum + bus.availableSeats, 0)
    return [
      { label: 'Featured routes', value: buses.length },
      { label: 'Seats ready', value: totalSeats },
      { label: 'Top rated trips', value: buses.filter((bus) => bus.rating >= 4.7).length },
    ]
  }, [buses])

  return (
    <Box>
      <Stack spacing={3}>
        <Card sx={{ background: 'linear-gradient(135deg, #0d47a1 0%, #42a5f5 100%)', color: '#fff' }}>
          <CardContent>
            <Typography variant="overline">Your travel dashboard</Typography>
            <Typography variant="h3" fontWeight={700} sx={{ mt: 1 }}>
              Welcome back, {user?.firstName ?? 'Traveler'}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, maxWidth: 720 }}>
              Discover top routes, check seat availability, and manage your bookings from one streamlined dashboard.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
              <Button variant="contained" color="secondary" component={Link} to="/search">
                Search buses
              </Button>
              <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }} component={Link} to="/profile">
                Manage profile
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {error && <Alert severity="info">{error}</Alert>}

        <Grid container spacing={2}>
          {stats.map((item) => (
            <Grid item xs={12} sm={4} key={item.label}>
              <Card>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              Popular buses
            </Typography>

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                {buses.slice(0, 3).map((bus) => (
                  <Grid item xs={12} md={4} key={bus.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack spacing={1}>
                          <Typography variant="h6">{bus.name}</Typography>
                          <Typography color="text.secondary">{bus.route}</Typography>
                          <Typography>
                            {bus.departureTime} - {bus.arrivalTime}
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label={`₹${bus.pricePerSeat}`} color="primary" />
                            <Chip label={`${bus.availableSeats} seats`} />
                            <Chip label={`${bus.rating.toFixed(1)} ★`} />
                          </Stack>
                          <Button component={Link} to={`/bus/${bus.id}`} variant="outlined">
                            View details
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
