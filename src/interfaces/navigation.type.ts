import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  CreateAccount: any;
  GenderScreen: any;
  InterestScreen: any;
  CommunitiesScreen: any;
  UploadCertificate: any;
  HomeScreen: any;
  ForgetPassword: any;
  SigninScreenTwo: any;
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
