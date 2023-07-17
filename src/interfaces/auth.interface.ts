import {IUser} from './user.interface';

export type IUserRole = 'user' | 'trainer';
export type IAccountType = 'signup' | 'login' | null;

export interface IAuth {
  authorizationToken: string,
  isAuthenticated: boolean;
  accessToken: null;
  accountType: IAccountType;
  userRole: IUserRole | undefined;
  user: IUser | null;
}
