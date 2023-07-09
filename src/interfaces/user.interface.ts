import {IUserRole} from './auth.interface';
export interface ISocial {
  name: string;
  link: string;
}

export interface IUser {
  _id?: string;
  email?: string;
  role?: IUserRole | undefined;
  profileImage?: any;
  coverImage?: any;
  phone?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  bio?: string;
  country?: string;
  city?: string;
  gender?: string;
  physicalInformation?: string;
  dob?: string;
  hourlyRate?: string;
  age?: string;
  height?: string;
  weight?: string;
  activity?: string;
  bodytype?: string;
  interest?: string[];
  certificateImages?: any[];
  selectedCommunities?: string[];
  socialMediaLinks?: ISocial[];

}
