import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function AdminDashboard(): JSX.Element {
  return (
    <Box>
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h4" fontWeight={700}>Admin dashboard</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Manage bus inventory, review bookings, and coordinate operations from one place.
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          {[
            { title: 'Bus inventory', body: 'Monitor routes, fares, and seat availability.' },
            { title: 'Bookings', body: 'Review active reservations and completion status.' },
            { title: 'Customer insights', body: 'Track popular routes and support requests.' },
          ].map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={700}>{item.title}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>{item.body}</Typography>
                  <Button component={Link} to="/search" variant="outlined" sx={{ mt: 2 }}>
                    Open view
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  )
}
