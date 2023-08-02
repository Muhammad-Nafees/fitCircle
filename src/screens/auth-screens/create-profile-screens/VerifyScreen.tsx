import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {createProfile} from '../../../api';
import {setUserData} from '../../../redux/authSlice';
import {RootState} from '../../../redux/store';
import CustomLoader from '../../../components/shared-components/CustomLoader';
const VerifyScreen = ({navigation}: any) => {
  const {name} = useRoute();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.user);
  const isPendingDialog = name === 'CertificateVerified';
  const authToken = useSelector(
    (state: RootState) => state.auth.authorizationToken,
  );
  console.log(userData);
  console.log(authToken);

  console.log(userData);
  const handleNavigation = async () => {
    if (name == 'CertificateVerified') {
      navigation.navigate('InterestScreen');
    } else {
      setIsLoading(true);
      try {
        console.log('try');
        const response = await createProfile({...userData}, authToken);
        const data = response?.data;
        console.log(response);
        // dispatch(setUserData(data));
        setIsLoading(false);
        navigation.navigate('HomeScreen');
        Toast.show({
          type: 'success',
          text1: 'Account Created Successfully!',
          text2: 'Welcome!',
        });
      } catch (error: any) {
        console.log(error.response.data);
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Server Error!',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, isPendingDialog && {height: 230, width: 300}]}>
        {!isPendingDialog && (
          <View style={styles.icon}>
            <Icon name="checkmark-outline" color="white" size={24} />
          </View>
        )}
        {isPendingDialog ? (
          <View style={{marginHorizontal: 30}}>
            <Text style={styles.text2}>
              "Your Account Is Currently Under Review and Verification"
            </Text>
            <Text style={styles.text3}>
              Once the account is approved and verified, you can have full
              access to the Creator Features of FitCircle.
            </Text>
          </View>
        ) : (
          <Text style={[STYLES.text14, {marginTop: 2}]}>
            Account created!{' '}
          </Text>
        )}
        <View style={{width: '75%', marginTop: verticalScale(25)}}>
          <CustomButton
            isDisabled={isLoading ? true : false}
            onPress={handleNavigation}>
            {isLoading ? <CustomLoader /> : 'Continue'}
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 271,
    height: 180,
    borderRadius: 30,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    color: '#DA995D',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 15,
  },
  text3: {
    fontSize: 12,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'justify',
  },
});
