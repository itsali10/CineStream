# CineStream

A full-stack movie streaming management platform built with React + TypeScript on the frontend and ASP.NET Core (.NET 10) on the backend, backed by PostgreSQL.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios (with request/response interceptors) |
| Backend | ASP.NET Core (.NET 10), C# |
| ORM | Entity Framework Core + Npgsql |
| Database | PostgreSQL |
| Auth | JWT Bearer tokens + HttpOnly cookies |

---

## Features

### Authentication
- **Register** — create an account with username, email, and password
- **Login** — authenticate with email and password
- **JWT tokens** issued on login/register, stored in both `localStorage` (for user state) and an `HttpOnly` cookie (`auth_token`) for secure automatic credential passing
- **Logout** — clears the HttpOnly cookie server-side and wipes local state
- Protected routes redirect unauthenticated users to `/login`

### Movie Catalog
- **Browse all movies** — paginated grid with thumbnail, title, genre, year, rating, and duration
- **Search** movies by title in real time
- **Filter** by genre using pill buttons
- **Movie details** — full detail page with director info, description, and all metadata
- **Add to Watchlist** directly from the movie detail page
- **Create movie** (Admin) — form with title, description, genre, director (dropdown), release year, duration, rating, and thumbnail URL
- **Edit movie** (Admin) — pre-populated form, updates in place
- **Delete movie** (Admin) — confirmation prompt before deletion

### Director Management
- **Browse all directors** — card grid with name, nationality, and birth year
- **Create director** (Admin) — form with name, nationality, and birth year
- **Edit director** (Admin) — pre-populated edit form
- **Delete director** (Admin) — confirmation prompt before deletion

### Personal Watchlist
- **View your watchlist** — all movies you have saved, with poster, metadata, and watch status
- **Toggle watched/unwatched** status per entry
- **Remove** a movie from your watchlist
- Watchlist is scoped to the logged-in user

### User Profile
- **Profile tab** — update your display name and email address
- **Security tab** — placeholder for future password change support
- **Preferences tab** — UI toggles for notifications, autoplay, and public profile visibility

### Admin — User Management
- **View all users** — searchable, filterable table with username, email, role, and join date
- **Stats cards** — total users, admin count, and regular user count
- **Edit role** — promote or demote any user between `User` and `Admin` via a modal
- **Delete user** — remove an account with a confirmation prompt
- Accessible only to users with the `Admin` role

---

## Project Structure

```
Web Project/
├── backend/                    # ASP.NET Core API
│   ├── application/
│   │   ├── DTOs/               # Request/response data transfer objects
│   │   └── Interfaces/         # Service contracts
│   ├── domain/
│   │   └── Entities/           # EF Core entity models
│   ├── infrastructure/
│   │   ├── Persistence/        # AppDbContext, migrations
│   │   └── Services/           # Service implementations
│   ├── presentation/
│   │   └── Controllers/        # API controllers
│   ├── appsettings.json        # Configuration (connection string, JWT)
│   └── Program.cs              # App bootstrap and DI setup
│
└── frontend/                   # React + TypeScript SPA
    └── src/
        ├── components/         # Shared UI components (Sidebar)
        ├── context/            # AuthContext (global auth state)
        ├── pages/              # Route-level page components
        ├── services/           # Axios service files per resource
        ├── types/              # TypeScript interfaces
        ├── App.tsx             # Router and route definitions
        └── main.tsx            # React entry point
```

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Login and receive JWT |
| POST | `/api/auth/register` | Public | Register a new account |
| POST | `/api/auth/logout` | Public | Clear auth cookie |
| GET | `/api/users` | Admin | List all users |
| GET | `/api/users/:id` | Auth | Get user by ID |
| PUT | `/api/users/:id` | Auth | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user |
| GET | `/api/movies` | Auth | List all movies |
| GET | `/api/movies/:id` | Auth | Get movie by ID |
| POST | `/api/movies` | Admin | Create movie |
| PUT | `/api/movies/:id` | Admin | Update movie |
| DELETE | `/api/movies/:id` | Admin | Delete movie |
| GET | `/api/directors` | Auth | List all directors |
| GET | `/api/directors/:id` | Auth | Get director by ID |
| POST | `/api/directors` | Admin | Create director |
| PUT | `/api/directors/:id` | Admin | Update director |
| DELETE | `/api/directors/:id` | Admin | Delete director |
| GET | `/api/watchlists` | Auth | List all watchlist entries |
| GET | `/api/watchlists/user/:userId` | Auth | Get watchlist for a user |
| POST | `/api/watchlists` | Auth | Add movie to watchlist |
| PUT | `/api/watchlists/:id` | Auth | Update watched status |
| DELETE | `/api/watchlists/:id` | Auth | Remove from watchlist |

---

## Frontend Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home — stats dashboard | Auth |
| `/login` | Login / Register | Public |
| `/movies` | Movie catalog | Auth |
| `/movies/new` | Create movie form | Admin |
| `/movies/:id` | Movie detail | Auth |
| `/movies/:id/edit` | Edit movie form | Admin |
| `/directors` | Director catalog | Auth |
| `/watchlist` | Personal watchlist | Auth |
| `/profile` | Profile settings | Auth |
| `/admin/users` | User management | Admin |

---

## Running the Project

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- PostgreSQL running locally

### Backend

1. Set the connection string and JWT config in `backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=moviedb;Username=postgres;Password=yourpassword"
  },
  "Jwt": {
    "Key": "your-secret-key-at-least-32-characters",
    "Issuer": "MovieStreamingAPI",
    "Audience": "MovieStreamingClient"
  }
}
```

2. Apply database migrations and start the server:

```bash
cd backend
dotnet ef database update
dotnet run
```

The API runs on `http://localhost:5202`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

---

## Authentication Notes

- The backend issues a JWT token in both the response body and an `HttpOnly` cookie (`auth_token`).
- The frontend stores the token and user info in `localStorage` for React state hydration.
- Every Axios request attaches the token via `Authorization: Bearer` header as a fallback.
- The backend reads the cookie first (`OnMessageReceived`), then falls back to the header — so either path works.
- For local development, cookies use `SameSite=None; Secure=false` to allow cross-origin requests between ports 5173 and 5202.
