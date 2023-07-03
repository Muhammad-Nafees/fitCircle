import {IUser} from './user.interface';

export type userRole = 'user' | 'trainer';

export interface IAuth {
  isAuthenticated: boolean;
  userRole: userRole | null;
  user: IUser | null;
}
