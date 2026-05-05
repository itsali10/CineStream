import api from './api'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types'

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/login', data)
    return response.data
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/register', data)
    return response.data
  },

  async logout(): Promise<void> {
    try {
      await api.post('/api/auth/logout')
    } catch {
      // ignore — clear local state regardless
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },
}
