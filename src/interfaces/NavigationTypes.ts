import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AuthStackParamList = {
  CreateAccount: any;
  GenderScreen: any;
  CommunitiesScreen: any;

  // Add other routes here...
};

export type CreateAccountNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CreateAccount'
>;

export type GenderScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'GenderScreen'
>;
export type CommunitiesScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CommunitiesScreen'
>;
