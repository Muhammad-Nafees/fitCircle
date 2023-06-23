import SigninContent from '../../../components/auth-components/login/SigninContent';
import CustomButton from '../../../components/shared-components/CustomButton';
import {verticalScale} from '../../../utils/metrics';

const SignInScreenTwo = ({navigation, route}: any) => {
  const handleClick = () => {
    if (route.params.accountType == 'login') {
      navigation.navigate('LoginFormScreen');
    } else {
      navigation.navigate('CreateAccount');
    }
  };
  return (
    <SigninContent screen={2}>
      <CustomButton onPress={handleClick}>I WANT TO GET IN SHAPE</CustomButton>
      <CustomButton
        extraStyles={{marginTop: verticalScale(26)}}
        onPress={handleClick}>
        I AM A COACH / CREATOR
      </CustomButton>
    </SigninContent>
  );
};

export default SignInScreenTwo;
