import SigninContent from '../../../components/auth-components/login/SigninContent';
import CustomButton from '../../../components/shared-components/CustomButton';
import {verticalScale} from '../../../utils/metrics';

const SignInScreenTwo = ({navigation, route}: any) => {
  const handleClick = (userType: string) => {
    if (route.params.accountType == 'login') {
      navigation.navigate('LoginFormScreen', {userType: userType});
    } else {
      navigation.navigate('CreateAccount', {userType: userType});
    }
  };
  return (
    <SigninContent screen={2}>
      <CustomButton onPress={() => handleClick('user')}>
        I WANT TO GET IN SHAPE
      </CustomButton>
      <CustomButton
        extraStyles={{marginTop: verticalScale(16)}}
        onPress={() => handleClick('provider')}>
        I AM A COACH / CREATOR
      </CustomButton>
    </SigninContent>
  );
};

export default SignInScreenTwo;
