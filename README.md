## ⚙️ Installation

```bash
# 1. Clone the repo
git clone https://github.com/tarunbommali/winroot.git
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

- _authControllers.js_ Contains all logic functions _of_ `signup`, `login`, etc.

## `models/`

- _user.js_ Contains Mongoose schema _of_ `User.js`

## `routes/`

- _auth.js_ Defines route paths _of_ `/signup`, `/login`, etc.

## `utils/`

- _validations.js_ Contains helper functions _of_ validation, hashing, etc.

## `config/`

- _database_ Database connection logic and future config constants

## `middleware/`

- _auth.js_ Middlewares like token verification or error handlers

## `.env`

- _.env_ Stores secret keys, DB URL, JWT secrets

## `server.js`

- Entry point: connects DB, starts the server, sets middlewares

# TESTING API

## routes/auth.js

- 🔐 Signup Request
- POST /api/auth/signup
   ```
   {
  "firstName": "Test",
  "lastName": "API",
  "emailId": "test@gmail.com",
  "password": "Test@2025",
  "phoneNumber": "9876543210",
  "age": 23,
  "gender": "male",
  "photoUrl": "https://example.com/photo.jpg",
  "address": {
  "street": "1st Main Road",
  "city": "Hyderabad",
  "state": "Telangana",
  "postalCode": "500001",
  "country": "India"
  },
  "role": "user", // ["user", "superadmin", "admin", "service_provider"]
  "joinedFrom": "website"
  }
  ```

- 🔑 Login Request
- POST /api/auth/login
```
  {
  "emailId": "test@gmail.com",
  "password": "Test@2025"
  }
```

- 🔓 Logout Request
- POST /api/auth/logout

Just hit this endpoint. No request body is needed.



# 🧾 WinRoot Access & Dashboard Architecture

## 👤 User Roles

| Role           | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| **superadmin** | Full control. Can create admin and moderator accounts.           |
| **admin**      | Manages platform, analytics, and can create moderators.          |
| **moderator**  | Role-based limited access (services or e-commerce).              |
| **user**       | General customer; can browse, book services, and order products. |

---

## 🛠️ Moderator Types

| Moderator Type         | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| **Services Moderator** | Can list their own services, manage bookings, add service boys, etc. |
| **Product Moderator**  | Can add their own products, manage inventory/sales.                  |

> ⚠️ Moderators are created by **admin** or **superadmin** and will get **auto-generated username & password** displayed in dashboard.

---

## 📊 Dashboards per Role

**Superadmin**  View all admins/moderators, manage everything                        
**Admin**       View analytics, create moderators, manage platform      
**User**        Book services or buy products             
**Moderator**
  - **Services**: Manage own services, bookings, and staff <br>
  - **E-commerce**: Manage own products, orders, inventory
                                       

---

## 🔐 Authentication APIs

### Service Providers

| Method | Endpoint                      | Description                         |
| ------ | ----------------------------- | ----------------------------------- |
| GET    | `/api/auth/service-providers` | Get list of service providers       |
| POST   | `/api/auth/service-providers` | Create new service provider (admin) |
| PUT    | `/api/auth/service-providers` | Update service provider profile     |
| DELETE | `/api/auth/service-providers` | Delete a service provider           |

### Products

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | `/api/auth/products` | Get list of products (admin) |
| POST   | `/api/auth/products` | Add a new product            |
| PUT    | `/api/auth/products` | Update existing product      |
| DELETE | `/api/auth/products` | Remove product               |
