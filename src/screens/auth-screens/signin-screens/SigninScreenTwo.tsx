import SigninContent from '../../../components/auth-components/login/SigninContent';
import CustomButton from '../../../components/shared-components/CustomButton';
import {userRole} from '../../../interfaces/auth.interface';
import {setuserRole} from '../../../redux/authSlice';
import {verticalScale} from '../../../utils/metrics';
import {useDispatch} from 'react-redux';

const SignInScreenTwo = ({navigation}: any) => {
  const dispatch = useDispatch();

  const handleClick = (userRole: userRole) => {
    dispatch(setuserRole(userRole));
    navigation.navigate('CreateAccount');
  };
  return (
    <SigninContent screen={2}>
      <CustomButton extraStyles={{height: verticalScale(44)}} onPress={() => handleClick('user')}>
        I WANT TO GET IN SHAPE
      </CustomButton>
      <CustomButton
        extraStyles={{marginTop: verticalScale(10),height: verticalScale(44)}}
        onPress={() => handleClick('trainer')}>
        I AM A COACH / CREATOR
      </CustomButton>
    </SigninContent>
  );
};

export default SignInScreenTwo;
