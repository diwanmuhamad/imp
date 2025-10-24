# Full Stack Simple Post Application

A modern simple full-stack post application built with Next.js, Hono.js, and PostgreSQL.

## 🚀 Tech Stack

### Frontend

- Next.js 16.0.0 (React 19.2.0)
- TypeScript
- TailwindCSS with DaisyUI
- Zustand for state management
- React Hook Form with Zod validation
- Axios for API calls

### Backend

- Hono.js (Node.js framework)
- Prisma ORM
- PostgreSQL
- TypeScript
- JWT Authentication
- Zod validation

## 📦 Installation

### Prerequisites

- Node.js 18+
- PostgreSQL
- pnpm/npm/yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file:

```bash
cp .env.example .env
```

4. Update .env with your database credentials and JWT secret:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET="your_secret_key"
PORT=8000
NODE_ENV=development
```

5. Run Prisma migrations:

```bash
npm run prisma:migrate
```

6. Run Prisma Generate Client:

```bash
npm run prisma:generate
```

7. Start the development server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env.local:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start the development server:

```bash
npm run dev
```

## 🏗️ Project Structure

### Frontend Structure

```
frontend/
├── app/               # Next.js app router pages
├── components/        # Reusable React components
├── lib/              # Utilities, validations, and types
├── services/         # API service functions
└── store/            # Zustand state management
```

### Backend Structure

```
backend/
├── prisma/           # Database schema and migrations
├── src/
│   ├── controllers/  # Request handlers
│   ├── middlewares/  # Custom middlewares
│   ├── routes/       # API routes
│   ├── schemas/      # Zod validation schemas
│   ├── services/     # Business logic
│   └── utils/        # Helper functions
```

## 🤔 Technical Decisions

### Frontend

- **Next.js**: Chosen for its built-in routing, SSR capabilities, and excellent TypeScript support
- **Zustand**: Lightweight state management with persist middleware for auth state
- **TailwindCSS + DaisyUI**: Rapid UI development with consistent design system
- **React Hook Form + Zod**: Type-safe form handling with validation

### Backend

- **Hono.js**: Modern, lightweight, and type-safe Node.js framework
- **Prisma**: Type-safe database access with excellent migration tooling
- **PostgreSQL**: Robust, reliable database for structured data
- **JWT**: Stateless authentication for scalability

## 🔒 Authentication Flow

1. User registers/logs in through frontend forms
2. Backend validates credentials and returns JWT token
3. Token stored in Zustand persist store
4. Protected routes check for valid token
5. Axios interceptor adds token to requests

## 🌟 Features

- User authentication (signup/signin)
- Post CRUD operations
- Protected routes
- Toast notifications
- Pagination for posts
- Form validation
- Responsive design

## 📝 API Endpoints

### Auth Routes

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user

### Post Routes

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
