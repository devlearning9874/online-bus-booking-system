import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import authService from '@/services/auth/authService'
import type { RootState } from '@/store'
import { logout, setUser } from '@/store/slices/authSlice'

export default function UserProfile(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const [profile, setProfile] = useState(user)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user) {
      authService.getProfile().then((currentUser) => setProfile(currentUser))
      return
    }

    setProfile(user)
  }, [user])

  const handleSave = async (): Promise<void> => {
    if (!profile) {
      return
    }

    setIsSaving(true)
    setMessage('')

    try {
      const updated = await authService.updateProfile(profile)
      dispatch(setUser(updated))
      setMessage('Profile updated successfully.')
    } catch {
      setMessage('Unable to update your profile right now.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async (): Promise<void> => {
    await authService.logout()
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto' }}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" fontWeight={700}>Your profile</Typography>
              <Typography color="text.secondary">Keep your contact details up to date.</Typography>
            </Box>

            {message && <Alert severity={message.includes('successfully') ? 'success' : 'info'}>{message}</Alert>}

            {profile && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="First name" value={profile.firstName} onChange={(event) => setProfile((current) => current ? { ...current, firstName: event.target.value } : current)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Last name" value={profile.lastName} onChange={(event) => setProfile((current) => current ? { ...current, lastName: event.target.value } : current)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" type="email" value={profile.email} onChange={(event) => setProfile((current) => current ? { ...current, email: event.target.value } : current)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" value={profile.phone} onChange={(event) => setProfile((current) => current ? { ...current, phone: event.target.value } : current)} fullWidth />
                </Grid>
              </Grid>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" onClick={() => void handleSave()} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save changes'}
              </Button>
              <Button variant="outlined" onClick={() => void handleLogout()}>
                Logout
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
