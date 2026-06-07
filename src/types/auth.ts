export interface ApiResponse<T = unknown> {
  Success: boolean;
  Message: string;
  StatusCode: number;
  Data?: T;
  Details?: string;
}

export interface LoginRequest {
  Username: string;
  Password: string;
}

export interface LoginData {
  token: string;
  refresh_token: string;
  username: string;
  first_name?: string;
  last_name?: string;
  is_subscribed: boolean;
}

export interface RegisterRequest {
  FirstName?: string;
  LastName?: string;
  Username?: string;
  Email: string;
  Password: string;
  Phone?: string;
  UserType?: 1 | 2;
}

export interface RegisterData {
  Token: string;
  RefreshToken: string;
  Username: string;
  Message: string;
}

export interface ResetPasswordRequest {
  Email: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  username?: string;
}
