import axios, { AxiosInstance } from 'axios'

const getBaseUrl = (envKey: string, fallback: string): string => {
  const configuredUrl = import.meta.env[envKey]
  if (typeof configuredUrl === 'string' && configuredUrl.trim()) {
    return configuredUrl
  }

  return fallback
}

const attachInterceptors = (client: AxiosInstance): AxiosInstance => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  )

  return client
}

const defaultBaseUrl = getBaseUrl('VITE_API_URL', 'http://localhost:7200')
const bookingBaseUrl = getBaseUrl('VITE_BOOKING_API_URL', defaultBaseUrl)
const busBaseUrl = getBaseUrl('VITE_BUS_API_URL', 'http://localhost:6000')
const usersBaseUrl = getBaseUrl('VITE_USERS_API_URL', 'http://localhost:9900')

const createApiClient = (baseURL: string): AxiosInstance =>
  attachInterceptors(
    axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    }),
  )

export const bookingApiClient = createApiClient(bookingBaseUrl)
export const busApiClient = createApiClient(busBaseUrl)
export const usersApiClient = createApiClient(usersBaseUrl)

export default bookingApiClient
