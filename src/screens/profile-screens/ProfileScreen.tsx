import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
const Image1 = require('../../../assets/images/backgroundImage.jpg');
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import axiosInstance from '../../api/interceptor';
import {CustomPost} from '../../components/home-components/CustomPost';
import {Favorites} from '../../components/home-components/Favourites';
import {ProfileSettingsIcon} from '../../../assets/icons/profilesettings';
import CustomButton from '../../components/shared-components/CustomButton';
import {CustomTrainerPackage} from '../../components/profile-components/CustomTrainerPackage';
import {TrainerProfileScheduleIcon} from '../../../assets/icons/trainerProfileSchedule';
import {TrainerProfileMsgIcon} from '../../../assets/icons/TrainerProfileMsg';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {setSelectedPost} from '../../redux/postSlice';
import {Facebook} from '../../../assets/icons/Facebook';
import {Tiktok} from '../../../assets/icons/Tiktok';
const Instagram = require('../../../assets/icons/Instagram.png');
import {Twitter} from '../../../assets/icons/Twitter';
import CustomVideo from '../../components/profile-components/CustomVideo';
import Modal from 'react-native-modal';
import {ReelsComponent} from '../../components/home-components/Reels';
import Video from 'react-native-video';

const BackArrowIcon = require('../../../assets/icons/arrow-back.png');

export const ProfileScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
  const videoRef = useRef(null);
  const posts = useSelector((state: RootState) => state.post.posts);
  const coverImageUrl = userData?.coverImage;
  const username = userData?.username;
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [communities, setCommunities] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();
  const [firstName, setFirstName] = useState<string | undefined>(
    userData?.firstName,
  );
  let isTrainerView = route.params?.isTrainerView || false;
  const [followButtonStyle, setFollowButtonStyle] = useState(
    styles.profileButton,
  );
  const [subscribeButtonStyle, setSubscribeButtonStyle] = useState(
    styles.profileButton,
  );
  const [lastName, setLastName] = useState<string | undefined>(
    userData?.lastName,
  );
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [email, setEmail] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState<string>('Feed');
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [favoritesPost, setFavoritesPost] = useState([]);
  const [reelsModal, setReelsModal] = useState(false);
  const [firstVideoPost, setFirstVideoPost] = useState([]);

  useEffect(() => {
    setUserId(userData?._id);
    if (userData?._id) {
      axiosInstance
        .get(`profile/user/${userData._id}`)
        .then(response => {
          const data = response.data;
          setCommunities(data.communities);
          setFollowing(data.following);
          setFollowers(data.followers);
          setProfileImageUrl(data.profileImageUrl);
          setEmail(data.email);
          // userFavoritePosts();
          // setFavoritesPost(userFavoritePosts);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, [userData, route.params?.posts]);

  useEffect(() => {
    const filteredPostsWithoutVideo = posts?.filter(post => {
      return (
        post.user?._id === userData?._id &&
        post.media &&
        post.media.endsWith('.mp4')
      );
    });

    if (filteredPostsWithoutVideo.length > 0) {
      setFirstVideoPost(filteredPostsWithoutVideo);
      console.log(firstVideoPost);
    }
  }, [posts]);

  // const userFavoritePosts = route.params?.posts?.filter((post: any) => {
  //   return post.favorites.some((favorite: any) => favorite._id === userId);
  // });

  const filteredPostsWithoutVideo = posts?.filter(
    post => post.user?._id === userData?._id && !post.media?.endsWith('.mp4'),
  );

  const handleCommentButtonPress = (selectedPost: any, userId: any) => {
    dispatch(setSelectedPost(selectedPost));
    navigation.navigate('CommentsScreen', {userId});
  };

  const renderPostItem = ({item}: any) => (
    <CustomPost
      key={item._id}
      userId={userId}
      post={item}
      handleCommentButtonPress={handleCommentButtonPress}
      countComment={item.comments.length}
    />
  );

  const onBuffer = () => {
    console.log('onBuffer1');
  };

  const onError = () => {
    console.log('onError');
  };

  const handleVideoPress = () => {
    setReelsModal(!reelsModal);
  };

  return (
    <View style={[styles.container, {marginBottom: tabBarHeight + 30}]}>
      <ImageBackground
        style={styles.topContainer}
        source={Image1}
        resizeMode="cover">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 14,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackArrowIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', gap: 6}}>
            <TouchableOpacity>
              {isTrainerView ? (
                <TrainerProfileScheduleIcon />
              ) : (
                <ProfileSettingsIcon />
              )}
            </TouchableOpacity>
            {isFollowed && (
              <TouchableOpacity>
                <TrainerProfileMsgIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.headerContainer}>
          {profileImageUrl ? (
            <Avatar.Image
              size={90}
              source={{uri: profileImageUrl}}
              style={styles.avatarImage}
            />
          ) : (
            <Avatar.Text
              size={90}
              label={username ? username[0].toUpperCase() : 'SA'}
              style={styles.avatarText}
            />
          )}
          {userData?.firstName && userData?.lastName && (
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
          )}
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
                    isFollowed
                      ? styles.profileButton
                      : styles.transparentButton,
                  );
                }}>
                <Text style={styles.profileButtonText}>
                  {isFollowed ? 'Followed' : 'Follow'}
                </Text>
              </TouchableHighlight>
              <Text style={styles.email}>{email}</Text>
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
          {!isTrainerView && <Text style={styles.email}>{email}</Text>}
        </View>
        <View style={styles.rowContainer}>
          {isTrainerView ||
            (userData.role === 'trainer' && (
              <TouchableOpacity
                style={styles.column}
                onPress={() =>
                  navigation.navigate('SearchProfile', {
                    default: 'community',
                    followers: followers,
                    following: following,
                    communities: communities,
                  })
                }>
                <Text style={styles.columnText}>{communities.length}</Text>
                <Text style={styles.columnLabel}>Subs</Text>
              </TouchableOpacity>
            ))}
          <TouchableOpacity
            style={styles.column}
            onPress={() =>
              navigation.navigate('SearchProfile', {
                default: 'community',
                followers: followers,
                following: following,
                communities: communities,
              })
            }>
            <Text style={styles.columnText}>{communities.length}</Text>
            <Text style={styles.columnLabel}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.column}
            onPress={() =>
              navigation.navigate('SearchProfile', {
                default: 'following',
                followers: followers,
                following: following,
                communities: communities,
              })
            }>
            <Text style={styles.columnText}>{following.length}</Text>
            <Text style={styles.columnLabel}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.column}
            onPress={() =>
              navigation.navigate('SearchProfile', {
                default: 'followers',
                followers: followers,
                following: following,
                communities: communities,
              })
            }>
            <Text style={styles.columnText}>{followers.length}</Text>
            <Text style={styles.columnLabel}>Followers</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.selectionContainerParent}>
        <View style={styles.selectionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 'Feed' && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption('Feed')}>
            <Text
              style={[
                styles.optionText,
                selectedOption === 'Feed' && styles.selectedOptionText,
              ]}>
              Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 'Videos' && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption('Videos')}>
            <Text
              style={[
                styles.optionText,
                selectedOption === 'Videos' && styles.selectedOptionText,
              ]}>
              Videos
            </Text>
          </TouchableOpacity>
          {isTrainerView || userData.role === 'trainer' ? (
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'Packages' && styles.selectedOption,
              ]}
              onPress={() => setSelectedOption('Packages')}>
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Packages' && styles.selectedOptionText,
                ]}>
                Packages
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'Favorites' && styles.selectedOption,
              ]}
              onPress={() => {
                setSelectedOption('Favorites');
                console.log(userId);
              }}>
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Favorites' && styles.selectedOptionText,
                ]}>
                Favorites
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 'Bio' && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption('Bio')}>
            <Text
              style={[
                styles.optionText,
                selectedOption === 'Bio' && styles.selectedOptionText,
              ]}>
              Bio
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {selectedOption === 'Feed' && (
          <FlatList
            data={filteredPostsWithoutVideo}
            keyExtractor={item => item._id}
            renderItem={renderPostItem}
          />
        )}
        {selectedOption === 'Favorites' && (
          <>
            <Favorites />
          </>
        )}
        {selectedOption === 'Packages' && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 12,
              marginTop: 5,
            }}>
            <CustomTrainerPackage />
            <CustomTrainerPackage />
          </View>
        )}
        {selectedOption === 'Bio' && (
          <View style={{paddingHorizontal: 16}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 12, fontWeight: '600', color: 'white'}}>
                Social Media Accounts
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'rgba(32, 155, 204, 1)',
                    fontWeight: '400',
                  }}>
                  More Details
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 6, paddingBottom: 18}}>
              <Twitter />
              <Facebook />
              <Image source={Instagram} style={{width: 29, height: 29}} />
              <View style={{backgroundColor: 'white', borderRadius: 40}}>
                <Tiktok />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: 12,
                }}>
                Bio
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.5)',
                  lineHeight: 18.74,
                  fontWeight: '500',
                }}>
                There comes a particular point in life once you need to stop
                blaming people for a way you are feeling or the misfortunes in
                your life. You can’t undergo life obsessing about what may need
                been.
              </Text>
            </View>
          </View>
        )}
        {selectedOption === 'Videos' && (
          <View style={{paddingHorizontal: 16}}>
            <FlatList
              data={firstVideoPost}
              keyExtractor={item => item._id}
              renderItem={({item, index}) => (
                <CustomVideo
                  key={item._id}
                  userId={userId}
                  video={item}
                  handleVideoPress={handleVideoPress}
                  style={{marginRight: index % 2 === 0 ? 8 : 0}}
                />
              )}
              numColumns={2}
              columnWrapperStyle={{marginBottom: 16}}
            />
          </View>
        )}
      </View>
      <Modal
        onBackButtonPress={() => setReelsModal(false)}
        isVisible={reelsModal}
        style={styles.fullscreenContainer}>
        <View style={{height: '100%', width: '100%'}}>
          <ReelsComponent
            isProfile={true}
            handleCancelPress={handleVideoPress}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '60%',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
  },
  email: {
    fontSize: 10,
    color: '#209BCC',
  },
  name: {fontSize: 14, color: '#fff', fontWeight: 'bold'},
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    backgroundColor: '#363639',
  },
  avatarImage: {
    marginBottom: 12,
  },
  avatarText: {
    backgroundColor: '#5e01a9',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
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
  selectionContainerParent: {
    backgroundColor: '#292a2c',
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#363639',
    borderRadius: 40,
    marginHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 5,
  },
  optionButton: {
    paddingHorizontal: 28,
    paddingVertical: 2,
    borderRadius: 40,
  },
  optionText: {
    fontSize: 14,
    color: '#444444',
    fontWeight: '400',
  },
  selectedOption: {
    backgroundColor: '#209BCC',
  },
  selectedOptionText: {
    color: '#fff',
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
    paddingHorizontal: 25,
    paddingVertical: 4,
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
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderRadius: 40,
  },
  fullscreenContainer: {
    margin: 0,
    width: '100%',
    height: '100%',
  },
});
