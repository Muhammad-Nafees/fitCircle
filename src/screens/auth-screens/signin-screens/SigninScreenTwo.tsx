import SigninContent from '../../../components/auth-components/login/SigninContent';
import CustomButton from '../../../components/shared-components/CustomButton';
import {IUserRole} from '../../../interfaces/auth.interface';
import {setAccountType, setuserRole} from '../../../redux/authSlice';
import {verticalScale} from '../../../utils/metrics';
import {useDispatch} from 'react-redux';

const SignInScreenTwo = ({navigation}: any) => {
  const dispatch = useDispatch();

  const handleClick = (userRole: IUserRole) => {
    dispatch(setuserRole(userRole));
    dispatch(setAccountType('signup'));
    navigation.navigate('CreateAccount');
  };
  return (
    <SigninContent screen={2}>
      <CustomButton
<<<<<<< HEAD
        extraStyles={{height: verticalScale(44)}}
=======
        extraStyles={{height: verticalScale(48)}}
>>>>>>> main
        onPress={() => handleClick('user')}>
        I WANT TO GET IN SHAPE
      </CustomButton>
      <CustomButton
<<<<<<< HEAD
        extraStyles={{marginTop: verticalScale(10), height: verticalScale(44)}}
=======
        extraStyles={{marginTop: verticalScale(10), height: verticalScale(48)}}
>>>>>>> main
        onPress={() => handleClick('trainer')}>
        I AM A COACH / CREATOR
      </CustomButton>
    </SigninContent>
  );
};

export default SignInScreenTwo;
