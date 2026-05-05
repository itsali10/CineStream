import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { directorsService } from '../services/directorsService'
import Sidebar from '../components/Sidebar'
import type { Director } from '../types'

export default function DirectorsPage() {
  const [directors, setDirectors] = useState<Director[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  useEffect(() => {
    directorsService
      .getAll()
      .then(setDirectors)
      .catch(() => setError('Failed to load directors.'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (e: React.MouseEvent, id: number, name: string) => {
    e.stopPropagation()
    if (!confirm(`Delete director "${name}"?`)) return
    try {
      await directorsService.delete(id)
      setDirectors((prev) => prev.filter((d) => d.id !== id))
    } catch {
      alert('Failed to delete director. They may have associated movies.')
    }
  }

  const filtered = directors.filter((d) =>
    d.fullName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
      <Sidebar activePath="/directors" />

      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Top navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{ left: 260, right: 0, top: 0, zIndex: 40, backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(6px)' }}
        >
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="4" stroke="#e50914" strokeWidth="1.5"/>
              <path d="M1 17C1 13.134 4.686 10 9 10C13.314 10 17 13.134 17 17" stroke="#e50914" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e50914' }}>Directors</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search directors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 16, paddingRight: 40, paddingTop: 10, paddingBottom: 10, width: 300, backgroundColor: '#0e0e0e', border: '1px solid rgba(175,135,130,0.2)', borderRadius: 12, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none' }}
              />
              <svg style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </header>

        <main className="pt-24 px-10 pb-16">
          {/* Page header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 48, color: '#e5e2e1', letterSpacing: '-0.96px' }}>
                Industry Masters
              </h1>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 8, lineHeight: '25.6px' }}>
                The definitive catalog of visionary directors shaping the global cinematic landscape.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => navigate('/directors/new')}
                className="flex items-center gap-2 rounded"
                style={{ padding: '16px 40px', backgroundColor: '#e50914', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6' }}
              >
                <span>+</span>
                <span>Add Director</span>
              </button>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ height: 320, backgroundColor: '#2a2a2a', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div className="p-6">
                    <div style={{ height: 24, backgroundColor: '#2a2a2a', borderRadius: 4, marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: 16, backgroundColor: '#2a2a2a', borderRadius: 4, width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
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

          {/* Directors grid */}
          {!loading && !error && (
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {filtered.map((d) => (
                <div
                  key={d.id}
                  className="rounded-lg overflow-hidden flex flex-col"
                  style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {/* Color block header (no real images) */}
                  <div className="relative" style={{ height: 200 }}>
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, hsl(${(d.id * 53) % 360}, 30%, 18%) 0%, #131313 100%)` }}
                    >
                      <span style={{ fontSize: 48, opacity: 0.4 }}>🎬</span>
                    </div>

                    {/* Edit/Delete buttons */}
                    {isAdmin && (
                      <div className="absolute top-3 right-3 flex gap-1">
                        <button
                          onClick={() => navigate(`/directors/${d.id}/edit`)}
                          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(19,19,19,0.7)', border: 'none', borderRadius: 4, cursor: 'pointer', backdropFilter: 'blur(6px)' }}
                        >
                          <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><path d="M10.5 2.5L12.5 4.5L5 12H3V10L10.5 2.5Z" stroke="#e5e2e1" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, d.id, d.fullName)}
                          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(229,9,20,0.7)', border: 'none', borderRadius: 4, cursor: 'pointer', backdropFilter: 'blur(6px)' }}
                        >
                          <svg width="11" height="13" viewBox="0 0 13 15" fill="none"><path d="M1 3.5H12M4.5 3.5V2H8.5V3.5M5.5 6.5V11.5M7.5 6.5V11.5M2 3.5L2.5 13H10.5L11 3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="flex items-baseline justify-between">
                      <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 20, color: '#e5e2e1' }}>{d.fullName}</span>
                      <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 13, color: '#c8c6c5' }}>{d.birthYear}</span>
                    </div>
                    {d.nationality && (
                      <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13, color: '#c8c6c5', letterSpacing: '1.3px', textTransform: 'uppercase' }}>{d.nationality}</p>
                    )}
                    {d.bio && (
                      <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#b7b5b4', lineHeight: '22px', flex: 1 }}>
                        {d.bio.length > 120 ? d.bio.substring(0, 120) + '…' : d.bio}
                      </p>
                    )}
                    {d.movies && (
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(175,135,130,0.1)' }}>
                        <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#c8c6c5' }}>{d.movies.length} Films Directed</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="col-span-4 flex flex-col items-center justify-center py-24 gap-4">
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 18, color: '#c8c6c5' }}>
                    {directors.length === 0 ? 'No directors in the catalog yet.' : 'No directors match your search.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Footer stats */}
          {!loading && !error && directors.length > 0 && (
            <div className="flex items-center mt-12 pt-8" style={{ borderTop: '1px solid rgba(175,135,130,0.1)' }}>
              <div className="flex items-center gap-10">
                <div>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1' }}>{directors.length}</p>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#c8c6c5', textTransform: 'uppercase', letterSpacing: '0.7px' }}>TOTAL DIRECTORS</p>
                </div>
                <div style={{ width: 1, height: 40, backgroundColor: 'rgba(175,135,130,0.2)' }} />
                <div>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1' }}>
                    {new Set(directors.map((d) => d.nationality).filter(Boolean)).size}
                  </p>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#c8c6c5', textTransform: 'uppercase', letterSpacing: '0.7px' }}>NATIONALITIES</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
