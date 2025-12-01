export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isEmailVerified: boolean;
}

export interface VerifyEmailDto {
  token: string;
}

export interface ResendVerificationDto {
  email: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
