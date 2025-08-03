# START

## ⚙️ Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/winroot.git
cd winroot

# 2. Install root dependencies
npm install

# 3. Install frontend and backend deps
cd backend && npm install
cd ../frontend && npm install

# 4. Add environment variables
# Create a .env file in /backend

MONGODB_URL=your_mongo_connection_string
ORIGIN=http://localhost:3000
JWT_SECRET=your_secret_key

# 5. Start the app
cd ../
npm run dev

```

# BACKEND

## `controllers/`

- _authControllers.js_ Contains all logic functions like `signup`, `login`, etc.

## `models/`

- _user.js_ Contains Mongoose schemas like `User.js`

## `routes/`

- _auth.js_ Defines route paths like `/signup`, `/login`, etc.

## `utils/`

- _validations.js_ Contains helper functions like validation, hashing, etc.

## `config/`

- _database_ Database connection logic and future config constants

## `middleware/`

- _auth.js_ Middlewares like token verification or error handlers

## `.env`

- _.env_ Stores secret keys, DB URL, JWT secrets

## `server.js`

- Entry point: connects DB, starts the server, sets middlewares

# FRONTEND
