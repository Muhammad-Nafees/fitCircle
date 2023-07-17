import {IUserRole} from './auth.interface';
export interface ISocial {
  name: string;
  link: string;
}

export interface FileData {
  uri: string;
  name: string;
  type: string;
}

<<<<<<< HEAD
export interface IUser {
  authorizationToken?: string;
=======

export interface IUser {
>>>>>>> main
  _id?: string;
  email?: string;
  role?: IUserRole | undefined;
  profileImage?: FileData | null;
  coverImage?: FileData | null;
  phone?: any;
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
