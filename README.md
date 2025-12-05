# Intlakaa Backend API

Complete backend API for the Intlakaa platform built with Node.js, Express, and MongoDB.

## Features

- ✅ JWT Authentication
- ✅ Admin Invite System (Supabase-like workflow)
- ✅ Password Hashing with bcrypt
- ✅ Email Notifications with Nodemailer
- ✅ Request Management
- ✅ Role-based Access Control (Owner/Admin)
- ✅ Clean MVC Architecture

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email service

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── adminController.js    # Admin & auth logic
│   └── requestController.js  # Request management
├── middleware/
│   └── auth.js              # JWT authentication
├── models/
│   ├── Admin.js             # Admin schema
│   └── Request.js           # Request schema
├── routes/
│   ├── adminRoutes.js       # Admin routes
│   └── requestRoutes.js     # Request routes
├── utils/
│   └── sendEmail.js         # Email utility
├── .env                     # Environment variables
├── .gitignore
├── app.js                   # Express app setup
├── package.json
└── server.js                # Server entry point
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://hazemessam81999:<PASSWORD>@cluster0.gnmk0j7.mongodb.net/intlakaa
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@intlakaa.com

FRONTEND_URL=https://www.intlakaa.com
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

#### Login
```http
POST /api/admins/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Admin Invite System

#### 1. Send Invite (Owner Only)
```http
POST /api/admins/invite
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}
```

#### 2. Verify Invite Token
```http
GET /api/admins/verify-invite?token=<invite_token>
```

#### 3. Accept Invite & Set Password
```http
POST /api/admins/accept-invite
Content-Type: application/json

{
  "token": "<invite_token>",
  "password": "newpassword123"
}
```

#### 4. Get All Admins (Owner Only)
```http
GET /api/admins
Authorization: Bearer <token>
```

#### 5. Delete Admin (Owner Only)
```http
DELETE /api/admins/:id
Authorization: Bearer <token>
```

### Requests

#### Create Request (Public)
```http
POST /api/requests
Content-Type: application/json

{
  "name": "Ahmed Ali",
  "phone": "+201234567890",
  "store_url": "https://example.com",
  "monthly_salary": 5000
}
```

#### Get All Requests (Admin Only)
```http
GET /api/requests
Authorization: Bearer <token>
```

#### Get Single Request (Admin Only)
```http
GET /api/requests/:id
Authorization: Bearer <token>
```

#### Delete Request (Admin Only)
```http
DELETE /api/requests/:id
Authorization: Bearer <token>
```

## Admin Invite Workflow

1. **Owner sends invite** → System generates token & sends email
2. **Admin receives email** → Clicks link with token
3. **System verifies token** → Shows password setup form
4. **Admin sets password** → Account activated & logged in

The invite link format:
```
https://www.intlakaa.com/admin/accept-invite#token=<TOKEN>
```

## Email Configuration

For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASSWORD`

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control
- Invite token expiration (1 hour)
- Input validation
- Error handling

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Database Models

### Admin
- name (String, required)
- email (String, required, unique)
- password (String, hashed)
- role (String: "owner" | "admin")
- inviteToken (String, optional)
- inviteExpires (Date, optional)
- createdAt (Date)

### Request
- name (String, required)
- phone (String, required)
- store_url (String, required)
- monthly_salary (Number, required)
- createdAt (Date)

## Development

```bash
npm run dev
```

This uses nodemon for auto-restart on file changes.

## License

ISC
