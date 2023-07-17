import {useDispatch} from 'react-redux';
import SigninContent from '../../../components/auth-components/login/SigninContent';
import CustomButton from '../../../components/shared-components/CustomButton';
import {verticalScale} from '../../../utils/metrics';
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
<<<<<<< HEAD
        extraStyles={{height: verticalScale(44)}}
=======
        extraStyles={{height: verticalScale(48)}}
>>>>>>> main
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
