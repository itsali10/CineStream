import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const userAvatar = 'https://www.figma.com/api/mcp/asset/c287fd8a-2d65-46f0-adb9-5bb0894f652d'

export default function ProfilePage() {
  const [name, setName] = useState('Alex Johnson')
  const [email, setEmail] = useState('alex.johnson@email.com')
  const [bio, setBio] = useState('Movie enthusiast and avid CineStream subscriber. Always looking for the next great film.')
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
      <Sidebar activePath="/profile" />

      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Top navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{ left: 260, right: 0, top: 0, zIndex: 40, backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(6px)' }}
        >
          <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e5e2e1' }}>Profile Management</h1>
          <div className="rounded-xl overflow-hidden" style={{ width: 40, height: 40, border: '2px solid rgba(229,9,20,0.2)', padding: 2 }}>
            <img src={userAvatar} alt="User" className="w-full h-full object-cover rounded-xl" />
          </div>
        </header>

        <main className="pt-24 px-10 pb-16 max-w-4xl">
          {/* Profile header */}
          <div className="flex items-center gap-8 mb-10 p-8 rounded-lg" style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="relative">
              <div className="rounded-full overflow-hidden" style={{ width: 96, height: 96, border: '3px solid rgba(229,9,20,0.3)' }}>
                <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button
                className="absolute bottom-0 right-0 flex items-center justify-center rounded-full"
                style={{ width: 28, height: 28, backgroundColor: '#e50914', border: 'none', cursor: 'pointer' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 28, color: '#e5e2e1' }}>{name}</p>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 4 }}>{email}</p>
              <div className="flex items-center gap-2 mt-3">
                <span style={{ padding: '4px 12px', backgroundColor: 'rgba(229,9,20,0.15)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: '#e50914', fontWeight: 600 }}>PRO MEMBER</span>
                <span style={{ padding: '4px 12px', backgroundColor: '#2a2a2a', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: '#c8c6c5' }}>Since 2023</span>
              </div>
            </div>
            <div className="ml-auto flex gap-8 text-center">
              {[{ value: '47', label: 'Watchlist' }, { value: '128', label: 'Watched' }, { value: '23', label: 'Reviews' }].map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e5e2e1' }}>{s.value}</p>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: '#c8c6c5' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid rgba(94,63,59,0.2)', marginBottom: 32 }}>
            <div className="flex gap-8">
              {(['profile', 'security', 'preferences'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '12px 0',
                    border: 'none',
                    borderBottom: activeTab === tab ? '2px solid #e50914' : '2px solid transparent',
                    marginBottom: -1,
                    background: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: activeTab === tab ? 600 : 400,
                    fontSize: 16,
                    color: activeTab === tab ? '#e5e2e1' : '#c8c6c5',
                    textTransform: 'capitalize',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Profile form */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>DISPLAY NAME</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(94,63,59,0.3)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none' }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>EMAIL ADDRESS</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(94,63,59,0.3)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none' }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>BIO</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  style={{ padding: '16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(94,63,59,0.3)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none', resize: 'vertical' }}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  style={{ padding: '16px 40px', backgroundColor: '#e50914', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6' }}
                >
                  {saved ? '✓ Saved!' : 'Save Changes'}
                </button>
                <button
                  style={{ padding: '16px 40px', backgroundColor: 'transparent', border: '1px solid rgba(175,135,130,0.2)', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 16, color: '#c8c6c5' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="flex flex-col gap-6">
              {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                <div key={label} className="flex flex-col gap-2">
                  <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>{label.toUpperCase()}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={{ padding: '16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(94,63,59,0.3)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none', maxWidth: 480 }}
                  />
                </div>
              ))}
              <button style={{ width: 'fit-content', padding: '16px 40px', backgroundColor: '#e50914', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6' }}>
                Update Password
              </button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="flex flex-col gap-6">
              {[
                { label: 'Email notifications', desc: 'Receive updates about new releases and recommendations' },
                { label: 'Autoplay next episode', desc: 'Automatically play the next episode in a series' },
                { label: 'Public profile', desc: 'Allow others to see your watchlist and reviews' },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between p-6 rounded-lg" style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 16, color: '#e5e2e1' }}>{pref.label}</p>
                    <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5', marginTop: 4 }}>{pref.desc}</p>
                  </div>
                  <div style={{ width: 44, height: 24, backgroundColor: '#e50914', borderRadius: 12, position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                    <div style={{ width: 20, height: 20, backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: 2, right: 2, transition: 'right 0.2s' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
