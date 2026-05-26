/**
 * Payment related types
 */

export interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  currency: string
  paymentMethod: 'card' | 'upi' | 'wallet' | 'netbanking'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId: string
  createdAt: string
  updatedAt: string
}

export interface PaymentRequest {
  bookingId: string
  amount: number
  paymentMethod: 'card' | 'upi' | 'wallet' | 'netbanking'
}

export interface PaymentResponse {
  success: boolean
  payment: Payment
  message: string
}

export interface RefundRequest {
  paymentId: string
  reason: string
}
