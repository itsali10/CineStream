import api from './api'
import type { Director } from '../types'

export const directorsService = {
  async getAll(): Promise<Director[]> {
    const response = await api.get<Director[]>('/api/directors')
    return response.data
  },

  async getById(id: number): Promise<Director> {
    const response = await api.get<Director>(`/api/directors/${id}`)
    return response.data
  },

  async create(director: Omit<Director, 'id' | 'movies'>): Promise<Director> {
    const response = await api.post<Director>('/api/directors', director)
    return response.data
  },

  async update(id: number, director: Partial<Omit<Director, 'id' | 'movies'>>): Promise<Director> {
    const response = await api.put<Director>(`/api/directors/${id}`, director)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/directors/${id}`)
  },
}
