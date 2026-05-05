import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const heroBg = 'https://www.figma.com/api/mcp/asset/57de108e-15fc-4bac-b55f-9ea1d808c3da'
const poster = 'https://www.figma.com/api/mcp/asset/52845ce1-e1a3-4869-a54a-aa1599e65b4d'
const still1 = 'https://www.figma.com/api/mcp/asset/a9d10cdf-ab62-4b3c-8885-59edad36c16e'
const still2 = 'https://www.figma.com/api/mcp/asset/c8b012e1-6443-4d14-9c43-aa4c7b0be433'
const castMatthew = 'https://www.figma.com/api/mcp/asset/1bf7e521-4c5e-46fe-afc7-00cf120a040f'
const castAnne = 'https://www.figma.com/api/mcp/asset/36c0d2a5-5c87-4581-a516-c2ddd08f7091'
const castJessica = 'https://www.figma.com/api/mcp/asset/935db71c-4e58-49fa-8306-5e53425981d9'
const similarMartian = 'https://www.figma.com/api/mcp/asset/e057f890-2ef2-410a-9cce-1597568aa72b'
const similarInception = 'https://www.figma.com/api/mcp/asset/b12c49d6-1150-4ffa-aab5-08e8b791d988'
const userAvatar = 'https://www.figma.com/api/mcp/asset/3d2517e7-723f-4eae-8487-6159a7fb5040'

const cast = [
  { name: 'Matthew McConaughey', role: 'Joseph Cooper', img: castMatthew },
  { name: 'Anne Hathaway', role: 'Dr. Amelia Brand', img: castAnne },
  { name: 'Jessica Chastain', role: 'Murphy Cooper', img: castJessica },
]

const similar = [
  { title: 'The Martian', meta: '2015 • Sci-Fi', img: similarMartian },
  { title: 'Inception', meta: '2010 • Action / Sci-Fi', img: similarInception },
]

export default function MovieDetailsPage() {
  const navigate = useNavigate()

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
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}
            >
              Movies
            </button>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 16, color: '#c8c6c5', cursor: 'pointer' }}>Series</span>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 16, color: '#c8c6c5', cursor: 'pointer' }}>Animation</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search movies..."
                style={{ paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, width: 256, backgroundColor: '#1c1b1b', border: '1px solid rgba(94,63,59,0.2)', borderRadius: 12, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#6b7280', outline: 'none' }}
              />
            </div>
            <div className="rounded-xl overflow-hidden" style={{ width: 32, height: 32, border: '1px solid rgba(94,63,59,0.3)', padding: 1 }}>
              <img src={userAvatar} alt="User" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="relative overflow-hidden" style={{ height: 870, marginTop: 67 }}>
          <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ transform: 'scale(1.25)', transformOrigin: 'center' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #131313, rgba(19,19,19,0.4) 50%, rgba(19,19,19,0))' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #131313, rgba(19,19,19,0) 50%)' }} />

          <div className="absolute bottom-16 left-10 flex gap-10">
            {/* Poster */}
            <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 254, aspectRatio: '2/3', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
              <img src={poster} alt="Interstellar" className="w-full h-full object-cover" />
            </div>

            {/* Metadata */}
            <div className="flex flex-col gap-4 justify-end max-w-2xl">
              <div className="flex items-center gap-4">
                <span style={{ padding: '4px 8px', backgroundColor: '#e50914', borderRadius: 2, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#fff7f6' }}>NEW</span>
                <div className="flex items-center gap-1">
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="#fbbf24"><path d="M6 0.5L7.5 4H11.5L8.5 6.5L9.5 10.5L6 8L2.5 10.5L3.5 6.5L0.5 4H4.5L6 0.5Z"/></svg>
                  <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}>8.6</span>
                </div>
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>2014</span>
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>2h 49m</span>
              </div>

              <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 900, fontSize: 48, color: '#e5e2e1', letterSpacing: '-2.4px', textTransform: 'uppercase', lineHeight: '52.8px' }}>
                INTERSTELLAR
              </h1>

              <div className="flex gap-4">
                {['Sci-Fi', 'Adventure', 'Drama'].map((g) => (
                  <span key={g} style={{ padding: '5px 17px', border: '1px solid rgba(255,180,170,0.3)', borderRadius: 12, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#ffb4aa' }}>{g}</span>
                ))}
              </div>

              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 18, color: '#c8c6c5', lineHeight: '29.25px', maxWidth: 672 }}>
                When Earth becomes uninhabitable, a team of ex-pilots and scientists must travel through a wormhole to find a new home for humanity. A visually stunning journey across space and time.
              </p>

              <div className="flex items-center gap-4 mt-6">
                <button className="flex items-center gap-2 rounded" style={{ padding: '16px 64px', backgroundColor: '#e50914', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6' }}>
                  <svg width="11" height="14" viewBox="0 0 11 14" fill="currentColor"><path d="M1 1L10 7L1 13V1Z"/></svg>
                  Play Now
                </button>
                <button className="flex items-center gap-2 rounded" style={{ padding: '17px 25px', backgroundColor: 'rgba(71,71,70,0.3)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="px-10 py-16" style={{ backgroundColor: '#131313' }}>
          <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 380px' }}>
            {/* Left column */}
            <div className="col-span-5 flex flex-col gap-10">
              {/* Synopsis */}
              <div>
                <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1', paddingBottom: 16, borderBottom: '1px solid rgba(94,63,59,0.2)', marginBottom: 16 }}>
                  Synopsis
                </h2>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#b7b5b4', lineHeight: '26px' }}>
                  In the mid-21st century, crop blights and dust storms threaten humanity's survival. Joseph Cooper, a widowed engineer and former NASA pilot, runs a farm with his father-in-law, son, and daughter Murphy. After Murphy discovers a 'ghost' in her room—which Cooper realizes is a gravitational anomaly—they find a secret NASA facility led by Professor John Brand.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'DIRECTOR', value: 'Christopher Nolan' },
                  { label: 'RELEASE', value: 'Nov 7, 2014' },
                  { label: 'BOX OFFICE', value: '$701.7M' },
                  { label: 'RATING', value: 'PG-13' },
                ].map((s) => (
                  <div key={s.label} style={{ padding: 25, backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                    <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</p>
                    <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Stills */}
              <div>
                <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1', marginBottom: 24 }}>Stills from Movie</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[still1, still2].map((src, i) => (
                    <div key={i} className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={src} alt="" className="w-full object-cover" style={{ height: 404 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="col-span-4 flex flex-col gap-10" style={{ gridColumn: '6 / -1' }}>
              {/* Top cast */}
              <div style={{ padding: 40, backgroundColor: 'rgba(26,26,26,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, backdropFilter: 'blur(6px)' }}>
                <h3 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1', marginBottom: 24 }}>Top Cast</h3>
                <div className="flex flex-col gap-4">
                  {cast.map((c) => (
                    <div key={c.name} className="flex items-center gap-4 p-4 rounded">
                      <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 48, height: 48, backgroundColor: '#201f1f' }}>
                        <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}>{c.name}</p>
                        <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>{c.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ width: '100%', padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#ffb4aa', textAlign: 'center', marginTop: 16 }}>
                  View All Cast
                </button>
              </div>

              {/* Similar movies */}
              <div>
                <h3 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1', marginBottom: 16, padding: '0 16px' }}>Similar Movies</h3>
                <div className="flex flex-col gap-4">
                  {similar.map((s) => (
                    <div key={s.title} className="relative rounded-lg overflow-hidden cursor-pointer" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                      <img src={s.img} alt={s.title} className="w-full object-cover" style={{ height: 390, filter: 'saturate(0)' }} />
                      <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))' }}>
                        <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e5e2e1' }}>{s.title}</p>
                        <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>{s.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
