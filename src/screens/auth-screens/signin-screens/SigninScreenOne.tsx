import SigninContent from "../../../components/auth-components/login/SigninContent";
import CustomButton from "../../../components/shared-components/CustomButton";
import { verticalScale } from "../../../utils/metrics";


const SignInScreenOne = ({navigation}: any) => {

  return (
    <SigninContent>
      <CustomButton onPress={() => navigation.navigate('SigninScreenTwo', {accountType: "CreateAccount"})}>CREATE ACCOUNT</CustomButton>
      <CustomButton extraStyles={{backgroundColor: 'trasnparent',marginTop: verticalScale(16)}} onPress={() => navigation.navigate('SigninScreenTwo',{accountType: "login"})}>LOG IN</CustomButton>
    </SigninContent>
  );
};

export default SignInScreenOne;

