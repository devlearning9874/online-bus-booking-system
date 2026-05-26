import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import busService from '@/services/buses/busService'
import type { Bus } from '@/types/bus'

export default function BusSearch(): JSX.Element {
  const [query, setQuery] = useState('')
  const [date, setDate] = useState('')
  const [maxPrice, setMaxPrice] = useState(1500)
  const [buses, setBuses] = useState<Bus[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  const loadBuses = async (): Promise<void> => {
    setIsSearching(true)
    setError('')

    try {
      const result = await busService.searchBuses({
        route: query,
        date,
        minPrice: 0,
        maxPrice,
      })

      setBuses(result.buses)
    } catch {
      setError('Unable to load buses from the backend right now. Showing the local demo schedule.')
      const result = await busService.searchBuses({ route: query, date, minPrice: 0, maxPrice })
      setBuses(result.buses)
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    void loadBuses()
  }, [])

  const filteredBuses = useMemo(() => {
    return buses.filter((bus) => {
      const matchesQuery = !query || bus.name.toLowerCase().includes(query.toLowerCase()) || bus.route.toLowerCase().includes(query.toLowerCase())
      const matchesPrice = bus.pricePerSeat <= maxPrice
      return matchesQuery && matchesPrice
    })
  }, [buses, maxPrice, query])

  return (
    <Box>
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h4" fontWeight={700}>
              Find your perfect bus
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Search by route, travel date, and budget.
            </Typography>

            {error && <Alert severity="info">{error}</Alert>}

            <Grid container spacing={2} alignItems="end">
              <Grid item xs={12} md={4}>
                <TextField
                  label="Route or bus name"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Travel date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Max fare"
                  type="number"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value) || 0)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button variant="contained" fullWidth onClick={() => void loadBuses()} disabled={isSearching}>
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {isSearching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredBuses.map((bus) => (
              <Grid item xs={12} md={6} key={bus.id}>
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="h5">{bus.name}</Typography>
                        <Typography color="text.secondary">{bus.route}</Typography>
                      </Box>

                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip label={`${bus.availableSeats} seats available`} color="success" />
                        <Chip label={`₹${bus.pricePerSeat}`} color="primary" />
                        <Chip label={`${bus.rating.toFixed(1)} ★`} />
                      </Stack>

                      <Typography>
                        Departure {bus.departureTime} • Arrival {bus.arrivalTime}
                      </Typography>

                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {bus.amenities.map((amenity) => (
                          <Chip key={amenity} label={amenity} variant="outlined" />
                        ))}
                      </Stack>

                      <Button component={Link} to={`/bus/${bus.id}`} variant="contained">
                        View details
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Box>
  )
}
