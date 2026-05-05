import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const bgHero = 'https://www.figma.com/api/mcp/asset/7f0ec4ff-bf03-48ca-a1fa-b6aa15259d54'
const iconEmail = 'https://www.figma.com/api/mcp/asset/552a5879-8922-46be-9397-72b87411a794'
const iconLock = 'https://www.figma.com/api/mcp/asset/c19ed2c1-afc4-4fc1-abb1-69a12a11276c'
const iconGoogle = 'https://www.figma.com/api/mcp/asset/4106edf3-420e-4860-9d51-bc594d50b4af'
const iconArrow = 'https://www.figma.com/api/mcp/asset/98d9e3ac-f96b-4afd-a34d-1b658da436d9'
const iconApple = 'https://www.figma.com/api/mcp/asset/e4d474f5-702e-4015-890c-9a4031cb3cdd'
const iconTV = 'https://www.figma.com/api/mcp/asset/52127982-3615-4628-b2c3-2d3c294977fa'
const iconGlobe = 'https://www.figma.com/api/mcp/asset/5e6f2a0f-24ef-4dea-a4c5-0f8b10487213'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (activeTab === 'login') {
        const res = await authService.login({ email, passwordHash: password })
        login(res.token, {
          id: res.userId ?? 0,
          username: res.username ?? '',
          email: res.email ?? email,
          role: res.role ?? 'User',
        })
      } else {
        const res = await authService.register({ username, email, passwordHash: password })
        login(res.token, {
          id: res.userId ?? 0,
          username: res.username ?? username,
          email: res.email ?? email,
          role: res.role ?? 'User',
        })
      }
      navigate('/')
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setError(message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '18px 16px 18px 48px',
    backgroundColor: '#0e0e0e',
    border: '1px solid rgba(94,63,59,0.3)',
    borderRadius: 4,
    fontFamily: "'Be Vietnam Pro', sans-serif",
    fontSize: 16,
    color: '#e5e2e1',
    outline: 'none',
  }

  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Background hero image */}
      <div className="absolute inset-0">
        <img src={bgHero} alt="" className="w-full h-full object-cover" style={{ transform: 'scale(1.25)', transformOrigin: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(15,15,15,0.95) 30%, rgba(15,15,15,0.4))' }} />
      </div>

      {/* Right side decorative quote */}
      <div className="absolute right-0 top-0 h-full flex items-center justify-end pr-16 pointer-events-none" style={{ width: '35%' }}>
        <div className="flex flex-col items-end gap-4 max-w-md">
          <span style={{ fontSize: 48, color: 'rgba(229,226,225,0.5)', fontWeight: 900, lineHeight: 1.2 }}>❝</span>
          <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 48, color: 'rgba(229,226,225,0.4)', textAlign: 'right', letterSpacing: '-0.96px', lineHeight: '60px' }}>
            "Experience<br />stories like never<br />before."
          </p>
          <div style={{ width: 96, height: 4, backgroundColor: 'rgba(229,9,20,0.3)' }} />
        </div>
      </div>

      {/* Main auth area */}
      <div className="relative z-10 flex flex-col gap-10 px-16" style={{ maxWidth: 544 }}>
        {/* Brand */}
        <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 900, fontSize: 32, color: '#e50914', letterSpacing: '-1.6px', textTransform: 'uppercase' }}>
          CINESTREAM
        </p>

        {/* Auth card */}
        <div
          className="flex flex-col gap-8 rounded-lg"
          style={{
            padding: '48px 40px 40px',
            backgroundColor: 'rgba(26,26,26,0.8)',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          }}
        >
          {/* Header */}
          <div>
            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 32, color: '#e5e2e1', letterSpacing: '-0.32px' }}>
              Unlimited entertainment.
            </p>
            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 400, fontSize: 16, color: '#c8c6c5', marginTop: 4 }}>
              Join the elite streaming community today.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #353534' }}>
            <div className="flex gap-6">
              {(['login', 'register'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setError('') }}
                  className="pb-4"
                  style={{
                    border: 'none',
                    background: 'none',
                    borderBottom: activeTab === tab ? '2px solid #e50914' : '2px solid transparent',
                    marginBottom: -1,
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: '0.7px',
                    color: activeTab === tab ? '#e5e2e1' : '#c8c6c5',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {tab === 'login' ? 'Login' : 'Register'}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username (register only) */}
            {activeTab === 'register' && (
              <div className="flex flex-col gap-1">
                <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>
                  Username
                </label>
                <div className="relative">
                  <div className="absolute" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="7" r="4" stroke="#6b7280" strokeWidth="1.5"/>
                      <path d="M2 18C2 14.134 5.686 11 10 11C14.314 11 18 14.134 18 18" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="your_username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>
                Email
              </label>
              <div className="relative">
                <div className="absolute" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }}>
                  <img src={iconEmail} alt="" style={{ width: 20, height: 16 }} />
                </div>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 14, color: '#c8c6c5', letterSpacing: '0.7px' }}>
                  Password
                </label>
                {activeTab === 'login' && (
                  <button type="button" style={{ background: 'none', border: 'none', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#e50914', cursor: 'pointer' }}>
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute" style={{ left: 16, top: '50%', transform: 'translateY(-50%)' }}>
                  <img src={iconLock} alt="" style={{ width: 16, height: 21 }} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div style={{ padding: '12px 16px', backgroundColor: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 4 }}>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#e50914' }}>{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded"
              style={{ height: 63, backgroundColor: loading ? '#a00610' : '#e50914', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 24, color: '#fff7f6' }}>
                {loading ? 'Please wait…' : activeTab === 'login' ? 'Login' : 'Register'}
              </span>
              {!loading && <img src={iconArrow} alt="" style={{ width: 16, height: 16 }} />}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(94,63,59,0.2)' }} />
              </div>
              <span
                className="relative px-4"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#c8c6c5', backgroundColor: 'rgba(26,26,26,0.8)', textTransform: 'uppercase' }}
              >
                OR CONTINUE WITH
              </span>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded"
                style={{ padding: '17px', backgroundColor: '#2a2a2a', border: '1px solid rgba(94,63,59,0.2)', cursor: 'pointer' }}
              >
                <img src={iconGoogle} alt="" style={{ width: 20, height: 20 }} />
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1' }}>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded"
                style={{ padding: '17px', backgroundColor: '#2a2a2a', border: '1px solid rgba(94,63,59,0.2)', cursor: 'pointer' }}
              >
                <img src={iconApple} alt="" style={{ width: 16, height: 10 }} />
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1' }}>Apple</span>
              </button>
            </div>
          </form>

          {/* Legal */}
          <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5', textAlign: 'center', lineHeight: '22px' }}>
            By signing in, you agree to our{' '}
            <span style={{ color: '#e5e2e1', cursor: 'pointer' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: '#e5e2e1', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        </div>

        {/* Promo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={iconTV} alt="" style={{ width: 22, height: 21 }} />
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>4K Ultra HD Streaming</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={iconGlobe} alt="" style={{ width: 20, height: 16 }} />
            <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>Watch Everywhere</span>
          </div>
        </div>
      </div>
    </div>
  )
}
