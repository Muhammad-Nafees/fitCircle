import {FileData} from './user.interface';

export interface IPackage {
  _id: string;
  user: string;
  title: string;
  description: string;
  media: FileData;
  thumbnail: FileData;
  hours: number;
  rating: number;
  cost: number;
  reviews: [];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  reviewsCount: number;
}
