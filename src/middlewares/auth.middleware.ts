import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/http.exception';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { UserModel } from '@models/users.model';

const AUTHORIZATION_COOKIE = 'Authorization';
const BEARER_PREFIX = 'Bearer ';

/**
 * Extracts the authorization token from the request.
 * Checks both cookies and Authorization header for the token.
 * For header authorization, removes the Bearer prefix if present.
 *
 * @param req - The extended Express request object containing user information
 * @returns The authorization token if found, null otherwise
 *
 * @example
 * // From cookie
 * // Cookie: authorization=token123
 * getAuthorization(req) // returns "token123"
 *
 * // From header
 * // Authorization: Bearer token123
 * getAuthorization(req) // returns "token123"
 *
 * // No authorization
 * getAuthorization(req) // returns null
 */
const getAuthorization = (req: RequestWithUser): string | null => {
  return (
    req.cookies[AUTHORIZATION_COOKIE] ||
    (req.header(AUTHORIZATION_COOKIE)?.startsWith(BEARER_PREFIX) ? req.header(AUTHORIZATION_COOKIE)?.substring(BEARER_PREFIX.length) : null)
  );
};

/**
 * Verifies the authenticity of a JWT token and extracts its payload
 *
 * @param token - The JWT token string to verify
 * @returns A Promise that resolves to the decoded token payload as DataStoredInToken
 * @throws {HttpException} With status 401 if token verification fails
 *
 * @example
 * ```ts
 * const payload = await verifyToken("eyJhbGciOiJIUzI1NiIs...");
 * // Returns decoded token data
 * ```
 */
const verifyToken = async (token: string): Promise<DataStoredInToken> => {
  try {
    return (await verify(token, SECRET_KEY)) as DataStoredInToken;
  } catch (error) {
    throw new HttpException(401, `Wrong authentication token. More details: ${error.message}`);
  }
};

/**
 * Finds a user by their ID in the UserModel collection.
 * @param id - The unique identifier of the user to find
 * @returns The user object if found
 * @throws {HttpException} When user is not found with status 401
 */
const findUserById = (id: number) => {
  const user = UserModel.find(user => user.id === id);
  if (!user) throw new HttpException(401, 'Wrong authentication token');
  return user;
};

/**
 * Middleware for authenticating user requests using JWT token.
 *
 * This middleware:
 * 1. Extracts the authorization token from the request
 * 2. Verifies the token
 * 3. Finds the associated user
 * 4. Attaches the user object to the request for downstream middleware/routes
 *
 * @param {RequestWithUser} req - Express request object with user type extension
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {HttpException} 404 - If authentication token is missing
 * @throws {HttpException} 401 - If authentication token is invalid
 */
export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = getAuthorization(req);
    if (!token) {
      throw new HttpException(404, 'Authentication token missing');
    }

    const decodedToken = await verifyToken(token);
    const user = findUserById(decodedToken.id);

    req.user = user;
    next();
  } catch (error) {
    next(error instanceof HttpException ? error : new HttpException(401, 'Wrong authentication token'));
  }
};
