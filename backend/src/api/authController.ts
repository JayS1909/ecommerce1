import { Response } from 'express';
import { AuthService, RegisterInput, LoginInput } from '@services/authService';
import { validateBody } from '@middleware/validation';
import { registerSchema, loginSchema, refreshTokenSchema } from '@utils/validation';
import { ApiResponseHandler } from '@utils/response';
import { asyncHandler } from '@middleware/errorHandler';
import { AuthenticatedRequest } from '@types/index';

export const register = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const input = req.body as RegisterInput;
  const result = await AuthService.register(input);
  ApiResponseHandler.created(res, result, 'User registered successfully');
});

export const login = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const input = req.body as LoginInput;
  const result = await AuthService.login(input);
  ApiResponseHandler.success(res, result, 'Login successful', 200);
});

export const refreshToken = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  const result = await AuthService.refreshToken(refreshToken);
  ApiResponseHandler.success(res, result, 'Token refreshed successfully', 200);
});

export const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    throw new Error('User not authenticated');
  }
  const user = await AuthService.getCurrentUser(req.user.id);
  ApiResponseHandler.success(res, user, 'User retrieved successfully', 200);
});

export const logout = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    throw new Error('User not authenticated');
  }
  await AuthService.logout(req.user.id);
  ApiResponseHandler.success(res, {}, 'Logged out successfully', 200);
});
