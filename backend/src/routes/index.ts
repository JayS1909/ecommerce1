import { Router } from 'express';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

// API routes placeholder
router.get('/api/v1/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is operational',
    version: '1.0.0',
  });
});

export default router;
