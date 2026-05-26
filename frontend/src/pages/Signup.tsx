import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import authService from '@/services/auth/authService'
import { loginFailure, loginStart, loginSuccess } from '@/store/slices/authSlice'

export default function Signup(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    dispatch(loginStart())

    try {
      const response = await authService.signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })

      dispatch(loginSuccess(response))
      navigate('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create your account.'
      setError(message)
      dispatch(loginFailure(message))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto', py: 4 }}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Create your account
              </Typography>
              <Typography color="text.secondary">
                Set up your profile and start booking buses.
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="First name" value={formData.firstName} onChange={handleChange('firstName')} required fullWidth />
                  <TextField label="Last name" value={formData.lastName} onChange={handleChange('lastName')} required fullWidth />
                </Stack>
                <TextField label="Email" type="email" value={formData.email} onChange={handleChange('email')} required fullWidth />
                <TextField label="Phone" value={formData.phone} onChange={handleChange('phone')} fullWidth />
                <TextField label="Password" type="password" value={formData.password} onChange={handleChange('password')} required fullWidth />
                <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>
              </Stack>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Already have an account? <Link to="/login">Sign in</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
