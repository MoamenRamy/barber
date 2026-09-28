# Barber Shop Management API

A backend REST API for managing a complete barber shop platform. The system supports authentication, barber shops, services, bookings, favorites, ratings, packages, image uploads, email verification, OTP, password reset, location-based search, and admin management.

The project is built with Node.js, Express.js, Prisma ORM, and MySQL, with DigitalOcean Spaces used for image storage.

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration and login
- Login using email or phone
- JWT-based authentication
- Password hashing using bcrypt
- Email verification using OTP
- Forgot password functionality
- Reset password functionality
- Change password
- Get authenticated user profile
- Role-based authorization
- Admin, User, and Barber roles
- Admin user ban/unban functionality

### 💈 Barber Shop Management

- Create barber shop profiles
- Update and manage barber information
- Barber shop description and contact information
- Address and location coordinates
- Barber shop working hours
- Barber service duration
- Barber type classification
- Multiple barber shop photos
- Barber shop ratings
- Payment type configuration

### ✂️ Services

- Create barber services
- Assign services to barber shops
- Manage booking services
- Support multiple services per booking

### 📅 Booking System

- Create bookings
- View user bookings
- View booking details
- View active bookings
- Filter bookings by date
- Cancel bookings
- Finish bookings
- Update booking status
- Booking status tracking

Supported booking statuses:

- Booked
- Waiting
- InProcess
- Finished
- Canceled

### ⭐ Favorites & Ratings

- Add/remove barber shops from favorites
- View favorite barber shops
- Rate completed bookings
- Add rating descriptions
- Store barber shop ratings

### 📍 Location & Distance Calculation

The API supports location-based barber shop search using latitude and longitude.

Distance is calculated using the Haversine formula, allowing users to:

- Search for nearby barber shops
- Sort by nearest barber shops
- Sort by farthest barber shops
- Filter barber shops by distance

### 💳 Payment Types

The system supports:

- Cash
- Card
- Both

### 📦 Barber Packages

Admins can create barber packages.

Users can:

- View available packages
- Purchase packages
- Associate purchased packages with their accounts

### 👨‍💼 Admin Operations

Admin users can:

- View all users
- View all barbers
- View all bookings
- Ban users
- Unban users
- Create packages
- Manage barber-related operations

### 📸 Image Uploads

The project supports multiple image uploads using Multer and DigitalOcean Spaces.

Used for:

- User profile images
- Barber shop images
- Barber shop gallery photos
- Package images

### 📧 Email & OTP

The project uses Nodemailer for email functionality.

Supported operations include:

- Email verification OTP
- Forgot password OTP
- Password reset emails

OTP codes are generated using Node.js `crypto.randomInt()`.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| Prisma | ORM and database access |
| MySQL | Relational database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Nodemailer | Email service |
| Multer | File uploads |
| Multer S3 | Object storage uploads |
| DigitalOcean Spaces | Image storage |
| AWS SDK | DigitalOcean Spaces integration |
| CORS | Cross-origin requests |
| dotenv | Environment configuration |
| EJS | Email/template support |
| Twilio | SMS integration support |
| Postman | API testing |
| Git & GitHub | Version control |

## 🏗️ Project Architecture

```text
barber/
│
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── barberController.js
│   ├── errorController.js
│   ├── multer-space-config.js
│   ├── packagesController.js
│   └── userController.js
│
├── routers/
│   ├── authRouter.js
│   ├── barberRouter.js
│   ├── packageRouter.js
│   └── userRouter.js
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── template/
│   └── email.ejs
│
├── utils/
│   ├── AppError.js
│   ├── catchAsync.js
│   ├── email.js
│   ├── packageUpload.js
│   ├── upload.js
│   ├── uploadConfig.js
│   └── userUpload.js
│
├── app.js
├── server.js
├── package.json
└── package-lock.json
```

## 🗄️ Database Design

The database is designed using Prisma ORM with MySQL.

### Main Entities

- User
- Favorite
- Barber Service
- Booking Services
- Barber Store
- Barber Store Photo
- Package
- Booking

### Main Relationships

```text
User
│
├── Barber Store
│
├── Bookings
│
├── Favorites
│
└── Packages
       │
       └── Barber Package

Barber Store
│
├── Services
├── Photos
├── Bookings
└── Favorites

Booking
│
├── User
├── Barber Store
└── Booking Services
```

## 🔑 API Routes

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/verify` | Verify account using OTP |
| POST | `/api/auth/forgetPassword` | Request password reset |
| POST | `/api/auth/resetPassword` | Reset password |
| GET | `/api/auth/me` | Get authenticated user |
| POST | `/api/auth/changePassword` | Change password |
| PATCH | `/api/auth/ban/:userId` | Ban user |
| PATCH | `/api/auth/unban/:userId` | Unban user |

### Barber

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/barbers` | Get barber shops |
| GET | `/api/barbers/services` | Get available services |
| GET | `/api/barbers/me` | Get authenticated barber |
| GET | `/api/barbers/me/:id` | Get barber by ID |
| POST | `/api/barbers` | Create barber shop |
| POST | `/api/barbers/bookings/status/:id` | Update booking status |
| GET | `/api/barbers/bookings/active/:id` | Get active booking |
| GET | `/api/barbers/bookings/:id` | Get barber booking |
| GET | `/api/barbers/admin/allBarbers` | Get all barbers |
| GET | `/api/barbers/admin/allBookings` | Get all bookings |

### Users & Bookings

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/booking/all` | Get all user bookings |
| GET | `/api/users/booking` | Get user bookings |
| GET | `/api/users/booking/:id` | Get booking details |
| POST | `/api/users/booking/:id` | Create booking |
| GET | `/api/users/booking/cancel/:id` | Cancel booking |
| GET | `/api/users/booking/finish/:id` | Finish booking |
| GET | `/api/users/booking/date/:id` | Get booking by date |
| POST | `/api/users/booking/rating/:id` | Rate booking |
| GET | `/api/users/favorite` | Get favorite barber shops |
| GET | `/api/users/favorite/:id` | Add/remove favorite |
| GET | `/api/users/admin/allUsers` | Get all users |

### Packages

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/packages` | Get packages |
| POST | `/api/packages` | Create package |
| POST | `/api/packages/buy` | Purchase package |

## 🔒 Authentication Flow

The API uses JWT authentication.

A typical authentication flow:

```text
Register
   ↓
OTP Verification
   ↓
Login
   ↓
JWT Token
   ↓
Authenticated Requests
```

Protected routes require the authentication token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The application uses role-based authorization for:

- Admin
- User
- Barber

## 📍 Barber Search & Distance Filtering

The barber search system supports filtering based on:

- Barber type
- Services
- Location
- Distance

The Haversine formula is used to calculate the distance between two geographic coordinates.

Example concept:

```text
User Location
     ↓
Latitude + Longitude
     ↓
Calculate Distance
     ↓
Filter / Sort Barber Shops
     ↓
Return Results
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MoamenRamy/barber.git
cd barber
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

SPACES_KEY="your_digitalocean_spaces_key"
SPACES_SECRET="your_digitalocean_spaces_secret"

PORT=8080
```

### 4. Configure Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

### 5. Start the Application

```bash
npm start
```

The API will run on:

```text
http://localhost:8080
```

## 🧪 API Testing

The API can be tested using Postman or any REST API client.

Example request:

```http
POST /api/auth/login
Content-Type: application/json
```

Example JSON body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

After successful authentication, use the returned JWT token for protected endpoints.

## 🛡️ Error Handling

The project includes centralized error handling using:

- Custom `AppError` class
- Async error handling
- Express error middleware
- HTTP status codes
- Structured error responses

Example:

```text
Request
   ↓
Controller
   ↓
Error
   ↓
AppError
   ↓
Error Middleware
   ↓
HTTP Response
```

## 📂 File Storage

Images are uploaded using Multer and stored in DigitalOcean Spaces.

The project uses:

```text
Multer
   ↓
Multer S3
   ↓
AWS S3 SDK
   ↓
DigitalOcean Spaces
```

This allows the API to store images outside the application server.

## 🔄 Booking Workflow

A typical booking lifecycle:

```text
User
 ↓
Select Barber
 ↓
Select Services
 ↓
Create Booking
 ↓
Booked
 ↓
Waiting
 ↓
InProcess
 ↓
Finished
```

A booking can also be canceled:

```text
Booked
   ↓
Canceled
```

## 🧠 Backend Concepts Demonstrated

This project demonstrates practical experience with:

- REST API development
- Node.js backend development
- Express.js
- Prisma ORM
- MySQL database design
- JWT authentication
- Role-based authorization
- Password hashing
- OTP verification
- Password reset
- Email services
- File uploads
- Cloud object storage
- DigitalOcean Spaces
- Database relationships
- Booking systems
- Filtering and sorting
- Geographic distance calculation
- Haversine formula
- Error handling
- Custom middleware
- Async operations
- API architecture
- Git and GitHub

## 🔐 Security Notes

Sensitive credentials should always be stored in environment variables and should never be committed to GitHub.

Recommended environment variables include:

```env
DATABASE_URL=
JWT_SECRET=
SPACES_KEY=
SPACES_SECRET=
SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=
```

If credentials have previously been committed to a public repository, they should be rotated immediately.

## 📌 Project Purpose

The project was developed as a complete backend system for a barber shop platform, focusing on real-world backend architecture and business logic.

It demonstrates how to build a scalable REST API with authentication, authorization, database relationships, booking management, location-based search, cloud file storage, email verification, and administrative functionality.

## 👨‍💻 Author

**Moamen Ramy**

Backend Developer

- GitHub: https://github.com/MoamenRamy
- LinkedIn: https://www.linkedin.com/in/moamen-ramy-492a8b212

## ⭐ Support

If you find this project useful, feel free to give the repository a star ⭐
