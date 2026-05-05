import { Link, useLocation } from 'react-router-dom'

const navItems = [
  {
    label: 'Home',
    path: '/',
    icon: (
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
        <path d="M1 6.5L8 1L15 6.5V16C15 16.55 14.55 17 14 17H10V12H6V17H2C1.45 17 1 16.55 1 16V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'Movies',
    path: '/movies',
    icon: (
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <rect x="1" y="1" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 1V15M15 1V15M1 5H5M15 5H19M1 11H5M15 11H19" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: 'TV Shows',
    path: '#',
    icon: (
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
        <rect x="1" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 5L10 1L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'My List',
    path: '/watchlist',
    icon: (
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
        <path d="M1 1H13V17L7 13L1 17V1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Admin Panel',
    path: '/admin/users',
    icon: (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path d="M9 1L1 4.5V9C1 13.5 4.5 17.7 9 19C13.5 17.7 17 13.5 17 9V4.5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

interface SidebarProps {
  activePath?: string
}

export default function Sidebar({ activePath }: SidebarProps) {
  const location = useLocation()
  const currentPath = activePath || location.pathname

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col justify-between py-10"
      style={{ width: 260, backgroundColor: '#201f1f', zIndex: 50 }}
    >
      <div className="px-10">
        <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 900, fontSize: 24, color: '#e50914', letterSpacing: '-0.5px' }}>
          CineStream
        </p>
        <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 500, fontSize: 12, color: '#c8c6c5', marginTop: 2 }}>
          Premium Streaming
        </p>
      </div>

      <nav className="flex-1 mt-6 px-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || (item.path !== '#' && currentPath.startsWith(item.path) && item.path !== '/movies')
          const isMoviesActive = item.label === 'Movies' && (currentPath === '/movies' || currentPath.startsWith('/movies/'))

          return (
            <Link
              key={item.label}
              to={item.path === '#' ? '#' : item.path}
              className="flex items-center gap-4 px-6 py-4 mb-1 rounded"
              style={{
                backgroundColor: isActive || isMoviesActive ? 'rgba(42,42,42,0.5)' : 'transparent',
                borderLeft: isActive || isMoviesActive ? '3px solid #e50914' : '3px solid transparent',
                paddingLeft: isActive || isMoviesActive ? 27 : 24,
                textDecoration: 'none',
              }}
            >
              <span style={{ color: isActive || isMoviesActive ? '#e5e2e1' : '#c8c6c5', display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: isActive || isMoviesActive ? 700 : 400,
                  fontSize: 16,
                  color: isActive || isMoviesActive ? '#e5e2e1' : '#c8c6c5',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="px-10">
        <button
          className="w-full flex items-center justify-center py-4 rounded-lg"
          style={{ backgroundColor: '#e50914', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6', border: 'none', cursor: 'pointer' }}
        >
          Upgrade to Pro
        </button>
      </div>
    </aside>
  )
}
