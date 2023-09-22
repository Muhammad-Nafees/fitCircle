import {useDispatch} from 'react-redux';
import SigninContent from '../../../components/auth-components/login/SigninContent';
import CustomButton from '../../../components/shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {setAccountType} from '../../../redux/authSlice';

const SignInScreenOne = ({navigation}: any) => {
  const dispatch = useDispatch();

  const handleCreateAccount = () => {
    navigation.navigate('SigninScreenTwo');
    dispatch(setAccountType('signup'));
  };
  const handleLogin = () => {
    navigation.navigate('LoginFormScreen');
    dispatch(setAccountType('login'));
  };

  return (
    <SigninContent>
      <CustomButton
        extraStyles={{height: verticalScale(50)}}
        onPress={handleCreateAccount}>
        CREATE ACCOUNT
      </CustomButton>
      <CustomButton
        extraStyles={{
          backgroundColor: 'trasnparent',
          marginTop: verticalScale(10),
        }}
        onPress={handleLogin}>
        LOG IN
      </CustomButton>
    </SigninContent>
  );
};

export default SignInScreenOne;
