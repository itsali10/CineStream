import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { usersService } from '../services/usersService'

export default function ProfilePage() {
  const { user, login, token } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile')

  const [username, setUsername] = useState(user?.username ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveError, setSaveError] = useState('')

  const handleSaveProfile = async () => {
    if (!user) return
    setSaving(true)
    setSaveMsg('')
    setSaveError('')
    try {
      const updated = await usersService.update(user.id, { username, email, role: user.role })
      login(token!, { ...user, username: updated.username, email: updated.email })
      setSaveMsg('Profile updated successfully!')
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setSaveError(message || 'Failed to save changes.')
    } finally {
      setSaving(false)
      setTimeout(() => { setSaveMsg(''); setSaveError('') }, 3000)
    }
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
          <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e50914', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>
              {user?.username?.[0]?.toUpperCase() ?? 'U'}
            </span>
          </div>
        </header>

        <main className="pt-24 px-10 pb-16" style={{ maxWidth: 860 }}>
          {/* Profile header */}
          <div className="flex items-center gap-8 mb-10 p-8 rounded-lg" style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', backgroundColor: '#e50914', border: '3px solid rgba(229,9,20,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 900, fontSize: 40, color: '#fff' }}>
                {user?.username?.[0]?.toUpperCase() ?? 'U'}
              </span>
            </div>
            <div>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 28, color: '#e5e2e1' }}>{user?.username}</p>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 4 }}>{user?.email}</p>
              <div className="flex items-center gap-2 mt-3">
                <span style={{ padding: '4px 12px', backgroundColor: user?.role === 'Admin' ? 'rgba(229,9,20,0.15)' : '#2a2a2a', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: user?.role === 'Admin' ? '#e50914' : '#c8c6c5', fontWeight: 600 }}>
                  {user?.role?.toUpperCase()}
                </span>
              </div>
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
              {saveMsg && (
                <div style={{ padding: '12px 16px', backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 6 }}>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#4ade80' }}>{saveMsg}</p>
                </div>
              )}
              {saveError && (
                <div style={{ padding: '12px 16px', backgroundColor: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 6 }}>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#e50914' }}>{saveError}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>DISPLAY NAME</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(94,63,59,0.3)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none' }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(94,63,59,0.3)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none' }}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  style={{ padding: '16px 40px', backgroundColor: saving ? '#a00610' : '#e50914', border: 'none', borderRadius: 4, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6' }}
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  onClick={() => { setUsername(user?.username ?? ''); setEmail(user?.email ?? '') }}
                  style={{ padding: '16px 40px', backgroundColor: 'transparent', border: '1px solid rgba(175,135,130,0.2)', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 16, color: '#c8c6c5' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="flex flex-col gap-6">
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>
                Password changes are not supported via this interface. Please contact your administrator.
              </p>
              {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                <div key={label} className="flex flex-col gap-2">
                  <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>{label.toUpperCase()}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    disabled
                    style={{ padding: '16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(94,63,59,0.2)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#6b7280', outline: 'none', maxWidth: 480, opacity: 0.5 }}
                  />
                </div>
              ))}
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
                    <div style={{ width: 20, height: 20, backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: 2, right: 2 }} />
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
