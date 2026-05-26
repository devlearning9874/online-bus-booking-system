import { Box, Typography } from '@mui/material'

export default function Footer(): JSX.Element {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: '#fafafa' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Bus Reservation System
      </Typography>
    </Box>
  )
}
