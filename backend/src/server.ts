import app from './app';
import { config, validateConfig } from '@config/environment';
import { connectDatabase } from '@config/database';
import { logger } from '@utils/logger';

const PORT = config.port;
const NODE_ENV = config.node_env;

// Validate environment configuration
validateConfig();

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Start listening
    const server = app.listen(PORT, () => {
      logger.info(`
╔════════════════════════════════════════════╗
║     ExtraaLayer Backend Server Started     ║
╠════════════════════════════════════════════╣
║ Environment: ${NODE_ENV.padEnd(37)}║
║ Port: ${PORT.toString().padEnd(42)}║
║ Time: ${new Date().toISOString().padEnd(34)}║
╚════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down gracefully...');
      server.close(async () => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received, shutting down gracefully...');
      server.close(async () => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: Error) => {
      logger.error('Unhandled Rejection:', reason);
      process.exit(1);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
