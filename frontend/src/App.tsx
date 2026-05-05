import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import CreateMoviePage from './pages/CreateMoviePage'
import EditMoviePage from './pages/EditMoviePage'
import DirectorsPage from './pages/DirectorsPage'
import WatchlistPage from './pages/WatchlistPage'
import ProfilePage from './pages/ProfilePage'
import UserManagementPage from './pages/UserManagementPage'

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/movies" element={<PrivateRoute><MoviesPage /></PrivateRoute>} />
      <Route path="/movies/new" element={<PrivateRoute><CreateMoviePage /></PrivateRoute>} />
      <Route path="/movies/:id/edit" element={<PrivateRoute><EditMoviePage /></PrivateRoute>} />
      <Route path="/movies/:id" element={<PrivateRoute><MovieDetailsPage /></PrivateRoute>} />
      <Route path="/directors" element={<PrivateRoute><DirectorsPage /></PrivateRoute>} />
      <Route path="/watchlist" element={<PrivateRoute><WatchlistPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute><UserManagementPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
