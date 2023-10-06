import {IUser} from './user.interface';

export type IUserRole = 'user' | 'admin';
export type IAccountType = 'signup' | 'login' | null;

export interface IAuth {
  isAuthenticated: boolean;
  accountType: IAccountType;
  userRole: IUserRole | undefined;
  user: IUser | null;
  refreshToken: string | null;
  accessToken: string | null;
  userProfile: IUser | null;
}
