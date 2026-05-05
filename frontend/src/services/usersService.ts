import api from './api'
import type { User } from '../types'

export const usersService = {
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/api/users')
    return response.data
  },

  async getById(id: number): Promise<User> {
    const response = await api.get<User>(`/api/users/${id}`)
    return response.data
  },

  async update(id: number, data: Partial<Pick<User, 'username' | 'email' | 'role'>>): Promise<User> {
    const response = await api.put<User>(`/api/users/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/users/${id}`)
  },
}
