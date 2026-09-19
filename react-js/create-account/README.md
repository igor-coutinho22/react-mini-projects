# Create Account

A simple, standalone React app for user account creation, with input validation and a unique-email check.

## Features
- **Account creation** page
- Input validation
- **Unique email** check
- Users persisted in `localStorage`

*No backend — the goal is to demonstrate user registration logic and validation on the front end.*

## Tech stack
- React
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
- Imports the app's global styles

**`src/App.js`**
- Main app component
- Renders the account creation page (`Register`) directly

**`src/services/userService.js`**
Service layer responsible for user management:
- `getUsers()` → returns the list of users stored in `localStorage`
- `userExists(email)` → checks whether a user with the given email already exists
- `createUser({ name, email, password })` → creates and stores a new user in `localStorage`

Users are stored locally under the key `create_account_users`.
