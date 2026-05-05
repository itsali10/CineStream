import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const poster1 = 'https://www.figma.com/api/mcp/asset/389d637e-82a9-4ee7-ad14-f160f53258d7'
const poster2 = 'https://www.figma.com/api/mcp/asset/53f5dd33-614d-463b-997a-87198a0d538d'
const poster3 = 'https://www.figma.com/api/mcp/asset/281e34e4-bc72-4ed0-ae36-6e1c8f5336c9'
const poster4 = 'https://www.figma.com/api/mcp/asset/602890f6-4d46-48f6-b6cd-131cb66e4353'
const userAvatar = 'https://www.figma.com/api/mcp/asset/c287fd8a-2d65-46f0-adb9-5bb0894f652d'

const watchlist = [
  { id: '1', title: 'Neon Horizon', genre: 'SCI-FI', year: '2024', duration: '2h 15m', rating: '8.9', poster: poster1, progress: 45 },
  { id: '2', title: 'Midnight Rain', genre: 'THRILLER', year: '2023', duration: '1h 48m', rating: '7.4', poster: poster2, progress: 0 },
  { id: '3', title: 'Silent Peak', genre: 'DRAMA', year: '2024', duration: '2h 05m', rating: '9.2', poster: poster3, progress: 72 },
  { id: '4', title: 'Circuit Racer', genre: 'ACTION', year: '2024', duration: '1h 55m', rating: '8.1', poster: poster4, progress: 100 },
]

export default function WatchlistPage() {
  const [filter, setFilter] = useState<'all' | 'watching' | 'completed'>('all')
  const navigate = useNavigate()

  const filtered = watchlist.filter((m) => {
    if (filter === 'watching') return m.progress > 0 && m.progress < 100
    if (filter === 'completed') return m.progress === 100
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
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search watchlist..."
                style={{ paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, width: 256, backgroundColor: '#1c1b1b', border: '1px solid rgba(175,135,130,0.2)', borderRadius: 12, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none' }}
              />
            </div>
            <div className="rounded-xl overflow-hidden" style={{ width: 40, height: 40, border: '2px solid rgba(229,9,20,0.2)', padding: 2 }}>
              <img src={userAvatar} alt="User" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </header>

        <main className="pt-24 px-10 pb-16">
          {/* Header */}
          <div className="mb-10">
            <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 48, color: '#e5e2e1', letterSpacing: '-0.96px' }}>My Watchlist</h2>
            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 8 }}>
              {watchlist.length} titles saved · {watchlist.filter(m => m.progress > 0 && m.progress < 100).length} in progress
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-10">
            {(['all', 'watching', 'completed'] as const).map((f) => (
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
                {f === 'all' ? 'All' : f === 'watching' ? 'In Progress' : 'Completed'}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex flex-col gap-4">
            {filtered.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-6 rounded-lg overflow-hidden cursor-pointer"
                style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)', padding: '16px 24px 16px 16px' }}
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                {/* Poster */}
                <div className="rounded overflow-hidden flex-shrink-0" style={{ width: 80, height: 120 }}>
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 20, color: '#e5e2e1' }}>{movie.title}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>{movie.year}</span>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'rgba(200,198,197,0.3)' }} />
                        <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>{movie.duration}</span>
                        <span style={{ padding: '2px 6px', border: '1px solid rgba(175,135,130,0.3)', borderRadius: 2, fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 10, color: '#c8c6c5' }}>{movie.genre}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg width="12" height="11" viewBox="0 0 12 11" fill="#fbbf24"><path d="M6 0.5L7.5 4H11.5L8.5 6.5L9.5 10.5L6 8L2.5 10.5L3.5 6.5L0.5 4H4.5L6 0.5Z"/></svg>
                      <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 14, color: '#e5e2e1' }}>{movie.rating}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {movie.progress > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: '#c8c6c5' }}>
                          {movie.progress === 100 ? 'Completed' : `${movie.progress}% watched`}
                        </span>
                      </div>
                      <div style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                        <div style={{ height: '100%', width: `${movie.progress}%`, backgroundColor: movie.progress === 100 ? '#4ade80' : '#e50914', borderRadius: 2 }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    style={{ padding: '10px 24px', backgroundColor: '#e50914', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff7f6' }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/movies/${movie.id}`) }}
                  >
                    {movie.progress > 0 && movie.progress < 100 ? 'Continue' : movie.progress === 100 ? 'Rewatch' : 'Play'}
                  </button>
                  <button
                    style={{ padding: '10px', backgroundColor: 'transparent', border: '1px solid rgba(175,135,130,0.2)', borderRadius: 4, cursor: 'pointer', color: '#c8c6c5' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3.5H13M4.5 3.5V2H9.5V3.5M5.5 6.5V10.5M8.5 6.5V10.5M2 3.5L2.5 13H11.5L12 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M8 8H40V44L24 36L8 44V8Z" stroke="rgba(200,198,197,0.3)" strokeWidth="2" strokeLinejoin="round"/></svg>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 18, color: '#c8c6c5' }}>No titles in this category</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
