import bcryptjs from 'bcryptjs';
import { prisma } from '@config/database';
import { AppError } from '@utils/appError';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '@middleware/auth';
import { JWTPayload } from '@types/index';
import { logger } from '@utils/logger';

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  static async register(input: RegisterInput): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw AppError.conflict('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(input.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        role: 'CUSTOMER',
      },
    });

    logger.info(`New user registered: ${user.email}`);

    // Generate tokens
    const jwtPayload: JWTPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  static async login(input: LoginInput): Promise<AuthResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw AppError.unauthorized('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw AppError.unauthorized('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw AppError.forbidden('User account is inactive');
    }

    logger.info(`User logged in: ${user.email}`);

    // Generate tokens
    const jwtPayload: JWTPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const decoded = verifyRefreshToken(token);

      // Verify user still exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || !user.isActive) {
        throw AppError.unauthorized('User not found or inactive');
      }

      const jwtPayload: JWTPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = generateToken(jwtPayload);
      const refreshToken = generateRefreshToken(jwtPayload);

      logger.debug(`Token refreshed for user: ${user.email}`);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw AppError.unauthorized('Invalid refresh token');
    }
  }

  static async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw AppError.notFound('User not found');
    }

    return user;
  }

  static async logout(userId: string): Promise<void> {
    logger.info(`User logged out: ${userId}`);
    // In a real application, you might invalidate the token in a blacklist
  }
}
