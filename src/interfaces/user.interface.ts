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
  countryCode: string;
  phoneCode: string;
  fcmToken: string;
  role: IUserRole;
  isProfileCompleted: boolean;
  isActive: boolean;
  profileImage: FileData | null | string | any;
  coverImage: FileData | null | string | any;
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
  bodyType: string;
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
  noOfFollowers: 0;
  noOfFollowings: 0;
  noOfCommunities: 0;
  showAge: boolean;
  showEmailAddress: boolean;
  showName: boolean;
}

export type IPostVisibility = 'Public' | 'Followers' | 'Subscribers';

export interface IPost {
  user: string;
  text: string;
  title: string;
  media: FileData;
  mediaType: string;
  thumbnail: null | any;
  visibility: IPostVisibility;
  hexCode: string | string[] | number | any;
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

export interface IComment {
  _id: string;
  user: {
    _id: string;
    profileImage: FileData;
    firstName: string;
    lastName: string;
  };
  post: string;
  media: FileData[];
  text: string;
  createdAt: Date;
  parent: string;
  nestedComments: IComment[];
}

export interface ITDEE {
  gender: string;
  age: number;
  height: IUnit;
  weight: IUnit;
  goal: string;
  startDate: Date | string;
  goalWeight: IUnit;
  activityFactor: number;
  calorieDeficitFactor: number;
}

export interface IMacro {
  goal: string;
  tdee: number;
  calorieDeficit: number;
}

export interface IPhysicalActivity {
  date: Date | string | any;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  homePhone: string;
  cellPhone: string;
  height: IUnit;
  weight: IUnit;
  age: string;

  isHighCholesterol: boolean;
  isHeartTrouble: boolean;
  isBoneTrouble: boolean;
  isHighBloodPressure: boolean;
  isOverAge: boolean;
  isAnyReasonNotToParticipate: boolean;

  initial: string;

  isFeelWeakEver: boolean;
  mealsPerDay: number;
  isKnownCalorieConsumptionPerDay: boolean;
  isEatBreakfast: boolean;
  isTakingSupplements: boolean;
  isTakingSeveralCupsOfCoffee: boolean;
  isDigestiveProblems: boolean;
  isNutritionOrExerciseBenefits: boolean;
  exerciseSince: string;
  isMaintainGoals: boolean;
  isOkYourLookAndHealth: boolean;
  goalScale: 10;
  desiredBodyFat: string;
  desiredWeight: string;
  desiredLeanMuscle: string;
  exercisesPerWeek: number;
  increaseLeanMuscle: boolean;
  loseBodyFat: boolean;
  increaseStamina: boolean;
  increaseStrength: boolean;
  improveHealth: boolean;
  loseWeight: boolean;
}
