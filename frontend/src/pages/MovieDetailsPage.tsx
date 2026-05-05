import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { moviesService } from '../services/moviesService'
import { watchlistService } from '../services/watchlistService'
import Sidebar from '../components/Sidebar'
import type { Movie } from '../types'

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ''}` : `${m}m`
}

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAdmin, user } = useAuth()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [watchlistMsg, setWatchlistMsg] = useState('')

  useEffect(() => {
    if (!id) return
    moviesService
      .getById(parseInt(id))
      .then(setMovie)
      .catch(() => setError('Movie not found.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!movie || !confirm(`Delete "${movie.title}"?`)) return
    try {
      await moviesService.delete(movie.id)
      navigate('/movies')
    } catch {
      alert('Failed to delete movie.')
    }
  }

  const handleAddToWatchlist = async () => {
    if (!movie || !user) return
    try {
      await watchlistService.add(user.id, movie.id)
      setWatchlistMsg('Added to watchlist!')
      setTimeout(() => setWatchlistMsg(''), 3000)
    } catch {
      setWatchlistMsg('Already in watchlist or error occurred.')
      setTimeout(() => setWatchlistMsg(''), 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#131313' }}>
        <Sidebar activePath="/movies" />
        <div className="flex-1 flex items-center justify-center" style={{ marginLeft: 260 }}>
          <div style={{ width: 48, height: 48, border: '3px solid rgba(229,9,20,0.3)', borderTopColor: '#e50914', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#131313' }}>
        <Sidebar activePath="/movies" />
        <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ marginLeft: 260 }}>
          <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 20, color: '#e50914' }}>{error || 'Movie not found.'}</p>
          <button onClick={() => navigate('/movies')} style={{ padding: '12px 32px', backgroundColor: '#e50914', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>
            Back to Movies
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#131313' }}>
      <Sidebar activePath="/movies" />

      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Top navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{ left: 260, right: 0, top: 0, zIndex: 40, backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(6px)' }}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/movies')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Movies
            </button>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <>
                <button
                  onClick={() => navigate(`/movies/${movie.id}/edit`)}
                  style={{ padding: '10px 24px', backgroundColor: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#e5e2e1', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><path d="M10.5 2.5L12.5 4.5L5 12H3V10L10.5 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  style={{ padding: '10px 24px', backgroundColor: 'rgba(229,9,20,0.15)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 6, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#e50914', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <svg width="11" height="13" viewBox="0 0 13 15" fill="none"><path d="M1 3.5H12M4.5 3.5V2H8.5V3.5M5.5 6.5V11.5M7.5 6.5V11.5M2 3.5L2.5 13H10.5L11 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Delete
                </button>
              </>
            )}
          </div>
        </header>

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ minHeight: 500, marginTop: 67 }}>
          {movie.thumbnailUrl ? (
            <img src={movie.thumbnailUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ transform: 'scale(1.1)', transformOrigin: 'center' }} />
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, hsl(${(movie.id * 47) % 360}, 40%, 15%) 0%, #131313 100%)` }} />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #131313 20%, rgba(19,19,19,0.5) 60%, rgba(19,19,19,0.2))' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #131313 30%, rgba(19,19,19,0))' }} />

          <div className="absolute bottom-10 left-10 flex gap-10">
            {/* Metadata */}
            <div className="flex flex-col gap-4 justify-end max-w-2xl">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <svg width="14" height="13" viewBox="0 0 12 11" fill="#fbbf24"><path d="M6 0.5L7.5 4H11.5L8.5 6.5L9.5 10.5L6 8L2.5 10.5L3.5 6.5L0.5 4H4.5L6 0.5Z"/></svg>
                  <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}>{movie.rating.toFixed(1)}</span>
                </div>
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>{movie.releaseYear}</span>
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>{formatDuration(movie.durationMinutes)}</span>
                <span style={{ padding: '4px 12px', border: '1px solid rgba(255,180,170,0.3)', borderRadius: 12, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#ffb4aa' }}>{movie.genre}</span>
              </div>

              <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 900, fontSize: 48, color: '#e5e2e1', letterSpacing: '-2px', textTransform: 'uppercase', lineHeight: 1.1 }}>
                {movie.title}
              </h1>

              {movie.description && (
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 17, color: '#c8c6c5', lineHeight: 1.6, maxWidth: 600 }}>
                  {movie.description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <button
                  onClick={handleAddToWatchlist}
                  className="flex items-center gap-2 rounded"
                  style={{ padding: '14px 40px', backgroundColor: '#e50914', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  Add to Watchlist
                </button>
                {watchlistMsg && (
                  <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: watchlistMsg.includes('Added') ? '#4ade80' : '#e50914' }}>
                    {watchlistMsg}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="px-10 py-12" style={{ backgroundColor: '#131313' }}>
          <div className="grid gap-10" style={{ gridTemplateColumns: '1fr 1fr 1fr 320px' }}>
            {/* Left */}
            <div className="col-span-3 flex flex-col gap-8">
              {/* Synopsis */}
              {movie.description && (
                <div>
                  <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 22, color: '#e5e2e1', paddingBottom: 12, borderBottom: '1px solid rgba(94,63,59,0.2)', marginBottom: 12 }}>
                    Synopsis
                  </h2>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#b7b5b4', lineHeight: 1.7 }}>
                    {movie.description}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Director', value: movie.director?.fullName ?? `Director #${movie.directorId}` },
                  { label: 'Release Year', value: movie.releaseYear.toString() },
                  { label: 'Duration', value: formatDuration(movie.durationMinutes) },
                ].map((s) => (
                  <div key={s.label} style={{ padding: 20, backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                    <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13, color: '#c8c6c5', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 6 }}>{s.label}</p>
                    <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar */}
            <div style={{ padding: 32, backgroundColor: 'rgba(26,26,26,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
              <h3 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 20, color: '#e5e2e1', marginBottom: 20 }}>Details</h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Genre', value: movie.genre },
                  { label: 'Rating', value: `${movie.rating.toFixed(1)} / 10` },
                  { label: 'Year', value: movie.releaseYear.toString() },
                  { label: 'Duration', value: formatDuration(movie.durationMinutes) },
                  { label: 'Director', value: movie.director?.fullName ?? `#${movie.directorId}` },
                ].map((d) => (
                  <div key={d.label} className="flex justify-between items-baseline" style={{ paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13, color: '#c8c6c5' }}>{d.label}</span>
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#e5e2e1' }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
