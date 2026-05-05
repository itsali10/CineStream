# API Endpoints

Base URLs:

- http://localhost:5202
- https://localhost:7109

Swagger/OpenAPI:

- Swagger UI: `/swagger`
- OpenAPI JSON: `/swagger/v1/swagger.json`

Authentication:

- Most endpoints require JWT bearer authentication.
- Add header: `Authorization: Bearer <token>`.
- In Swagger, click **Authorize** and paste only the token value.
- `POST /api/auth/register` and `POST /api/auth/login` are anonymous.

## Auth

- POST `/api/auth/register`
  - Access: Anonymous
  - Description: Register a new user account and return JWT on success.
- POST `/api/auth/login`
  - Access: Anonymous
  - Description: Authenticate credentials and return JWT on success.

## Users

- GET `/api/users`
  - Access: Authenticated
  - Description: Get all users.
- GET `/api/users/{id}`
  - Access: Authenticated
  - Description: Get user by ID.
- POST `/api/users`
  - Access: Admin
  - Description: Create user.
- PUT `/api/users/{id}`
  - Access: Admin
  - Description: Update user.
- DELETE `/api/users/{id}`
  - Access: Admin
  - Description: Delete user.

## User Profiles

- GET `/api/userprofiles`
  - Access: Authenticated
  - Description: Get all user profiles.
- GET `/api/userprofiles/{id}`
  - Access: Authenticated
  - Description: Get user profile by ID.
- POST `/api/userprofiles`
  - Access: Admin
  - Description: Create user profile.
- PUT `/api/userprofiles/{id}`
  - Access: Admin
  - Description: Update user profile.
- DELETE `/api/userprofiles/{id}`
  - Access: Admin
  - Description: Delete user profile.

## Directors

- GET `/api/directors`
  - Access: Authenticated
  - Description: Get all directors.
- GET `/api/directors/{id}`
  - Access: Authenticated
  - Description: Get director by ID.
- POST `/api/directors`
  - Access: Admin
  - Description: Create director.
- PUT `/api/directors/{id}`
  - Access: Admin
  - Description: Update director.
- DELETE `/api/directors/{id}`
  - Access: Admin
  - Description: Delete director.

## Movies

- GET `/api/movies`
  - Access: Authenticated
  - Description: Get all movies.
- GET `/api/movies/{id}`
  - Access: Authenticated
  - Description: Get movie by ID.
- POST `/api/movies`
  - Access: Admin
  - Description: Create movie.
- PUT `/api/movies/{id}`
  - Access: Admin
  - Description: Update movie.
- DELETE `/api/movies/{id}`
  - Access: Admin
  - Description: Delete movie.

## Watchlists

- GET `/api/watchlists`
  - Access: Authenticated
  - Description: Get all watchlists.
- GET `/api/watchlists/{id}`
  - Access: Authenticated
  - Description: Get watchlist by ID.
- GET `/api/watchlists/user/{userId}`
  - Access: Authenticated
  - Description: Get watchlists for a user.
- POST `/api/watchlists`
  - Access: Admin
  - Description: Create watchlist.
- PUT `/api/watchlists/{id}`
  - Access: Admin
  - Description: Update watchlist.
- DELETE `/api/watchlists/{id}`
  - Access: Admin
  - Description: Delete watchlist.

## Utility Endpoints

- GET `/health/db`
  - Access: Anonymous
  - Description: Checks database connectivity.
- GET `/weatherforecast`
  - Access: Anonymous
  - Description: Template sample endpoint.
