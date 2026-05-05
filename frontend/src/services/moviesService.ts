import api from './api'
import type { Movie } from '../types'

export const moviesService = {
  async getAll(): Promise<Movie[]> {
    const response = await api.get<Movie[]>('/api/movies')
    return response.data
  },

  async getById(id: number): Promise<Movie> {
    const response = await api.get<Movie>(`/api/movies/${id}`)
    return response.data
  },

  async create(movie: Omit<Movie, 'id' | 'director' | 'watchList'>): Promise<Movie> {
    const response = await api.post<Movie>('/api/movies', movie)
    return response.data
  },

  async update(id: number, movie: Partial<Omit<Movie, 'id' | 'director' | 'watchList'>>): Promise<Movie> {
    const response = await api.put<Movie>(`/api/movies/${id}`, movie)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/movies/${id}`)
  },
}
