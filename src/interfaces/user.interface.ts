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

export interface IUnit {
  value: number;
  unit: string;
}

export interface IUser {
  _id: string;
  email: string;
  phone: string;
  fcmToken: string;
  role: IUserRole;
  isProfileCompleted: boolean;
  isActive: boolean;
  profileImage: FileData | null | string | undefined;
  coverImage: FileData | null;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  country: string;
  city: string;
  physicalInformation: string;
  gender: string;
  age: string;
  dob: Date | string;
  hourlyRate: string | null;
  activity: string;
  bodytype: string;
  interests: string[];
  communities: string[];
  certificates: FileData[];
  isVerified: boolean;
  posts: [];
  socialMediaLinks: ISocial[];
  createdAt: Date;
  updatedAt: Date;
  height: IUnit;
  weight: IUnit;
}

export type IPostVisibility = 'Public' | 'Followers' | 'Subscribers';

export interface IPost {
  user: string;
  text: string;
  media: FileData;
  mediaType: string;
  thumbnail: null;
  visibility: IPostVisibility;
  hexCode: string | string[] | number;
  cost: number | null;
  paidBy: [];
  isBoosted: boolean;
  boostStartDate: Date | null;
  boostEndDate: Date | null;
  comments: [];
  likes: [];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
