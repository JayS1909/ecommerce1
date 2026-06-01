import { PrismaClient } from '@prisma/client';
import { logger } from '@utils/logger';

let prismaInstance: PrismaClient;

export const getPrismaInstance = (): PrismaClient => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });

    // Log queries in development
    if (process.env.NODE_ENV === 'development') {
      prismaInstance.$on('query', (e) => {
        logger.debug(`Query: ${e.query} | Params: ${e.params}`);
      });
    }

    // Log errors
    prismaInstance.$on('error', (e) => {
      logger.error(`Prisma Error: ${e.message}`);
    });

    // Handle disconnection
    process.on('SIGINT', async () => {
      await prismaInstance.$disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await prismaInstance.$disconnect();
      process.exit(0);
    });
  }

  return prismaInstance;
};

export const disconnectDatabase = async (): Promise<void> => {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
  }
};

export const connectDatabase = async (): Promise<void> => {
  try {
    const prisma = getPrismaInstance();
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const prisma = getPrismaInstance();
