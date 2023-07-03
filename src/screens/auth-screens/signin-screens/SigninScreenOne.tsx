import SigninContent from '../../../components/auth-components/login/SigninContent';
import CustomButton from '../../../components/shared-components/CustomButton';
import {verticalScale} from '../../../utils/metrics';

const SignInScreenOne = ({navigation}: any) => {
  return (
    <SigninContent>
      <CustomButton
        extraStyles={{height: verticalScale(44)}}
        onPress={() => navigation.navigate('SigninScreenTwo')}>
        CREATE ACCOUNT
      </CustomButton>
      <CustomButton
        extraStyles={{
          backgroundColor: 'trasnparent',
          marginTop: verticalScale(10),
          
        }}
        onPress={() => navigation.navigate('LoginFormScreen')}>
        LOG IN
      </CustomButton>
    </SigninContent>
  );
};

export default SignInScreenOne;
