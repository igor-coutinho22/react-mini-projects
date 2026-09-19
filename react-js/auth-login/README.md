# Auth Login

A simple React authentication app with protected routes, built to practice session handling and navigation on the front end.

## Features
- **Login** page
- Protected **Dashboard** page, only accessible with an active session
- **Logout**
- Authentication state persisted in `localStorage`
- Navigation with **React Router**

*Fake authentication (no backend) — the goal is to demonstrate protected routes and session handling on the front end.*

## Tech stack
- React
- react-router-dom
- Web Storage API (`localStorage`)

## Getting started
```bash
npm install
npm start
```

## Technical details

### Project structure

**`src/index.js`**
- App entry point
- Renders the `<App />` component
- Wraps the app in `<BrowserRouter>` to enable routing

**`src/App.js`**
- Defines the app's routes:
  - `/login` → login page
  - `/dashboard` → protected page
  - `/` → redirects to `/dashboard`
  - `*` → redirects to `/`
- Guards the `/dashboard` route with the `ProtectedRoute` component

**`src/services/auth.js`**
Service layer centralizing the authentication logic:
- `isAuthenticated()` → checks `localStorage` for an active session
- `login(email, password)` → fakes authentication and stores it in `localStorage`
- `logout()` → clears the session from `localStorage`
- `getUserEmail()` → returns the stored email for display on the dashboard

**`src/components/ProtectedRoute.jsx`**
- Gatekeeper for private routes
- Renders its children if authenticated, otherwise redirects to `/login`

**`src/pages/Login.jsx`**
- Controlled form (`useState`) for email and password
- Submitting calls the `login()` service
- On success: navigates to `/dashboard`
- On failure: shows an error message

**`src/pages/Dashboard.jsx`**
- Private page
- Shows a welcome message (with the email, if available)
- Logout button: calls `logout()` and redirects to `/login`

### Execution flow
1. The app starts in `index.js` and mounts the Router.
2. Visiting `/dashboard` goes through `ProtectedRoute`.
3. If `auth=true` isn't set in `localStorage`, the user is sent to `/login`.
4. On `/login`, submitting email + password stores `auth=true` and `userEmail=...`.
5. The user is redirected to `/dashboard`.
6. On the dashboard, clicking **Logout** clears the session and returns to `/login`.
