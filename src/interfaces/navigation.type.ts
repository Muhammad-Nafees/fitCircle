import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IPackage} from './package.interface';

export type AuthStackParamList = {
  CreateAccount: any;
  GenderScreen: any;
  InterestScreen: any;
  CommunitiesScreen: any;
  UploadCertificate: any;
  HomeScreen: any;
  ForgetPassword: any;
  SigninScreenTwo: any;
  Search: any;
  CommentsScreen: any;
  Profile: any;
  commentsScreen: any;
  SearchProfile: any;
  PackageDetail: {packageDetails: IPackage | undefined};
  SupportChat: any;

  // Add other routes here...
};

export type InterestScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'InterestScreen'
>;

export type CommunitiesScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CommunitiesScreen'
>;

export type SearchProfileNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SearchProfile'
>;
export type SupportChatNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SupportChat'
>;
