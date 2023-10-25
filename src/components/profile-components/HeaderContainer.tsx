import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {TrainerProfileMsgIcon} from '../../../assets/icons/TrainerProfileMsg';
import {ProfileSettingsIcon} from '../../../assets/icons/profilesettings';
import {TrainerProfileScheduleIcon} from '../../../assets/icons/trainerProfileSchedule';
import {useState, useEffect} from 'react';
import {verticalScale, horizontalScale} from '../../utils/metrics';
import {useNavigation} from '@react-navigation/native';
import {s3bucketReference} from '../../api';
import {SearchProfileNavigationProp} from '../../interfaces/navigation.type';
import {followToggle, toggleSubscribe} from '../../api/profile-module';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
const Image1 = require('../../../assets/images/backgroundImage.jpg');
const BackArrowIcon = require('../../../assets/icons/arrow-back.png');

export const ProfileHeaderContainer = ({
  isTrainerView,
  userData,
  followers,
  isFollowing,
  profilePersonalData,
  isSearchProfile,
}: any) => {
  const [followButtonStyle, setFollowButtonStyle] = useState<any>(
    styles.profileButton,
  );
  const [subscribeButtonStyle, setSubscribeButtonStyle] = useState<any>(
    styles.profileButton,
  );
  const [isFollowed, setIsFollowed] = useState(isFollowing);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigation = useNavigation<SearchProfileNavigationProp>();

  const [count, setCount] = useState<number>(0);
  const [subscriberCount, setSubscriberCount] = useState<number>(0);

  const loginUserDataId = useSelector(
    (state: RootState) => state.auth.user?._id,
  );
  const loginUserData = useSelector((state: RootState) => state.auth.user);
  const [isSeachUser, setIsSearchUser] = useState<boolean>(
    loginUserDataId === userData._id,
  );

  useEffect(() => {
    setIsSearchUser(loginUserDataId === userData._id);
    console.log(
      userData?.subscribers?.includes(loginUserDataId),
      'isSubscriber',
    );
    if (userData?.subscribers?.includes(loginUserDataId)) {
      setIsSubscribed(true);
      setSubscribeButtonStyle(
        isSubscribed ? styles.profileButton : styles.transparentButton,
      );
    }
  }, [loginUserDataId, userData._id]);

  const handleFollowToggle = async () => {
    setIsFollowed(!isFollowed);
    if (isFollowed) {
      setCount(prev => prev - 1);
    } else {
      setCount(prev => prev + 1);
    }
    setFollowButtonStyle(
      isFollowed ? styles.profileButton : styles.transparentButton,
    );
    try {
      const response = await followToggle(userData?._id);
    } catch (error: any) {
      console.log(error?.response?.data, 'from follow toggle on search!');
    }
  };
  const handleSubscribeToggle = async () => {
    setIsSubscribed(!isSubscribed);
    if (isSubscribed) {
      setSubscriberCount(prev => prev - 1);
    } else {
      setSubscriberCount(prev => prev + 1);
    }
    setSubscribeButtonStyle(
      isSubscribed ? styles.profileButton : styles.transparentButton,
    );
    try {
      const response = await toggleSubscribe(userData?._id);
      console.log(response?.data, 'sss');
    } catch (error: any) {
      console.log(error?.response?.data, 'from follow subscribe on search!');
    }
  };

  const navigateToSchedule = () => {
    navigation.navigate('ScheduleScreen', {
      screen: 'Slot',
      params: {
        hourlyRate: true,
        userData: userData,
      },
    });
  };

  return (
    <ImageBackground
      style={styles.topContainer}
      source={{uri: `${s3bucketReference}/${userData?.coverImage}`} || Image1}
      resizeMode="cover">
      <View style={styles.topContentContainer}>
        <TouchableOpacity
          onPress={() => {
            isTrainerView
              ? navigation.navigate('Search' as never)
              : navigation.goBack();
          }}>
          <Image source={BackArrowIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 6}}>
          {isSearchProfile &&
            loginUserData?.role === 'user' &&
            profilePersonalData.role === 'trainer' && (
              <TouchableOpacity onPress={navigateToSchedule}>
                <TrainerProfileScheduleIcon />
              </TouchableOpacity>
            )}
          {isSeachUser && (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <ProfileSettingsIcon />
            </TouchableOpacity>
          )}
          {isFollowed && (
            <TouchableOpacity>
              <TrainerProfileMsgIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.headerContainer}>
        <CustomProfileAvatar
          username={userData?.username}
          size={90}
          profileImage={userData?.profileImage as any}
        />
        <Text style={styles.name}>{userData?.username}</Text>
        {isTrainerView && (
          <View style={styles.profileButtonsContainer}>
            <TouchableHighlight
              style={[
                isFollowed ? styles.transparentButton : styles.profileButton,
                isFollowed,
              ]}
              activeOpacity={1}
              underlayColor="transparent"
              onPress={handleFollowToggle}>
              <Text style={styles.profileButtonText}>
                {isFollowed ? 'Followed' : 'Follow'}
              </Text>
            </TouchableHighlight>
            <Text style={styles.email}>@{userData?.username}</Text>
            {userData?.role !== 'user' && (
              <TouchableHighlight
                style={[subscribeButtonStyle]}
                activeOpacity={1}
                onPress={handleSubscribeToggle}>
                <Text style={styles.profileButtonText} numberOfLines={1}>
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </Text>
              </TouchableHighlight>
            )}
          </View>
        )}
        {!isTrainerView && (
          <Text style={styles.email}>@{userData?.username}</Text>
        )}
      </View>
      <View style={styles.rowContainer}>
        {userData?.role !== 'user' ? (
          <TouchableOpacity
            style={styles.column}
            // onPress={() =>
            //   isSeachUser &&
            //   navigation.navigate('SearchProfile', {
            //     default: 'community',
            //   })
            // }
          >
            <Text style={styles.columnText}>
              {subscriberCount + userData?.subscribers?.length}
            </Text>
            <Text style={[styles.columnLabel, {textDecorationLine: 'none'}]}>
              Subs
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.column}
          onPress={() =>
            isSeachUser &&
            navigation.navigate('SearchProfile', {
              default: 'community',
            })
          }>
          <Text style={styles.columnText}>
            {isSeachUser
              ? profilePersonalData?.communitiesList
                ? profilePersonalData?.communitiesList?.length
                : 0
              : userData?.communities?.length}
          </Text>
          <Text
            style={[
              styles.columnLabel,
              isTrainerView && {textDecorationLine: 'none'},
            ]}>
            Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.column}
          onPress={() =>
            isSeachUser &&
            navigation.navigate('SearchProfile', {
              default: 'following',
            })
          }>
          <Text style={styles.columnText}>
            {isSeachUser
              ? profilePersonalData?.followingsList
                ? profilePersonalData?.followingsList?.length
                : 0
              : userData?.noOfFollowings}
          </Text>
          <Text
            style={[
              styles.columnLabel,
              isTrainerView && {textDecorationLine: 'none'},
            ]}>
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.column}
          onPress={() =>
            isSeachUser &&
            navigation.navigate('SearchProfile', {
              default: 'followers',
            })
          }>
          <Text style={styles.columnText}>
            {isSeachUser
              ? profilePersonalData?.followersList
                ? profilePersonalData?.followersList?.length
                : 0
              : userData?.noOfFollowers + count}
          </Text>
          <Text
            style={[
              styles.columnLabel,
              isTrainerView && {textDecorationLine: 'none'},
            ]}>
            Followers
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '62%',
  },
  email: {
    fontSize: 10,
    color: '#209BCC',
  },
  name: {fontSize: 14, color: '#fff', fontWeight: 'bold'},
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(300),
    backgroundColor: '#363639',
  },
  avatarImage: {
    marginBottom: verticalScale(12),
  },
  avatarText: {
    backgroundColor: '#5e01a9',
    marginVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  topContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 14,
  },
  column: {
    alignItems: 'center',
  },
  columnText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  columnLabel: {
    fontSize: 10,
    color: '#209BCC',
    textDecorationLine: 'underline',
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#363639',
    borderRadius: 40,
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(2),
    marginVertical: verticalScale(5),
  },
  selectedOption: {
    backgroundColor: '#209BCC',
  },
  bottomContainer: {
    backgroundColor: '#292a2c',
    width: '100%',
    height: '100%',
  },
  profileButtonsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  profileButton: {
    backgroundColor: 'rgba(32, 155, 204, 1)',
    width: horizontalScale(88),
    height: verticalScale(24),
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    width: horizontalScale(88),
    height: verticalScale(24),
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
});
