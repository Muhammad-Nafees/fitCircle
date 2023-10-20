import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {updateProfile} from '../../../api/auth-module';
import Toast from 'react-native-toast-message';
import {
  authenticate,
  setAccessToken,
  setRefreshToken,
  setUserData,
  setuserRole,
} from '../../../redux/authSlice';
import {format, parse} from 'date-fns';
import {Image as ImageCompress} from 'react-native-compressor';
import {IUser} from 'interfaces/user.interface';

const VerifyScreen = ({navigation}: any) => {
  const {name} = useRoute();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.user);

  const isPendingDialog = name === 'CertificateVerified';

  const handleNavigation = async () => {
    if (name == 'CertificateVerified') {
      navigation.navigate('InterestScreen');
    } else if (name == 'TdeeFromSavedScreen') {
      navigation.navigate('Dashboard');
    } else {
      setIsLoading(true);
      try {
        let compressedProfileImage = null;
        let compressedCoverImage = null;
        let compressedCertificates = null;

        if (userData?.profileImage) {
          const result = await ImageCompress.compress(
            userData.profileImage.uri,
            {
              quality: 0.8,
            },
          );
          compressedProfileImage = {
            name: userData?.profileImage?.name as string,
            type: userData?.profileImage?.type as string,
            uri: result,
          };
        }

        if (userData?.coverImage) {
          const result = await ImageCompress.compress(userData.coverImage.uri, {
            quality: 0.8,
          });
          compressedCoverImage = {
            name: userData?.coverImage?.name as string,
            type: userData?.coverImage?.type as string,
            uri: result,
          };
        }

        if (userData?.certificates) {
          compressedCertificates = await Promise.all(
            userData!.certificates.map(async certificate => {
              const compressedImage = await ImageCompress.compress(
                certificate.uri,
                {
                  quality: 0.8,
                },
              );

              return {
                uri: compressedImage,
                name: certificate.name,
                type: certificate.type,
              };
            }),
          );
        }

        const parsedDate = parse(
          userData?.dob as string,
          'dd/MM/yyyy',
          new Date(),
        );
        const formattedDate = format(parsedDate, 'yyyy-MM-d');
        const convertedAge = Number(userData?.age);

        const filteredLinks = userData?.socialMediaLinks.filter(
          linkData => linkData.link,
        );

        const reqUserData: Partial<IUser> = {
          ...userData,
          dob: formattedDate,
          age: convertedAge as any,
          profileImage: compressedProfileImage || userData?.profileImage,
          coverImage: compressedCoverImage || userData?.coverImage,
          certificates: compressedCertificates || userData?.certificates,
          socialMediaLinks: filteredLinks,
        };

        const response = await updateProfile(reqUserData as IUser);
        const data = response?.data;
        dispatch(setUserData(data?.data));
        dispatch(authenticate(true));
        navigation.navigate('Home');
        Toast.show({
          type: 'success',
          text1: 'Profile Created Successfully!',
        });
      } catch (error: any) {
        console.log(error?.response, 'error');
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data?.message}`,
        });
      }
      setIsLoading(false);
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
        ) : name == 'TdeeFromSavedScreen' ? (
          <Text style={[STYLES.text14, {marginTop: 2}]}>Form Saved! </Text>
        ) : (
          <Text style={[STYLES.text14, {marginTop: 2}]}>Account created! </Text>
        )}
        <View style={{width: '75%', marginTop: verticalScale(25)}}>
          <CustomButton
            isDisabled={isLoading ? true : false}
            onPress={handleNavigation}>
            {isLoading ? (
              <CustomLoader />
            ) : name == 'TdeeFromSavedScreen' ? (
              'Return'
            ) : (
              'Continue'
            )}
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
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
