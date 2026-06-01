import express, { Request, Response, NextFunction } from 'express';
import { config } from '@config/environment';
import { logger } from '@utils/logger';

// Middleware imports
import {
  securityHeaders,
  corsMiddleware,
  rateLimiter,
  xssProtection,
  requestSanitizer,
  apiSecurityHeaders,
} from '@middleware/security';
import { morganLogger, requestLogger } from '@middleware/logging';
import { errorHandler, asyncHandler } from '@middleware/errorHandler';
import { AppError } from '@utils/appError';

// Routes
import routes from '@routes/index';

// Initialize express app
const app = express();

// Trust proxy
app.set('trust proxy', 1);

// View engine setup (optional)
app.set('view engine', 'json');

// ========== Security Middleware ==========
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(apiSecurityHeaders);
app.use(xssProtection);
app.use(requestSanitizer);

// ========== Logging Middleware ==========
app.use(morganLogger);
app.use(requestLogger);

// ========== Rate Limiting ==========
app.use('/api/', rateLimiter);

// ========== Body Parser Middleware ==========
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ========== API Routes ==========
app.use('/', routes);

// ========== 404 Handler ==========
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = AppError.notFound(`Route ${req.originalUrl} not found`);
  next(error);
});

// ========== Global Error Handler ==========
app.use(errorHandler);

export default app;
