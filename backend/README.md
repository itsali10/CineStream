# MovieStreamingAPI

ASP.NET Core Web API for managing users, user profiles, directors, movies, watchlists, and JWT-based authentication.

## Submission Checklist

- Complete source code: available in this repository.
- Database migrations: available in the `Migrations/` folder.
- README with run instructions: this file.
- Technologies list with short descriptions: see "Technologies Used".
- HTTP-only cookies security explanation: see "Why HTTP-only Cookies Are Industry Standard".
- API endpoint documentation: see `docs/API_ENDPOINTS.md` and Swagger UI.
- Working endpoint evidence: place screenshots in `docs/screenshots/` using the checklist in `docs/screenshots/README.md`.

## Technologies Used

- .NET 10 (ASP.NET Core Web API): web framework for building REST APIs.
- C#: primary programming language.
- Entity Framework Core 10 (Design package): ORM for data access and migrations.
- Npgsql EF Core Provider: PostgreSQL database provider for EF Core.
- PostgreSQL: relational database used by the project.
- JWT Bearer Authentication: stateless token-based authentication and authorization.
- Swashbuckle.AspNetCore (Swagger/OpenAPI): API documentation and interactive testing UI.
- Data Annotations: request validation for DTOs.
- dotnet-ef local tool: CLI tooling for migration creation and database updates.
- Postman Collection: API request collection for endpoint testing (`MovieStreamingAPI.postman_collection.json`).

## Prerequisites

- .NET SDK 10.x
- PostgreSQL running locally (or reachable remotely)
- Optional: Postman

## Configuration

1. Open `appsettings.json`.
2. Update `ConnectionStrings:DefaultConnection` for your PostgreSQL server.
3. Update `Jwt` settings (`Key`, `Issuer`, `Audience`, `ExpiryMinutes`) as needed.

## How To Run

1. Restore dependencies:

```bash
dotnet restore .\MovieStreamingAPI.csproj
```

2. Ensure database schema is up to date:

```bash
Push-Location .\infrastructure
dotnet tool restore
dotnet tool run dotnet-ef database update --project ..\MovieStreamingAPI.csproj --startup-project ..\MovieStreamingAPI.csproj
Pop-Location
```

3. Start the API:

```bash
dotnet run --project .\MovieStreamingAPI.csproj
```

4. Open Swagger UI:

- http://localhost:5202/swagger
- https://localhost:7109/swagger

## Authentication Quick Start

1. Call `POST /api/auth/register` to create an account.
2. Call `POST /api/auth/login` to receive a JWT token.
3. In Swagger, click **Authorize** and paste the token value.
4. Test secured endpoints (`/api/users`, `/api/movies`, etc.).

## Suggested End-to-End API Test Flow (In Order)

Use this sequence to test most APIs with minimal errors due to missing related IDs.

1. Start the API with explicit project selection:

```bash
dotnet run --project .\MovieStreamingAPI.csproj
```

2. Verify service and DB connectivity:
	- `GET /health/db` should return `200` with `{ "database": "up" }`.

3. Register an admin account:
	- `POST /api/auth/register`
	- Example body:

```json
{
  "username": "admin1",
  "email": "admin1@example.com",
  "passwordHash": "Admin123!",
  "role": "Admin"
}
```

4. Login and capture token:
	- `POST /api/auth/login`
	- Save `token` from response.

5. Authorize requests:
	- Swagger: click **Authorize** and paste token only.
	- Postman: set `Authorization: Bearer <token>`.

6. Create foundational data in dependency order:
	- `POST /api/users` (Admin only): create a normal user and store `userId`.
	- `POST /api/directors` (Admin only): create a director and store `directorId`.
	- `POST /api/movies` (Admin only): create a movie using `directorId`, store `movieId`.
	- `POST /api/userprofiles` (Admin only): create profile using `userId`.
	- `POST /api/watchlists` (Admin only): create watchlist using `userId` + `movieId`.

7. Verify read endpoints (Authenticated):
	- `GET /api/users`
	- `GET /api/directors`
	- `GET /api/movies`
	- `GET /api/userprofiles`
	- `GET /api/watchlists`
	- `GET /api/watchlists/user/{userId}`

8. Verify update/delete behavior (Admin):
	- `PUT /api/movies/{id}` then `GET /api/movies/{id}` to confirm update.
	- `PUT /api/watchlists/{id}` to toggle `isWatched`.
	- `DELETE /api/watchlists/{id}` and confirm with `GET` returning not found or missing list item.

9. Verify authorization rules:
	- Call an Admin endpoint without token -> expect `401`.
	- Call an Admin endpoint with non-admin token -> expect `403`.

10. Capture evidence screenshots in this order:
	- Swagger UI opened.
	- Register/Login success.
	- Protected GET success.
	- Admin POST/PUT/DELETE success.
	- `/health/db` success.

Tip: the provided collection `MovieStreamingAPI.postman_collection.json` is already structured to support this flow.

## Database Migrations

Migrations are already included in `Migrations/`.

To create a new migration:

```bash
Push-Location .\infrastructure
dotnet tool run dotnet-ef migrations add <MigrationName> --project ..\MovieStreamingAPI.csproj --startup-project ..\MovieStreamingAPI.csproj
Pop-Location
```

To apply migrations:

```bash
Push-Location .\infrastructure
dotnet tool run dotnet-ef database update --project ..\MovieStreamingAPI.csproj --startup-project ..\MovieStreamingAPI.csproj
Pop-Location
```

## API Endpoint Documentation

- Swagger/OpenAPI UI: `/swagger`
- Detailed endpoint list: `docs/API_ENDPOINTS.md`
- Postman collection: `MovieStreamingAPI.postman_collection.json`

## Why HTTP-only Cookies Are Industry Standard

HTTP-only cookies are commonly used in production authentication because they are not readable by JavaScript (`document.cookie`), which significantly reduces token theft risk during XSS incidents. They are also automatically attached by the browser on matching requests, which simplifies session handling. Combined with `Secure` and `SameSite` flags, they provide strong protections against interception and CSRF.

Why this matters compared to local/session storage tokens:

- Local/session storage tokens are directly accessible to JavaScript, so any successful XSS can exfiltrate them.
- HTTP-only cookies reduce this exposure by preventing script-level access.
- In many enterprise systems, refresh tokens are stored in HTTP-only cookies while short-lived access tokens are rotated frequently.

Note: This project currently uses JWT bearer tokens in the `Authorization` header for API access, but the cookie model above is still the common industry baseline for browser-based auth flows.

## Evidence Screenshots

Put Swagger/Postman screenshots in `docs/screenshots/`.

Recommended captures:

1. Swagger UI loaded.
2. Successful register/login response.
3. Authorized call to a protected GET endpoint.
4. Admin-only create/update/delete call.
5. Database health endpoint (`/health/db`) response.

A ready-to-use checklist file exists at `docs/screenshots/README.md`.
