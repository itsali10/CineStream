import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const userAvatar = 'https://www.figma.com/api/mcp/asset/c287fd8a-2d65-46f0-adb9-5bb0894f652d'

const users = [
  { id: 1, name: 'Alex Johnson', email: 'alex.johnson@email.com', role: 'Admin', plan: 'Pro', joined: 'Jan 12, 2023', status: 'active', avatar: userAvatar },
  { id: 2, name: 'Sarah Williams', email: 'sarah.w@email.com', role: 'Member', plan: 'Pro', joined: 'Mar 5, 2023', status: 'active', avatar: userAvatar },
  { id: 3, name: 'Michael Chen', email: 'm.chen@email.com', role: 'Member', plan: 'Free', joined: 'Jun 18, 2023', status: 'active', avatar: userAvatar },
  { id: 4, name: 'Emma Davis', email: 'emma.d@email.com', role: 'Moderator', plan: 'Pro', joined: 'Sep 3, 2023', status: 'suspended', avatar: userAvatar },
  { id: 5, name: 'James Wilson', email: 'j.wilson@email.com', role: 'Member', plan: 'Free', joined: 'Nov 22, 2023', status: 'active', avatar: userAvatar },
  { id: 6, name: 'Olivia Martinez', email: 'olivia.m@email.com', role: 'Member', plan: 'Pro', joined: 'Feb 14, 2024', status: 'active', avatar: userAvatar },
]

export default function UserManagementPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f0f' }}>
      <Sidebar activePath="/admin/users" />

      <div className="flex-1 flex flex-col" style={{ marginLeft: 260 }}>
        {/* Top navbar */}
        <header
          className="fixed flex items-center justify-between px-10 py-4"
          style={{ left: 260, right: 0, top: 0, zIndex: 40, backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(6px)' }}
        >
          <h1 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 24, color: '#e5e2e1' }}>User Management</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, width: 256, backgroundColor: '#1c1b1b', border: '1px solid rgba(175,135,130,0.2)', borderRadius: 12, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none' }}
              />
            </div>
            <div className="rounded-xl overflow-hidden" style={{ width: 40, height: 40, border: '2px solid rgba(229,9,20,0.2)', padding: 2 }}>
              <img src={userAvatar} alt="User" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </header>

        <main className="pt-24 px-10 pb-16">
          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 48, color: '#e5e2e1', letterSpacing: '-0.96px' }}>All Users</h2>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 8 }}>
                Manage access, roles, and subscriptions across all accounts.
              </p>
            </div>
            <button
              style={{ padding: '16px 40px', backgroundColor: '#e50914', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff7f6', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span>+</span>
              <span>Invite User</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Total Users', value: users.length.toString(), color: '#e5e2e1' },
              { label: 'Pro Members', value: users.filter(u => u.plan === 'Pro').length.toString(), color: '#e50914' },
              { label: 'Active', value: users.filter(u => u.status === 'active').length.toString(), color: '#4ade80' },
              { label: 'Suspended', value: users.filter(u => u.status === 'suspended').length.toString(), color: '#fbbf24' },
            ].map((s) => (
              <div key={s.label} style={{ padding: 24, backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 32, color: s.color }}>{s.value}</p>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5', marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Role filter */}
          <div className="flex gap-2 mb-6">
            {['All', 'Admin', 'Moderator', 'Member'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{
                  padding: '8px 24px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: 16,
                  backgroundColor: roleFilter === r ? '#e50914' : '#2a2a2a',
                  color: roleFilter === r ? '#fff7f6' : '#c8c6c5',
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden' }}>
            {/* Table header */}
            <div
              className="grid items-center px-6 py-4"
              style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr', backgroundColor: '#201f1f', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              {['User', 'Email', 'Role', 'Plan', 'Joined', 'Actions'].map((h) => (
                <span key={h} style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 12, color: '#c8c6c5', letterSpacing: '0.7px', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>

            {/* Table rows */}
            {filtered.map((user, i) => (
              <div
                key={user.id}
                className="grid items-center px-6 py-4"
                style={{
                  gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr',
                  backgroundColor: i % 2 === 0 ? '#131313' : '#161616',
                  borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: 36, height: 36, border: '1px solid rgba(175,135,130,0.2)' }}>
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 15, color: '#e5e2e1' }}>{user.name}</span>
                </div>
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>{user.email}</span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 4,
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: user.role === 'Admin' ? 'rgba(229,9,20,0.15)' : user.role === 'Moderator' ? 'rgba(251,191,36,0.15)' : '#2a2a2a',
                    color: user.role === 'Admin' ? '#e50914' : user.role === 'Moderator' ? '#fbbf24' : '#c8c6c5',
                    width: 'fit-content',
                  }}
                >
                  {user.role}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 4,
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: user.plan === 'Pro' ? 'rgba(229,9,20,0.1)' : '#2a2a2a',
                    color: user.plan === 'Pro' ? '#e50914' : '#c8c6c5',
                    width: 'fit-content',
                  }}
                >
                  {user.plan}
                </span>
                <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>{user.joined}</span>
                <div className="flex items-center gap-2">
                  <button style={{ padding: '6px 12px', backgroundColor: '#2a2a2a', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: '#e5e2e1' }}>Edit</button>
                  <button style={{ padding: '6px 12px', backgroundColor: user.status === 'suspended' ? 'rgba(74,222,128,0.15)' : 'rgba(229,9,20,0.15)', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: user.status === 'suspended' ? '#4ade80' : '#e50914' }}>
                    {user.status === 'suspended' ? 'Restore' : 'Suspend'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>
              Showing {filtered.length} of {users.length} users
            </p>
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
