import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import authService from '@/services/auth/authService'
import { loginFailure, loginStart, loginSuccess } from '@/store/slices/authSlice'

export default function Login(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    dispatch(loginStart())

    try {
      const response = await authService.login({ email, password })
      dispatch(loginSuccess(response))
      navigate('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to sign in right now.'
      setError(message)
      dispatch(loginFailure(message))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', py: 4 }}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Welcome back
              </Typography>
              <Typography color="text.secondary">
                Sign in to manage your booking journey.
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  fullWidth
                />
                <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
              </Stack>
            </Box>

            <Typography variant="body2" color="text.secondary">
              New here? <Link to="/signup">Create your account</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
