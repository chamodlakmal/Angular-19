export interface LoginRequest {
  EmailId: string;
  Password: string;
}

export interface LoginResponse {
  message: string;
  result: boolean;
  data: UserData;
}

export interface UserData {
  userId: number;
  emailId: string;
  token: string;
  refreshToken: string;
}

export interface TokenRefreshRequest {
  emailId: string | null;
  token: string | null;
  refreshToken: string | null;
}

export interface TokenRefreshResponse {
  message: string;
  result: boolean;
  data: UserData;
}
