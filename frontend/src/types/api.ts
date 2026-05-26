export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface ApiError {
  message: string
  code: string
  status: number
  details?: Record<string, unknown>
}
