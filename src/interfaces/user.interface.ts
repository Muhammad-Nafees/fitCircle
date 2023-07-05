import {IUserRole} from './auth.interface';
export interface ISocial {
  name: string;
  link: string;
}

export interface IUser {
  _id?: string;
  email?: string;
  profileImageUrl?: string;
  role?: IUserRole | undefined;
  phone?: number | null;
  firstName?: string;
  lastName?: string;
  username?: string;
  bio?: string;
  country?: string;
  city?: string;
  gender?: string;
  physicalInformation?: string;
  dob?: string;
  hourlyRate?: number | null;
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  activity?: string;
  bodytype?: string;
  interest?: string[];
  communities?: string[];
  socialMediaLinks?: ISocial[];
}
