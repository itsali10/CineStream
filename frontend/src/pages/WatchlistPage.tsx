import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { watchlistService } from '../services/watchlistService'
import Sidebar from '../components/Sidebar'
import type { WatchList } from '../types'

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'watched' | 'unwatched'>('all')
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    watchlistService
      .getByUserId(user.id)
      .then(setItems)
      .catch(() => setError('Failed to load watchlist.'))
      .finally(() => setLoading(false))
  }, [user])

  const handleRemove = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (!confirm('Remove from watchlist?')) return
    try {
      await watchlistService.remove(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch {
      alert('Failed to remove item.')
    }
  }

  const handleToggleWatched = async (e: React.MouseEvent, item: WatchList) => {
    e.stopPropagation()
    try {
      const updated = await watchlistService.update(item.id, { isWatched: !item.isWatched })
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, isWatched: updated.isWatched } : i)))
    } catch {
      alert('Failed to update status.')
    }
  }

  const filtered = items.filter((item) => {
    if (filter === 'watched') return item.isWatched
    if (filter === 'unwatched') return !item.isWatched
    return true
  })

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
      <Sidebar activePath="/watchlist" />

      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Top navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{ left: 260, right: 0, top: 0, zIndex: 40, backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(6px)' }}
        >
          <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e5e2e1' }}>My Watchlist</h1>
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>
              {user?.username}
            </span>
          </div>
        </header>

        <main className="pt-24 px-10 pb-16">
          {/* Header */}
          <div className="mb-8">
            <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 48, color: '#e5e2e1', letterSpacing: '-0.96px' }}>My Watchlist</h2>
            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 8 }}>
              {items.length} {items.length === 1 ? 'title' : 'titles'} saved
              {items.filter((i) => i.isWatched).length > 0 && ` · ${items.filter((i) => i.isWatched).length} watched`}
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8">
            {(['all', 'unwatched', 'watched'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 24px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: 16,
                  backgroundColor: filter === f ? '#e50914' : '#2a2a2a',
                  color: filter === f ? '#fff7f6' : '#c8c6c5',
                  textTransform: 'capitalize',
                }}
              >
                {f === 'all' ? 'All' : f === 'watched' ? 'Watched' : 'Not Watched'}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ height: 120, backgroundColor: '#201f1f', borderRadius: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div style={{ padding: '24px', backgroundColor: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e50914' }}>{error}</p>
            </div>
          )}

          {/* List */}
          {!loading && !error && (
            <>
              <div className="flex flex-col gap-4">
                {filtered.map((item) => {
                  const movie = item.movie
                  const title = movie?.title ?? `Movie #${item.movieId}`
                  const genre = movie?.genre ?? ''
                  const year = movie?.releaseYear ?? ''

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 rounded-lg overflow-hidden cursor-pointer"
                      style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)', padding: '16px 24px 16px 16px' }}
                      onClick={() => navigate(`/movies/${item.movieId}`)}
                    >
                      {/* Poster/placeholder */}
                      <div className="rounded overflow-hidden flex-shrink-0" style={{ width: 72, height: 108 }}>
                        {movie?.thumbnailUrl ? (
                          <img src={movie.thumbnailUrl} alt={title} className="w-full h-full object-cover" />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, hsl(${(item.movieId * 47) % 360}, 40%, 20%) 0%, #131313 100%)` }}
                          >
                            <span style={{ fontSize: 24, opacity: 0.5 }}>🎬</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 18, color: '#e5e2e1' }}>{title}</p>
                            <div className="flex items-center gap-3 mt-1">
                              {year && <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>{year}</span>}
                              {genre && (
                                <span style={{ padding: '2px 6px', border: '1px solid rgba(175,135,130,0.3)', borderRadius: 2, fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 10, color: '#c8c6c5' }}>
                                  {genre.toUpperCase()}
                                </span>
                              )}
                              <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: item.isWatched ? '#4ade80' : '#c8c6c5' }}>
                                {item.isWatched ? '✓ Watched' : 'Not watched'}
                              </span>
                            </div>
                          </div>
                          {movie?.rating && (
                            <div className="flex items-center gap-1">
                              <svg width="12" height="11" viewBox="0 0 12 11" fill="#fbbf24"><path d="M6 0.5L7.5 4H11.5L8.5 6.5L9.5 10.5L6 8L2.5 10.5L3.5 6.5L0.5 4H4.5L6 0.5Z"/></svg>
                              <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 14, color: '#e5e2e1' }}>{movie.rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                        <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: '#c8c6c5' }}>
                          Added {new Date(item.addedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <button
                          style={{
                            padding: '8px 20px',
                            backgroundColor: item.isWatched ? '#2a2a2a' : '#e50914',
                            border: item.isWatched ? '1px solid rgba(175,135,130,0.2)' : 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontFamily: "'Be Vietnam Pro', sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            color: item.isWatched ? '#c8c6c5' : '#fff7f6',
                          }}
                          onClick={(e) => handleToggleWatched(e, item)}
                        >
                          {item.isWatched ? 'Mark Unwatched' : 'Mark Watched'}
                        </button>
                        <button
                          style={{ padding: '8px 10px', backgroundColor: 'transparent', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 4, cursor: 'pointer', color: '#e50914' }}
                          onClick={(e) => handleRemove(e, item.id)}
                          title="Remove from watchlist"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3.5H13M4.5 3.5V2H9.5V3.5M5.5 6.5V10.5M8.5 6.5V10.5M2 3.5L2.5 13H11.5L12 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M8 8H40V44L24 36L8 44V8Z" stroke="rgba(200,198,197,0.3)" strokeWidth="2" strokeLinejoin="round"/></svg>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 18, color: '#c8c6c5' }}>
                    {items.length === 0 ? 'Your watchlist is empty.' : 'No titles in this category.'}
                  </p>
                  {items.length === 0 && (
                    <button
                      onClick={() => navigate('/movies')}
                      style={{ padding: '12px 32px', backgroundColor: '#e50914', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}
                    >
                      Browse Movies
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
