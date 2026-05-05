import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { moviesService } from '../services/moviesService'
import { directorsService } from '../services/directorsService'
import { watchlistService } from '../services/watchlistService'
import { usersService } from '../services/usersService'
import Sidebar from '../components/Sidebar'

interface Stats {
  movies: number
  directors: number
  watchlist: number
  users: number
}

export default function HomePage() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats>({ movies: 0, directors: 0, watchlist: 0, users: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [movies, directors, watchlist] = await Promise.all([
          moviesService.getAll(),
          directorsService.getAll(),
          watchlistService.getAll(),
        ])
        let userCount = 0
        if (isAdmin) {
          const users = await usersService.getAll()
          userCount = users.length
        }
        setStats({
          movies: movies.length,
          directors: directors.length,
          watchlist: watchlist.length,
          users: userCount,
        })
      } catch {
        // stats stay at 0 on error
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [isAdmin])

  const statCards = [
    { label: 'Total Movies', value: stats.movies, color: '#e50914', path: '/movies' },
    { label: 'Directors', value: stats.directors, color: '#ffb4aa', path: '/directors' },
    { label: 'Watchlist Items', value: stats.watchlist, color: '#4ade80', path: '/watchlist' },
    ...(isAdmin ? [{ label: 'Total Users', value: stats.users, color: '#fbbf24', path: '/admin/users' }] : []),
  ]

  const quickLinks = [
    { label: 'Browse Movies', path: '/movies', desc: 'Explore the full movie catalog', icon: '🎬' },
    { label: 'Add New Movie', path: '/movies/new', desc: 'Add a movie to the database', icon: '➕', adminOnly: true },
    { label: 'My Watchlist', path: '/watchlist', desc: 'Track what you want to watch', icon: '📋' },
    { label: 'Directors', path: '/directors', desc: 'Manage the directors catalog', icon: '🎥' },
    { label: 'My Profile', path: '/profile', desc: 'View and edit your profile', icon: '👤' },
    { label: 'User Management', path: '/admin/users', desc: 'Manage all platform users', icon: '🛡️', adminOnly: true },
  ]

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
      <Sidebar activePath="/" />
      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Top navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{ left: 260, right: 0, top: 0, zIndex: 40, backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(6px)' }}
        >
          <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e5e2e1' }}>
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>
              Welcome back,
            </span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 14, color: '#e50914' }}>
              {user?.username}
            </span>
            {isAdmin && (
              <span style={{ padding: '2px 8px', backgroundColor: 'rgba(229,9,20,0.15)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 11, fontWeight: 600, color: '#e50914' }}>
                ADMIN
              </span>
            )}
          </div>
        </header>

        <main className="pt-24 px-10 pb-16">
          {/* Hero section */}
          <div
            className="rounded-xl mb-10 p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(229,9,20,0.15) 0%, rgba(15,15,15,0) 60%)', border: '1px solid rgba(229,9,20,0.2)' }}
          >
            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 900, fontSize: 48, color: '#e5e2e1', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
              Welcome to<br />
              <span style={{ color: '#e50914' }}>CineStream</span>
            </p>
            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 18, color: '#c8c6c5', marginTop: 16, maxWidth: 480 }}>
              Your premium movie management platform. Browse, manage, and track your favorite films all in one place.
            </p>
            <button
              onClick={() => navigate('/movies')}
              style={{ marginTop: 24, padding: '14px 40px', backgroundColor: '#e50914', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6' }}
            >
              Browse Movies →
            </button>
          </div>

          {/* Stats */}
          <div className="grid gap-6 mb-12" style={{ gridTemplateColumns: `repeat(${statCards.length}, 1fr)` }}>
            {statCards.map((s) => (
              <div
                key={s.label}
                className="rounded-lg cursor-pointer transition-all"
                style={{ padding: 24, backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)' }}
                onClick={() => navigate(s.path)}
              >
                {loading ? (
                  <div style={{ width: 60, height: 40, backgroundColor: '#2a2a2a', borderRadius: 4, marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
                ) : (
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 40, color: s.color }}>{s.value}</p>
                )}
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5', marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div>
            <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e5e2e1', marginBottom: 16 }}>
              Quick Actions
            </h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {quickLinks
                .filter((l) => !l.adminOnly || isAdmin)
                .map((link) => (
                  <div
                    key={link.path}
                    className="rounded-lg cursor-pointer flex items-start gap-4 p-6"
                    style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)' }}
                    onClick={() => navigate(link.path)}
                  >
                    <span style={{ fontSize: 28 }}>{link.icon}</span>
                    <div>
                      <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}>{link.label}</p>
                      <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5', marginTop: 4 }}>{link.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
