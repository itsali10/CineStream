import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { usersService } from '../services/usersService'
import type { User } from '../types'

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editRole, setEditRole] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const [editMsg, setEditMsg] = useState('')

  useEffect(() => {
    usersService
      .getAll()
      .then(setUsers)
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: number, username: string) => {
    if (!confirm(`Delete user "${username}"?`)) return
    try {
      await usersService.delete(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch {
      alert('Failed to delete user.')
    }
  }

  const handleEditSubmit = async () => {
    if (!editingUser) return
    setEditLoading(true)
    setEditMsg('')
    try {
      const updated = await usersService.update(editingUser.id, { username: editingUser.username, email: editingUser.email, role: editRole })
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
      setEditMsg('User updated!')
      setTimeout(() => { setEditingUser(null); setEditMsg('') }, 1200)
    } catch {
      setEditMsg('Failed to update user.')
    } finally {
      setEditLoading(false)
    }
  }

  const roles = ['All', ...Array.from(new Set(users.map((u) => u.role)))]

  const filtered = users.filter((u) => {
    const matchSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
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
          </div>
        </header>

        <main className="pt-24 px-10 pb-16">
          {/* Header */}
          <div className="mb-10">
            <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 48, color: '#e5e2e1', letterSpacing: '-0.96px' }}>All Users</h2>
            <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5', marginTop: 8 }}>
              Manage access, roles, and accounts.
            </p>
          </div>

          {/* Stats */}
          {!loading && !error && (
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Total Users', value: users.length, color: '#e5e2e1' },
                { label: 'Admins', value: users.filter((u) => u.role === 'Admin').length, color: '#e50914' },
                { label: 'Regular Users', value: users.filter((u) => u.role !== 'Admin').length, color: '#4ade80' },
              ].map((s) => (
                <div key={s.label} style={{ padding: 24, backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 32, color: s.color }}>{s.value}</p>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5', marginTop: 4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Role filter */}
          <div className="flex gap-2 mb-6">
            {roles.map((r) => (
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

          {/* Loading */}
          {loading && (
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, border: '3px solid rgba(229,9,20,0.3)', borderTopColor: '#e50914', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div style={{ padding: '24px', backgroundColor: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e50914' }}>{error}</p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden' }}>
              {/* Table header */}
              <div
                className="grid items-center px-6 py-4"
                style={{ gridTemplateColumns: '2fr 2fr 1fr 1.5fr 1.5fr', backgroundColor: '#201f1f', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                {['User', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                  <span key={h} style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 12, color: '#c8c6c5', letterSpacing: '0.7px', textTransform: 'uppercase' }}>{h}</span>
                ))}
              </div>

              {/* Table rows */}
              {filtered.map((u, i) => (
                <div
                  key={u.id}
                  className="grid items-center px-6 py-4"
                  style={{
                    gridTemplateColumns: '2fr 2fr 1fr 1.5fr 1.5fr',
                    backgroundColor: i % 2 === 0 ? '#131313' : '#161616',
                    borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#e50914', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff' }}>
                        {u.username[0]?.toUpperCase()}
                      </span>
                    </div>
                    <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 15, color: '#e5e2e1' }}>{u.username}</span>
                  </div>
                  <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>{u.email}</span>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 4,
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      backgroundColor: u.role === 'Admin' ? 'rgba(229,9,20,0.15)' : '#2a2a2a',
                      color: u.role === 'Admin' ? '#e50914' : '#c8c6c5',
                      width: 'fit-content',
                    }}
                  >
                    {u.role}
                  </span>
                  <span style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingUser(u); setEditRole(u.role) }}
                      style={{ padding: '6px 12px', backgroundColor: '#2a2a2a', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: '#e5e2e1' }}
                    >
                      Edit Role
                    </button>
                    <button
                      onClick={() => handleDelete(u.id, u.username)}
                      style={{ padding: '6px 12px', backgroundColor: 'rgba(229,9,20,0.15)', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 12, color: '#e50914' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#c8c6c5' }}>No users found.</p>
                </div>
              )}
            </div>
          )}

          {/* Pagination info */}
          {!loading && !error && (
            <div className="mt-6">
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: '#c8c6c5' }}>
                Showing {filtered.length} of {users.length} users
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Edit Role Modal */}
      {editingUser && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 100, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setEditingUser(null)}
        >
          <div
            className="rounded-lg p-8 flex flex-col gap-6"
            style={{ backgroundColor: '#201f1f', border: '1px solid rgba(255,255,255,0.1)', minWidth: 380 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 22, color: '#e5e2e1' }}>
              Edit User: {editingUser.username}
            </h3>
            <div className="flex flex-col gap-2">
              <label style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 13, color: '#c8c6c5', letterSpacing: '0.7px' }}>ROLE</label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                style={{ padding: '14px 16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(94,63,59,0.3)', borderRadius: 4, fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 16, color: '#e5e2e1', outline: 'none', cursor: 'pointer' }}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            {editMsg && (
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: editMsg.includes('Failed') ? '#e50914' : '#4ade80' }}>{editMsg}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleEditSubmit}
                disabled={editLoading}
                style={{ flex: 1, padding: '14px', backgroundColor: editLoading ? '#a00610' : '#e50914', border: 'none', borderRadius: 6, cursor: editLoading ? 'not-allowed' : 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}
              >
                {editLoading ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={() => setEditingUser(null)}
                style={{ flex: 1, padding: '14px', backgroundColor: 'transparent', border: '1px solid rgba(175,135,130,0.2)', borderRadius: 6, cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: 16, color: '#c8c6c5' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
