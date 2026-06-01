# ExtraaLayer - Production-Ready E-Commerce Backend

A robust, production-ready e-commerce backend built with Node.js, Express.js, TypeScript, and PostgreSQL.

## Features

- ✅ **TypeScript** - Full type safety
- ✅ **Express.js** - Fast, unopinionated web framework
- ✅ **PostgreSQL** - Reliable relational database
- ✅ **Prisma ORM** - Next-gen database ORM
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Zod Validation** - Type-safe schema validation
- ✅ **Cloudinary Integration** - Image upload and management
- ✅ **Razorpay Integration** - Payment processing
- ✅ **Security** - Helmet, CORS, Rate Limiting, XSS Protection
- ✅ **Logging** - Comprehensive logging with Morgan
- ✅ **Docker** - Containerized deployment
- ✅ **Error Handling** - Centralized error handling
- ✅ **API Documentation Ready** - Well-structured and documented

## Project Structure

```
backend/
├── src/
│   ├── api/                 # API controllers and endpoints
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts          # Authentication
│   │   ├── security.ts      # Security headers, CORS, rate limiting
│   │   ├── errorHandler.ts  # Error handling
│   │   ├── logging.ts       # Request logging
│   │   └── validation.ts    # Input validation
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   │   ├── logger.ts        # Logging utility
│   │   ├── appError.ts      # Custom error class
│   │   ├── response.ts      # API response handler
│   │   └── validation.ts    # Zod schemas
│   ├── config/              # Configuration files
│   │   ├── environment.ts   # Environment variables
│   │   └── database.ts      # Database connection
│   ├── types/               # TypeScript types
│   ├── routes/              # Route definitions
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── prisma/
│   └── schema.prisma        # Prisma database schema
├── tests/                   # Test files
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 14
- Docker & Docker Compose (optional)
- npm or yarn

## Getting Started

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the environment template and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/extraalayer_db

# JWT
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# CORS
CORS_ORIGIN=http://localhost:3001
```

### 3. Database Setup

Initialize Prisma and create migrations:

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot-reload

# Building
npm run build            # Compile TypeScript
npm run typecheck        # Type check without emitting

# Running
npm start                # Start production server

# Linting
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio

# Docker
docker-compose up        # Start with Docker Compose
docker-compose down      # Stop Docker containers
```

## Docker Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up

# Build and start
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### Using Dockerfile

```bash
# Build image
docker build -t extraalayer-backend .

# Run container
docker run -p 3000:3000 --env-file .env extraalayer-backend

# Run with database
docker run \
  -p 3000:3000 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  extraalayer-backend
```

## API Endpoints

### Health Check

```http
GET /health
```

Response:
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### API Status

```http
GET /api/v1/status
```

Response:
```json
{
  "success": true,
  "message": "API is operational",
  "version": "1.0.0"
}
```

## Security Features

### Implemented

- ✅ **Helmet** - Security headers
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Rate Limiting** - DDoS protection
- ✅ **XSS Protection** - XSS Clean
- ✅ **JWT Authentication** - Token-based auth
- ✅ **Password Hashing** - bcryptjs
- ✅ **Input Validation** - Zod schema validation
- ✅ **Error Handling** - Secure error messages

### Security Headers

- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security
- Referrer-Policy

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "User not found",
  "error": "NOT_FOUND",
  "status": 404
}
```

Error codes:
- `VALIDATION_ERROR` - 400
- `AUTHENTICATION_ERROR` - 401
- `AUTHORIZATION_ERROR` - 403
- `NOT_FOUND` - 404
- `CONFLICT` - 409
- `RATE_LIMIT_EXCEEDED` - 429
- `INTERNAL_ERROR` - 500

## Database Schema

### Tables

- `users` - User accounts
- `addresses` - User addresses
- `products` - Product catalog
- `cart_items` - Shopping cart
- `wishlist_items` - Wishlist
- `orders` - Order management
- `order_items` - Order line items
- `payments` - Payment tracking
- `reviews` - Product reviews
- `categories` - Product categories

## Logging

Logs are structured and color-coded:

```
[2024-01-01T00:00:00.000Z] INFO  Server started
[2024-01-01T00:00:00.000Z] DEBUG Database query: SELECT * FROM users
[2024-01-01T00:00:00.000Z] WARN  Rate limit reached
[2024-01-01T00:00:00.000Z] ERROR Connection failed: ECONNREFUSED
```

## Testing

Run tests with Jest:

```bash
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Performance Optimization

- Connection pooling via Prisma
- Rate limiting to prevent abuse
- Caching strategies (to be implemented)
- Database indexing on common queries
- Compression middleware
- Async/await error handling

## Best Practices

1. **Always validate input** using Zod schemas
2. **Use async/await** with try-catch or error handler
3. **Log important events** for debugging
4. **Use typed responses** with custom types
5. **Handle errors gracefully** with AppError
6. **Protect routes** with auth middleware
7. **Validate environment** on startup
8. **Use transactions** for data consistency

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify credentials and permissions

### JWT Token Errors

```
Error: Invalid token
```

**Solution:**
- Ensure JWT_SECRET matches between encode/decode
- Check token expiration
- Verify Bearer format: `Authorization: Bearer <token>`

### CORS Errors

```
Access to XMLHttpRequest blocked by CORS
```

**Solution:**
- Add frontend URL to CORS_ORIGIN in .env
- Verify credentials: true if using auth

### Rate Limiting

```
Error: Too many requests
```

**Solution:**
- Wait for rate limit window to reset
- Adjust RATE_LIMIT_MAX_REQUESTS if needed
- Check X-RateLimit-* headers

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/name`
4. Submit pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please open a GitHub issue.

---

**Happy coding! 🚀**
