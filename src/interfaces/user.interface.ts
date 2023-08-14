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

export interface IUser {
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

export interface IPost {
  _id: string;
  user: IUser;
  content: string;
  media: string;
  thumbnail: string;
  visibility: string;
  favorites: string[];
  cost: number | null;
  boosted: boolean;
  boostEndTime: string | null;
  hexCode: string | null;
  likes: string[];
  comments: string[];
  shares: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}