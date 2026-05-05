import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { moviesService } from '../services/moviesService'
import Sidebar from '../components/Sidebar'
import type { Movie } from '../types'

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ''}` : `${m}m`
}

const GENRES = ['All', 'Action', 'Drama', 'Sci-Fi', 'Thriller', 'Comedy', 'Horror', 'Animation']

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { isAdmin, user } = useAuth()

  useEffect(() => {
    moviesService
      .getAll()
      .then(setMovies)
      .catch(() => setError('Failed to load movies.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = movies.filter((m) => {
    const matchGenre = activeGenre === 'All' || m.genre.toLowerCase() === activeGenre.toLowerCase()
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase())
    return matchGenre && matchSearch
  })

  const handleDelete = async (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation()
    if (!confirm('Delete this movie?')) return
    try {
      await moviesService.delete(movieId)
      setMovies((prev) => prev.filter((m) => m.id !== movieId))
    } catch {
      alert('Failed to delete movie.')
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
      <Sidebar activePath="/movies" />

      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Top navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{ left: 260, right: 0, top: 0, zIndex: 40, backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(6px)' }}
        >
          <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e5e2e1' }}>
            Movies Catalog
          </h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  width: 256, backgroundColor: '#1c1b1b',
                  border: '1px solid rgba(175,135,130,0.2)',
                  borderRadius: 12,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: 16, color: '#e5e2e1', outline: 'none',
                }}
              />
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e50914', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(229,9,20,0.2)' }}>
              <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff' }}>
                {user?.username?.[0]?.toUpperCase() ?? 'U'}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pt-24 px-10 pb-16">
          {/* Filter bar */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex gap-2 flex-wrap">
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: 15,
                    backgroundColor: activeGenre === g ? '#e50914' : '#2a2a2a',
                    color: activeGenre === g ? '#fff7f6' : '#c8c6c5',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
            {isAdmin && (
              <button
                onClick={() => navigate('/movies/new')}
                className="flex items-center gap-2 rounded"
                style={{ padding: '14px 32px', backgroundColor: '#e50914', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6', whiteSpace: 'nowrap' }}
              >
                <span>+</span>
                <span>Add Movie</span>
              </button>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-10" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: '#201f1f' }}>
                  <div style={{ aspectRatio: '2/3', backgroundColor: '#2a2a2a', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div className="p-4">
                    <div style={{ height: 20, backgroundColor: '#2a2a2a', borderRadius: 4, marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: 14, backgroundColor: '#2a2a2a', borderRadius: 4, width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div style={{ padding: '24px', backgroundColor: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e50914' }}>{error}</p>
            </div>
          )}

          {/* Movie grid */}
          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 18, color: '#c8c6c5' }}>
                    {movies.length === 0 ? 'No movies in the catalog yet.' : 'No movies match your search.'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                  {filtered.map((movie) => (
                    <div
                      key={movie.id}
                      className="rounded-lg overflow-hidden cursor-pointer"
                      style={{ backgroundColor: '#201f1f' }}
                      onClick={() => navigate(`/movies/${movie.id}`)}
                    >
                      <div className="relative" style={{ aspectRatio: '2/3' }}>
                        {movie.thumbnailUrl ? (
                          <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-full object-cover" />
                        ) : (
                          <div
                            className="w-full h-full flex items-end p-3"
                            style={{ background: `linear-gradient(135deg, hsl(${(movie.id * 47) % 360}, 40%, 20%) 0%, #131313 100%)` }}
                          >
                            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 13, color: 'rgba(229,226,225,0.6)', lineHeight: 1.3 }}>{movie.title}</span>
                          </div>
                        )}
                        {/* Rating badge */}
                        <div
                          className="absolute flex items-center gap-1 rounded"
                          style={{ top: 10, right: 10, padding: '3px 7px', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
                        >
                          <svg width="10" height="10" viewBox="0 0 12 11" fill="#fbbf24">
                            <path d="M6 0.5L7.5 4H11.5L8.5 6.5L9.5 10.5L6 8L2.5 10.5L3.5 6.5L0.5 4H4.5L6 0.5Z"/>
                          </svg>
                          <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 11, color: '#e5e2e1' }}>
                            {movie.rating.toFixed(1)}
                          </span>
                        </div>
                        {/* Admin actions */}
                        {isAdmin && (
                          <div className="absolute flex gap-1" style={{ top: 10, left: 10 }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); navigate(`/movies/${movie.id}/edit`) }}
                              style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(19,19,19,0.7)', border: 'none', borderRadius: 4, cursor: 'pointer', backdropFilter: 'blur(6px)' }}
                            >
                              <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><path d="M10.5 2.5L12.5 4.5L5 12H3V10L10.5 2.5Z" stroke="#e5e2e1" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                            </button>
                            <button
                              onClick={(e) => handleDelete(e, movie.id)}
                              style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(229,9,20,0.7)', border: 'none', borderRadius: 4, cursor: 'pointer', backdropFilter: 'blur(6px)' }}
                            >
                              <svg width="11" height="13" viewBox="0 0 13 15" fill="none"><path d="M1 3.5H12M4.5 3.5V2H8.5V3.5M5.5 6.5V11.5M7.5 6.5V11.5M2 3.5L2.5 13H10.5L11 3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-start justify-between mb-1 gap-2">
                          <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 14, color: '#e5e2e1', lineHeight: 1.3 }}>
                            {movie.title}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Be Vietnam Pro', sans-serif",
                              fontWeight: 700,
                              fontSize: 9,
                              color: '#c8c6c5',
                              border: '1px solid rgba(175,135,130,0.3)',
                              borderRadius: 2,
                              padding: '2px 4px',
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                            }}
                          >
                            {movie.genre.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13, color: '#c8c6c5' }}>{movie.releaseYear}</span>
                          <div style={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: 'rgba(200,198,197,0.3)' }} />
                          <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13, color: '#c8c6c5' }}>{formatDuration(movie.durationMinutes)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
