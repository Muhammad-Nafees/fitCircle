import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  CreateAccount: any;
  GenderScreen: any;
  InterestScreen:any;
  CommunitiesScreen: any;
  UploadCertificate: any

  // Add other routes here...
};

export type CreateAccountNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CreateAccount'
>;

export type InterestScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'InterestScreen'
>;

export type CommunitiesScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CommunitiesScreen'
>;
