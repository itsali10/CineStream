export interface Movie {
  id: number
  title: string
  description?: string
  genre: string
  releaseYear: number
  durationMinutes: number
  rating: number
  thumbnailUrl?: string
  directorId: number
  director?: Director
}

export interface Director {
  id: number
  fullName: string
  nationality?: string
  birthYear: number
  bio?: string
  movies?: Movie[]
}

export interface User {
  id: number
  username: string
  email: string
  role: string
  createdAt: string
}

export interface WatchList {
  id: number
  addedAt: string
  isWatched: boolean
  userId: number
  movieId: number
  movie?: Movie
  user?: User
}

export interface AuthResponse {
  token: string
  userId?: number
  username?: string
  email?: string
  role?: string
}

export interface LoginRequest {
  email: string
  passwordHash: string
}

export interface RegisterRequest {
  username: string
  email: string
  passwordHash: string
  role?: string
}
