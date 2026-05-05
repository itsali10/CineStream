import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const userAvatar = 'https://www.figma.com/api/mcp/asset/c287fd8a-2d65-46f0-adb9-5bb0894f652d'

const movies = [
  {
    id: '1',
    title: 'Neon Horizon',
    genre: 'SCI-FI',
    year: '2024',
    duration: '2h 15m',
    rating: '8.9',
    poster: 'https://www.figma.com/api/mcp/asset/389d637e-82a9-4ee7-ad14-f160f53258d7',
  },
  {
    id: '2',
    title: 'Midnight Rain',
    genre: 'THRILLER',
    year: '2023',
    duration: '1h 48m',
    rating: '7.4',
    poster: 'https://www.figma.com/api/mcp/asset/53f5dd33-614d-463b-997a-87198a0d538d',
  },
  {
    id: '3',
    title: 'Silent Peak',
    genre: 'DRAMA',
    year: '2024',
    duration: '2h 05m',
    rating: '9.2',
    poster: 'https://www.figma.com/api/mcp/asset/281e34e4-bc72-4ed0-ae36-6e1c8f5336c9',
  },
  {
    id: '4',
    title: 'Circuit Racer',
    genre: 'ACTION',
    year: '2024',
    duration: '1h 55m',
    rating: '8.1',
    poster: 'https://www.figma.com/api/mcp/asset/602890f6-4d46-48f6-b6cd-131cb66e4353',
  },
]

const genres = ['All', 'Action', 'Drama', 'Sci-Fi', 'Thriller']

export default function MoviesPage() {
  const [activeGenre, setActiveGenre] = useState('All')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = movies.filter((m) => {
    const matchGenre = activeGenre === 'All' || m.genre.toLowerCase() === activeGenre.toLowerCase()
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase())
    return matchGenre && matchSearch
  })

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
      <Sidebar activePath="/movies" />

      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Top navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{
            left: 260,
            right: 0,
            top: 0,
            zIndex: 40,
            backgroundColor: 'rgba(19,19,19,0.8)',
            backdropFilter: 'blur(6px)',
          }}
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
            <div
              className="rounded-xl overflow-hidden"
              style={{ width: 40, height: 40, border: '2px solid rgba(229,9,20,0.2)', padding: 2 }}
            >
              <img src={userAvatar} alt="User" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pt-24 px-10 pb-16">
          {/* Filter bar */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: 16,
                    backgroundColor: activeGenre === g ? '#e50914' : '#2a2a2a',
                    color: activeGenre === g ? '#fff7f6' : '#c8c6c5',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
            <button
              className="flex items-center gap-2 rounded"
              style={{
                padding: '16px 40px',
                backgroundColor: '#e50914',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: '#fff7f6',
              }}
            >
              <span>+</span>
              <span>Add Movie</span>
            </button>
          </div>

          {/* Movie grid */}
          <div className="grid gap-10" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {filtered.map((movie) => (
              <div
                key={movie.id}
                className="rounded-lg overflow-hidden cursor-pointer"
                style={{ backgroundColor: '#201f1f' }}
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <div className="relative" style={{ aspectRatio: '2/3' }}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Rating badge */}
                  <div
                    className="absolute flex items-center gap-1 rounded"
                    style={{ top: 16, right: 16, padding: '4px 8px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
                  >
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="#fbbf24">
                      <path d="M6 0.5L7.5 4H11.5L8.5 6.5L9.5 10.5L6 8L2.5 10.5L3.5 6.5L0.5 4H4.5L6 0.5Z"/>
                    </svg>
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 12, color: '#e5e2e1' }}>
                      {movie.rating}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 18, color: '#e5e2e1' }}>
                      {movie.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontWeight: 700,
                        fontSize: 10,
                        color: '#c8c6c5',
                        border: '1px solid rgba(175,135,130,0.3)',
                        borderRadius: 2,
                        padding: '3px 5px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {movie.genre}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>{movie.year}</span>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'rgba(200,198,197,0.3)' }} />
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>{movie.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-2">
              {['‹', '1', '2', '3', '›'].map((p, i) => (
                <button
                  key={i}
                  style={{
                    width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 4,
                    border: p === '1' ? 'none' : '1px solid rgba(175,135,130,0.2)',
                    backgroundColor: p === '1' ? '#e50914' : 'transparent',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: p === '1' ? 700 : 400,
                    fontSize: 16,
                    color: p === '1' ? '#fff7f6' : '#c8c6c5',
                    cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
