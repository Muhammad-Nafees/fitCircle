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
import {useState} from 'react';
import {verticalScale, horizontalScale} from '../../utils/metrics';
import {useNavigation} from '@react-navigation/native';
import {s3bucketReference} from '../../api';
import {SearchProfileNavigationProp} from '../../interfaces/navigation.type';
const Image1 = require('../../../assets/images/backgroundImage.jpg');
const BackArrowIcon = require('../../../assets/icons/arrow-back.png');

export const ProfileHeaderContainer = ({
  isTrainerView,
  username,
  userData,
  followers,
}: any) => {
  const [followButtonStyle, setFollowButtonStyle] = useState(
    styles.profileButton,
  );
  const [subscribeButtonStyle, setSubscribeButtonStyle] = useState(
    styles.profileButton,
  );
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigation = useNavigation<SearchProfileNavigationProp>();
  const [followersLength, setFollowersLength] = useState<number | null>(null);
  const [followingsLength, setFollowingsLength] = useState<number | null>(null);
  const [communitiesLength, setCommunitesLength] = useState<number | null>(
    null,
  );
  console.log(followingsLength, 'sss');

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
          {isTrainerView ? (
            <TouchableOpacity>
              <TrainerProfileScheduleIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings' as never)}>
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
          username={username}
          size={90}
          profileImage={userData?.profileImage as any}
        />
        <Text style={styles.name}>{username}</Text>
        {isTrainerView && (
          <View style={styles.profileButtonsContainer}>
            <TouchableHighlight
              style={[
                isFollowed ? styles.transparentButton : styles.profileButton,
                isFollowed && {paddingHorizontal: 14},
              ]}
              activeOpacity={1}
              underlayColor="transparent"
              onPress={() => {
                setIsFollowed(!isFollowed);
                setFollowButtonStyle(
                  isFollowed ? styles.profileButton : styles.transparentButton,
                );
              }}>
              <Text style={styles.profileButtonText}>
                {isFollowed ? 'Followed' : 'Follow'}
              </Text>
            </TouchableHighlight>
            <Text style={styles.email}>@{username}</Text>
            <TouchableHighlight
              style={[subscribeButtonStyle, {paddingHorizontal: 16}]}
              activeOpacity={1}
              onPress={() => {
                setIsSubscribed(!isSubscribed);
                setSubscribeButtonStyle(
                  isSubscribed
                    ? styles.profileButton
                    : styles.transparentButton,
                );
              }}>
              <Text style={styles.profileButtonText}>
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Text>
            </TouchableHighlight>
          </View>
        )}
        {!isTrainerView && <Text style={styles.email}>@{username}</Text>}
      </View>
      <View style={styles.rowContainer}>
        {isTrainerView || userData?.role !== 'user' ? (
          <TouchableOpacity
            style={styles.column}
            onPress={() =>
              navigation.navigate('SearchProfile', {
                default: 'community',
                setCommunitesLength: setCommunitesLength,
              })
            }>
            <Text style={styles.columnText}>{userData?.noOfFollowings}</Text>
            <Text style={[styles.columnLabel, {textDecorationLine: 'none'}]}>
              Subs
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.column}
          onPress={() =>
            navigation.navigate('SearchProfile', {
              default: 'community',
              setCommunitesLength: setCommunitesLength,
            })
          }>
          <Text style={styles.columnText}>
            {communitiesLength !== null
              ? communitiesLength
              : userData?.noOfCommunities}
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
            navigation.navigate('SearchProfile', {
              default: 'following',
              setFollowingsLength: setFollowingsLength,
            })
          }>
          <Text style={styles.columnText}>
            {followersLength !== null
              ? followingsLength
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
            navigation.navigate('SearchProfile', {
              default: 'followers',
              setFollowersLength: setFollowersLength,
            })
          }>
          <Text style={styles.columnText}>
            {followersLength !== null
              ? followersLength
              : userData?.noOfFollowers}
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
    paddingVertical: verticalScale(25),
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  profileButton: {
    backgroundColor: 'rgba(32, 155, 204, 1)',
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(4),
    borderRadius: 40,
  },
  profileButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(4),
    borderRadius: 40,
  },
});
