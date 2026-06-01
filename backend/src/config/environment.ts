import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  // Server
  node_env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  log_level: process.env.LOG_LEVEL || 'info',

  // Database
  database_url: process.env.DATABASE_URL || 'postgresql://localhost:5432/extraalayer_db',

  // JWT
  jwt_secret: process.env.JWT_SECRET || 'dev_jwt_secret_key_change_in_production',
  jwt_expiry: process.env.JWT_EXPIRY || '7d',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret_key_change_in_production',
  jwt_refresh_expiry: process.env.JWT_REFRESH_EXPIRY || '30d',

  // Cloudinary
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  // Razorpay
  razorpay: {
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  },

  // CORS
  cors_origin: (process.env.CORS_ORIGIN || 'http://localhost:3001').split(','),

  // Rate Limiting
  rate_limit_window_ms: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rate_limit_max_requests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),

  // URLs
  app_url: process.env.APP_URL || 'http://localhost:3000',
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3001',

  // Email (Optional)
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// Validate required environment variables
export const validateConfig = (): void => {
  const required_vars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
  ];

  const missing = required_vars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missing.length > 0) {
    console.warn(
      `Warning: Missing environment variables: ${missing.join(', ')}`
    );
  }
};
