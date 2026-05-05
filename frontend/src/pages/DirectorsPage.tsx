import Sidebar from '../components/Sidebar'

const userAvatar = 'https://www.figma.com/api/mcp/asset/b9df488b-e01f-4437-b5f9-1937697052dc'

const directors = [
  {
    id: 1,
    name: 'Christopher Nolan',
    year: 1970,
    nationality: 'BRITISH-AMERICAN',
    bio: 'Renowned for his non-linear storytelling and practical effects, Nolan has redefined the modern blockbuster…',
    films: 12,
    featured: true,
    img: 'https://www.figma.com/api/mcp/asset/658c5a47-1cf4-4550-afd6-069f365ad9fb',
  },
  {
    id: 2,
    name: 'Greta Gerwig',
    year: 1983,
    nationality: 'AMERICAN',
    bio: "A pioneer of modern coming-of-age narratives, Gerwig's transition from actress to director has produced some of…",
    films: 4,
    featured: false,
    img: 'https://www.figma.com/api/mcp/asset/7cf74910-48be-48bf-bd62-1a3c65c6e1e3',
  },
  {
    id: 3,
    name: 'Hayao Miyazaki',
    year: 1941,
    nationality: 'JAPANESE',
    bio: "The master of animation and co-founder of Studio Ghibli, Miyazaki's works are legendary for their ecological themes…",
    films: 22,
    featured: false,
    img: 'https://www.figma.com/api/mcp/asset/c25e84d6-9fe3-42c2-a8ab-254073f06a1b',
  },
  {
    id: 5,
    name: 'Julia Ducournau',
    year: 1983,
    nationality: 'FRENCH',
    bio: "A provocateur of body horror and surrealist drama, Ducournau's bold visual style has earned her the highest…",
    films: 3,
    featured: false,
    img: 'https://www.figma.com/api/mcp/asset/91d64267-c0d2-482f-9f89-1c7e4e40fbdb',
  },
  {
    id: 6,
    name: 'Alfonso Cuarón',
    year: 1961,
    nationality: 'MEXICAN',
    bio: 'Known for his mastery of long takes and technical innovation, Cuarón creates deeply personal stories with universal themes…',
    films: 9,
    featured: false,
    img: 'https://www.figma.com/api/mcp/asset/2294478b-29db-4be8-8747-9a5e77154866',
  },
]

export default function DirectorsPage() {
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
                style={{ paddingLeft: 16, paddingRight: 40, paddingTop: 10, paddingBottom: 10, width: 300, backgroundColor: '#0e0e0e', border: '1px solid rgba(175,135,130,0.2)', borderRadius: 12, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#6b7280', outline: 'none' }}
              />
              <svg style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ width: 40, height: 40, border: '1px solid rgba(175,135,130,0.2)', padding: 1 }}>
              <img src={userAvatar} alt="User" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </header>

        <main className="pt-24 px-10 pb-16">
          {/* Page header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 48, color: '#e5e2e1', letterSpacing: '-0.96px' }}>
                Industry Masters
              </h1>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 8, lineHeight: '25.6px' }}>
                Manage the definitive catalog of visionary directors shaping the global cinematic landscape.
              </p>
            </div>
            <button
              className="flex items-center gap-2 rounded"
              style={{ padding: '16px 40px', backgroundColor: '#e50914', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6', boxShadow: '0 10px 15px -3px rgba(229,9,20,0.2)' }}
            >
              <span>+</span>
              <span>Add Director</span>
            </button>
          </div>

          {/* Directors grid */}
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {directors.map((d) => (
              <div
                key={d.id}
                className="rounded-lg overflow-hidden flex flex-col"
                style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                {/* Image */}
                <div className="relative" style={{ height: 320 }}>
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover" style={{ filter: 'saturate(0)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #131313, rgba(19,19,19,0) 50%)', opacity: 0.6 }} />

                  {d.featured && (
                    <div className="absolute top-3 left-4" style={{ padding: '2px 8px', backgroundColor: 'rgba(229,9,20,0.9)', borderRadius: 2 }}>
                      <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 12, color: '#fff7f6', textTransform: 'uppercase' }}>FEATURED</span>
                    </div>
                  )}

                  {/* Edit/Delete buttons */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    <button style={{ width: 23, height: 23, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(19,19,19,0.6)', border: 'none', borderRadius: 4, cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M10.5 2.5L12.5 4.5L5 12H3V10L10.5 2.5Z" stroke="#e5e2e1" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                    </button>
                    <button style={{ width: 23, height: 23, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(19,19,19,0.6)', border: 'none', borderRadius: 4, cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
                      <svg width="13" height="15" viewBox="0 0 13 15" fill="none"><path d="M1 3.5H12M4.5 3.5V2H8.5V3.5M5.5 6.5V11.5M7.5 6.5V11.5M2 3.5L2.5 13H10.5L11 3.5" stroke="#e5e2e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-baseline justify-between">
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1' }}>{d.name}</span>
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>{d.year}</span>
                  </div>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', letterSpacing: '1.6px', textTransform: 'uppercase' }}>{d.nationality}</p>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#b7b5b4', lineHeight: '25.6px', flex: 1 }}>{d.bio}</p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(175,135,130,0.1)' }}>
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#c8c6c5' }}>{d.films} Films Directed</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e50914' }}>View Portfolio</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add new card */}
            <div
              className="rounded-lg flex flex-col items-center justify-center gap-6 cursor-pointer"
              style={{ backgroundColor: '#201f1f', border: '2px dashed rgba(175,135,130,0.2)', minHeight: 500, padding: '40px 20px' }}
            >
              <div className="flex items-center justify-center rounded-xl" style={{ width: 64, height: 64, backgroundColor: '#353534' }}>
                <svg width="30" height="22" viewBox="0 0 30 22" fill="none"><path d="M15 1V21M1 11H29" stroke="#c8c6c5" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1', textAlign: 'center' }}>Expand Catalog</p>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', textAlign: 'center', lineHeight: '25.6px' }}>
                Add a new visionary to<br />the CineStream directory.
              </p>
              <button style={{ padding: '9px 41px', border: '1px solid #e50914', borderRadius: 4, backgroundColor: 'transparent', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#e50914' }}>
                Quick Add
              </button>
            </div>
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between mt-16 pt-10" style={{ borderTop: '1px solid rgba(175,135,130,0.1)' }}>
            <div className="flex items-center gap-10">
              <div>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1' }}>142</p>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#c8c6c5', textTransform: 'uppercase', letterSpacing: '0.7px' }}>TOTAL DIRECTORS</p>
              </div>
              <div style={{ width: 1, height: 40, backgroundColor: 'rgba(175,135,130,0.2)' }} />
              <div>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#e5e2e1' }}>28</p>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#c8c6c5', textTransform: 'uppercase', letterSpacing: '0.7px' }}>NATIONALITIES</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2a2a2a', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M7 1L1 6L7 11" stroke="#c8c6c5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#e5e2e1', padding: '0 16px' }}>Page 1 of 12</span>
              <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2a2a2a', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1L7 6L1 11" stroke="#c8c6c5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
