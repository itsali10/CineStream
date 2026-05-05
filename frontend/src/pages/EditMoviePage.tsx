import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { moviesService } from '../services/moviesService'
import { directorsService } from '../services/directorsService'
import type { Director } from '../types'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  backgroundColor: '#0e0e0e',
  border: '1px solid rgba(94,63,59,0.3)',
  borderRadius: 4,
  fontFamily: "'Be Vietnam Pro', sans-serif",
  fontSize: 16,
  color: '#e5e2e1',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'Be Vietnam Pro', sans-serif",
  fontWeight: 600,
  fontSize: 13,
  color: '#c8c6c5',
  letterSpacing: '0.7px',
  textTransform: 'uppercase',
  marginBottom: 6,
  display: 'block',
}

export default function EditMoviePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [directors, setDirectors] = useState<Director[]>([])
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    durationMinutes: 90,
    rating: 5.0,
    thumbnailUrl: '',
    directorId: 0,
  })

  useEffect(() => {
    if (!id) return
    Promise.all([
      moviesService.getById(parseInt(id)),
      directorsService.getAll(),
    ])
      .then(([movie, dirs]) => {
        setForm({
          title: movie.title,
          description: movie.description ?? '',
          genre: movie.genre,
          releaseYear: movie.releaseYear,
          durationMinutes: movie.durationMinutes,
          rating: movie.rating,
          thumbnailUrl: movie.thumbnailUrl ?? '',
          directorId: movie.directorId,
        })
        setDirectors(dirs)
      })
      .catch(() => setLoadError('Failed to load movie data.'))
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: ['releaseYear', 'durationMinutes', 'directorId'].includes(name)
        ? parseInt(value) || 0
        : name === 'rating'
        ? parseFloat(value) || 0
        : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { setSaveError('Title is required.'); return }
    if (!form.genre.trim()) { setSaveError('Genre is required.'); return }
    if (form.directorId === 0) { setSaveError('Please select a director.'); return }

    setLoading(true)
    setSaveError('')
    try {
      await moviesService.update(parseInt(id!), form)
      setSuccess(true)
      setTimeout(() => navigate(`/movies/${id}`), 1500)
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setSaveError(message || 'Failed to update movie. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
        <Sidebar activePath="/movies" />
        <div className="flex-1 flex items-center justify-center" style={{ marginLeft: 260 }}>
          <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 18, color: '#e50914' }}>{loadError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
      <Sidebar activePath="/movies" />

      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{ left: 260, right: 0, top: 0, zIndex: 40, backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(6px)' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/movies/${id}`)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c8c6c5', display: 'flex', alignItems: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e5e2e1' }}>
              Edit Movie
            </h1>
          </div>
        </header>

        <main className="pt-24 px-10 pb-16">
          <div style={{ maxWidth: 800 }}>
            {/* Section title */}
            <div className="mb-10">
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 900, fontSize: 40, color: '#e5e2e1', letterSpacing: '-1px' }}>
                Edit Movie
              </p>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 6 }}>
                Update the details for this movie.
              </p>
            </div>

            {/* Success message */}
            {success && (
              <div style={{ padding: '16px', backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 6, marginBottom: 24 }}>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 15, color: '#4ade80' }}>
                  Movie updated successfully! Redirecting…
                </p>
              </div>
            )}

            {/* Error message */}
            {saveError && (
              <div style={{ padding: '16px', backgroundColor: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 6, marginBottom: 24 }}>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 15, color: '#e50914' }}>{saveError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Title */}
              <div>
                <label style={labelStyle}>Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter movie title"
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief synopsis of the movie..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {/* Genre + Director (row) */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Genre *</label>
                  <input
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    placeholder="e.g. Action, Drama, Sci-Fi"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Director *</label>
                  <select
                    name="directorId"
                    value={form.directorId}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value={0}>Select a director…</option>
                    {directors.map((d) => (
                      <option key={d.id} value={d.id}>{d.fullName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Year + Duration + Rating (row) */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label style={labelStyle}>Release Year *</label>
                  <input
                    name="releaseYear"
                    type="number"
                    min={1888}
                    max={2100}
                    value={form.releaseYear}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Duration (minutes) *</label>
                  <input
                    name="durationMinutes"
                    type="number"
                    min={1}
                    value={form.durationMinutes}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Rating (0–10) *</label>
                  <input
                    name="rating"
                    type="number"
                    min={0}
                    max={10}
                    step={0.1}
                    value={form.rating}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label style={labelStyle}>Thumbnail URL</label>
                <input
                  name="thumbnailUrl"
                  value={form.thumbnailUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  style={inputStyle}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading || success}
                  style={{
                    padding: '16px 48px',
                    backgroundColor: loading || success ? '#a00610' : '#e50914',
                    border: 'none',
                    borderRadius: 6,
                    cursor: loading || success ? 'not-allowed' : 'pointer',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#fff7f6',
                  }}
                >
                  {loading ? 'Saving…' : success ? 'Saved!' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/movies/${id}`)}
                  style={{
                    padding: '16px 48px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(175,135,130,0.2)',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#c8c6c5',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
