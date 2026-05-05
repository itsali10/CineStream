import api from './api'
import type { WatchList } from '../types'

export const watchlistService = {
  async getAll(): Promise<WatchList[]> {
    const response = await api.get<WatchList[]>('/api/watchlists')
    return response.data
  },

  async getByUserId(userId: number): Promise<WatchList[]> {
    const response = await api.get<WatchList[]>(`/api/watchlists/user/${userId}`)
    return response.data
  },

  async add(userId: number, movieId: number): Promise<WatchList> {
    const response = await api.post<WatchList>('/api/watchlists', {
      userId,
      movieId,
      isWatched: false,
      addedAt: new Date().toISOString(),
    })
    return response.data
  },

  async update(id: number, data: { isWatched: boolean }): Promise<WatchList> {
    const response = await api.put<WatchList>(`/api/watchlists/${id}`, data)
    return response.data
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/api/watchlists/${id}`)
  },
}
