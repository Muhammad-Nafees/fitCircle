import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  BackHandler,
  AppState,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Sound from 'react-native-sound';
// ----------------------------------------------------------------------------------------------//
import {RootState} from '../../redux/store';
import {setSelectedPost} from '../../redux/postSlice';
import CustomVideo from '../../components/profile-components/CustomVideo';
import {ReelsComponent} from '../../components/home-components/Reels';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {communitiesData, followersData, followingData} from '../dummyData';
import {ProfileBio} from '../../components/profile-components/ProfileBio';
import {ProfileHeaderContainer} from '../../components/profile-components/HeaderContainer';
import {CustomConfirmationModal} from '../../components/shared-components/CustomModals';
import BioModal from '../../components/profile-components/BioModal';
import {
  getFollowersList,
  getFollowingList,
  getSubscribedCommunities,
  getUserPosts,
  getUserVideos,
  searchCommunity,
} from '../../api/profile-module';
import MyCirclePosts from '../../components/home-components/MyCirclePosts';
import {setUserProfile} from '../../redux/authSlice';
import {IUser} from '../../interfaces/user.interface';
import {ProfileSuccessModal} from '../../components/profile-components/ProfileModals';
import {
  setCommunitiesList,
  setFollowersList,
  setFollowingsList,
  setTrainerView,
} from '../../redux/profileSlice';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {
  deleteFavoritePost,
  deletePost,
  getUserFavoriteVideos,
} from '../../api/home-module';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {getMealPlansByNutritionist} from '../../api/mealPlan-module';
import {IMealPlan} from '../../interfaces/mealPlan.interface';
import {IPackage} from '../../interfaces/package.interface';
import {getTrainerPackages} from '../../api/packages-module';
import TrainerPackagesContainer from '../../components/profile-components/TrainerPackagesContainer';
import NutritionisitPlanContainer from '../../components/dashboard-components/NutritionisitPlanContainer';

const ProfileScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const tabBarHeight = useBottomTabBarHeight();
  const [followers, setFollowers] = useState(followersData);
  const [selectedOption, setSelectedOption] = useState<string>('Feed');
  const [reelsModal, setReelsModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [bioModal, setBioModal] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [videoPage, setVideoPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(40);
  const [myPosts, setMyPosts] = useState<any>();
  const [myVideos, setMyVideos] = useState<any>();
  const [myFavoriteVideos, setMyFavoriteVideos] = useState<any>();

  const [hasMoreVideos, setHasMoreVideos] = useState<boolean>(false);
  const [hasMorePost, setHasMorePosts] = useState<boolean>(false);
  const [isLoadMorePost, setIsLoadMorePost] = useState<boolean>(false);
  const [isLoadMoreVideos, setIsLoadMoreVideos] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<any>();
  const [shouldFetchPostsInitially, setShouldFetchPostsInitially] = useState<
    boolean | null
  >(null);
  const [isEditDeletePost, setIsEditDeletePost] = useState<boolean>(false);
  const [isDeleteVideo, setIsDeleteVideo] = useState<boolean>(false);
  const [isDeleteFavoriteVideo, setIsDeleteFavoriteVideo] =
    useState<boolean>(false);

  const [deletePostId, setDeletePostId] = useState<string>('');
  const [isDeleteFavoritePost, setIsDeleteFavoritePost] =
    useState<boolean>(false);

  // meal plan data

  const [mealPlans, setMealPlans] = useState<IMealPlan[]>([]);

  // packages data

  const [packages, setPackages] = useState<IPackage[]>([]);

  const [profileData, setProfileData] = useState<IUser | null>(userData);
  const searchUserProfile = useSelector(
    (state: RootState) => state.auth.userProfile,
  );
  const [userSearchId, setUserSearchId] = useState<string | undefined>(
    userData?._id,
  );
  const profilePersonalData = useSelector((state: RootState) => state.profile);
  const [isSearchProfile, setIsSearchProfile] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [sound, setSound] = useState<any>();

  useEffect(() => {
    if (searchUserProfile && searchUserProfile._id) {
      setUserSearchId(searchUserProfile._id);
      setProfileData(searchUserProfile);
      setShouldFetchPostsInitially(true);
      setIsSearchProfile(true);
    } else {
      setUserSearchId(userData?._id as string);
      setProfileData(userData);
      setShouldFetchPostsInitially(true);
      setIsSearchProfile(false);
    }

    return () => {
      dispatch(setUserProfile(null as any));
      setShouldFetchPostsInitially(false);
    };
  }, [searchUserProfile, userData, dispatch]);

  useEffect(() => {
    if (sound) {
      const subscription = AppState.addEventListener(
        'change',
        (nextAppState: any) => {
          if (nextAppState === 'background') {
            onPause();
          } else if (nextAppState === 'active' && selectedVideo && id) {
            onPlayPause(id);
          }
        },
      );

      return () => {
        subscription.remove();
      };
    }
  }, [sound]);

  const handleCancelButton = () => {
    setIsModalVisible(!isModalVisible);
    setRemoveModal(!removeModal);
    if (isDeleteFavoritePost) {
      handleEditDeletePost('DeleteFavoriteVideo', deletePostId);
    } else {
      handleEditDeletePost('DeleteVideo', deletePostId);
    }
  };

  const handleBioModal = () => {
    setBioModal(!bioModal);
  };

  const handleCommentButtonPress = (selectedPost: any, userId: any) => {
    dispatch(setSelectedPost(selectedPost));
    navigation.navigate('CommentsScreen', {userId, profileScreen: true});
  };
  const handleVideoPress = (video: any) => {
    setIsFavoriteVideo(false);
    setSelectedVideo(video);
    setReelsModal(!reelsModal);
  };
  const [isFavoriteVideo, setIsFavoriteVideo] = useState<boolean>(false);
  const handleFavoriteVideoPress = (video: any) => {
    setSelectedVideo(video);
    setReelsModal(!reelsModal);
    setIsFavoriteVideo(true);
  };

  const handleFavoriteDialog = () => {
    setRemoveModal(!removeModal);
  };

  const fetchUserPosts = async () => {
    setIsLoading(true);
    try {
      const response = await getUserPosts(userSearchId as string, page, limit);
      const data = response?.data?.data;
      if (myPosts && isLoadMorePost) {
        setMyPosts((prevData: any) => {
          return [...prevData, ...data?.posts];
        });
        setIsLoading(false);
      } else {
        if (data?.posts == undefined) {
          setMyPosts([]);
        } else {
          setMyPosts(data?.posts);
        }
        setIsLoading(false);
      }
      setHasMorePosts(data?.pagination?.hasNextPage);
      setIsLoadMorePost(false);
    } catch (error: any) {
      console.log(error?.response?.data, 'From fetching user posts!');
      setIsLoading(false);
    }
  };

  const loadMoreItems = () => {
    if (hasMorePost) {
      setIsLoadMorePost(true);
      setPage((prevPage: number) => prevPage + 1);
    }
    return;
  };

  const fetchUserVideos = async () => {
    try {
      const response = await getUserVideos(
        userSearchId as string,
        videoPage,
        limit,
      );
      const data = response?.data?.data;
      if (myVideos && isLoadMoreVideos) {
        setMyVideos((prevData: any) => {
          return [...prevData, ...data?.posts];
        });
      } else {
        setMyVideos(data?.posts);
      }
      setHasMoreVideos(data?.pagination?.hasNextPage);
      setIsLoadMoreVideos(false);
    } catch (error: any) {
      console.log(error?.response?.data, 'From fetching user posts!');
    }
  };

  const fetchUserFavoriteVideos = async () => {
    try {
      const response = await getUserFavoriteVideos();
      // userSearchId as string,
      // videoPage,
      // limit,
      const data = response?.data?.data;
      if (myVideos && isLoadMoreVideos) {
        setMyFavoriteVideos((prevData: any) => {
          return [...prevData, ...data?.favoritePosts];
        });
      } else {
        setMyFavoriteVideos(data?.favoritePosts);
      }
      setHasMoreVideos(data?.pagination?.hasNextPage);
      setIsLoadMoreVideos(false);
    } catch (error: any) {
      console.log(error?.response?.data, 'From fetching user posts!');
    }
  };
  const loadMoreVideos = () => {
    if (hasMoreVideos) {
      setIsLoadMoreVideos(true);
      setVideoPage((prevPage: number) => prevPage + 1);
    }
    return;
  };

  const fetchFollowersList = async () => {
    setIsLoading(true);
    try {
      const response = await getFollowersList();
      const followers = response?.data?.data?.users;
      dispatch(setFollowersList(followers));
    } catch (error: any) {
      console.log(error?.response?.data, 'From followersList!');
    }
    setIsLoading(false);
  };
  const fetchFollowingList = async () => {
    setIsLoading(true);
    try {
      const response = await getFollowingList();
      const followings = response?.data?.data?.users;
      dispatch(setFollowingsList(followings));
    } catch (error: any) {
      console.log(error?.response?.data, 'From followings List!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      dispatch(setTrainerView(false));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const fetchCommunityList = async () => {
    setIsLoading(true);
    try {
      const response = await getSubscribedCommunities();
      const communities = response?.data?.data?.communities;
      dispatch(setCommunitiesList(communities));
    } catch (error: any) {
      console.log(error?.response?.data, 'From communities List!');
    }
    setIsLoading(false);
  };
  // if logged in user or search user is nutritionist
  const fetchMealPlansByNutritionist = async () => {
    setIsLoading(true);
    try {
      const response = await getMealPlansByNutritionist(
        page,
        limit,
        profileData?._id as string,
      );
      const data = response?.data?.data;
      const mealPlans = data?.mealPlans;
      setMealPlans(mealPlans);
    } catch (error: any) {
      console.log(error?.response?.data, 'From Meal plans!');
    }
    setIsLoading(false);
  };
  // if logged in user or search user is trainer

  const fetchPackagesByTrainer = async () => {
    setIsLoading(true);
    try {
      const response = await getTrainerPackages(
        page,
        limit,
        profileData?._id as string,
      );
      const data = response?.data?.data;
      setPackages(data?.packages);
    } catch (error: any) {
      console.log(error?.response?.data, 'From Packages!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (shouldFetchPostsInitially) {
      fetchUserPosts();
      fetchUserVideos();
      if (!searchUserProfile?._id) {
        fetchUserFavoriteVideos();
      }
      fetchFollowersList();
      fetchFollowingList();
      fetchCommunityList();
      if (
        searchUserProfile?.role === 'nutritionist' ||
        profileData?.role === 'nutritionist'
      ) {
        fetchMealPlansByNutritionist();
      }
      if (
        searchUserProfile?.role === 'trainer' ||
        profileData?.role === 'trainer'
      ) {
        fetchPackagesByTrainer();
      }
    }
  }, [shouldFetchPostsInitially]);

  useEffect(() => {
    if (isEditDeletePost) {
      fetchUserPosts();
    }
    return () => {
      setIsEditDeletePost(false);
    };
  }, [isEditDeletePost]);

  useEffect(() => {
    if (isDeleteVideo) {
      fetchUserVideos();
    }
    return () => {
      setIsDeleteVideo(false);
    };
  }, [isDeleteVideo]);

  useEffect(() => {
    if (isDeleteFavoriteVideo) {
      fetchUserFavoriteVideos();
    }
    return () => {
      setIsDeleteFavoriteVideo(false);
    };
  }, [isDeleteFavoriteVideo]);

  const handleEditDeletePost = async (type: string, postId: string) => {
    if (type == 'Delete' || type == 'DeleteVideo') {
      try {
        const response = await deletePost(postId);
        if (type == 'Delete') {
          setIsEditDeletePost(true);
        } else if (type == 'DeleteVideo') {
          setIsDeleteVideo(true);
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data?.message}`,
        });
        console.log(error?.response?.data, 'from from delete post!');
      }
    } else {
      try {
        const response = await deleteFavoritePost(postId);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data?.message}`,
        });
        console.log(error?.response?.data, 'from from delete favorite post!');
      }
    }
  };
  const handleDeleteVideo = (id: string) => {
    setIsModalVisible(true);
    setDeletePostId(id);
    setIsDeleteFavoritePost(false);

    // handleEditDeletePost('DeleteVideo', id);
  };
  const handleDeleteFavoriteVideo = (id: string) => {
    setIsModalVisible(true);
    setDeletePostId(id);
    setIsDeleteFavoritePost(true);
    // handleEditDeletePost('DeleteVideo', id);
  };

  const getMusic = (postId: string) => {
    try {
      if (sound) {
        sound.stop();
        sound.release();
      }
      let post = myVideos?.find((item: never) => item?._id == postId);
      if (post?.musicUrl) {
        let music = new Sound(post?.musicUrl, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log('failed to load the music', error);
            return;
          }
          music.setNumberOfLoops(-1);
          setSound(music);
          music?.play();
        });
      }
    } catch (error: any) {
      console.log(error?.response, 'Error fetching music list!');
    }
  };

  const onPlayPause = (vid: string) => {
    if (play) {
      if (!vid || id == vid) {
        setPlay(false);
        sound?.pause();
      } else {
        getMusic(vid);
        setId(vid);
      }
    } else {
      if (id == vid) {
        setPlay(true);
        sound?.play();
      } else {
        getMusic(vid);
        setId(vid);
        setPlay(true);
      }
    }
  };

  const onPause = () => {
    setPlay(false);
    sound?.pause();
  };

  const onVideoEnd = () => {
    sound?.setCurrentTime(0);
  };

  const onCloseModal = () => {
    onPause();
    setReelsModal(false);
  };

  return (
    <View style={[styles.container]}>
      <ProfileHeaderContainer
        profilePersonalData={profilePersonalData}
        isFollowing={route?.params?.isFollowing}
        userData={profileData}
        followers={followers}
        isSearchProfile={isSearchProfile}
      />
      <View style={styles.selectionContainerParent}>
        <View style={styles.selectionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 'Feed' && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption('Feed')}>
            <Text style={styles.optionText}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 'Videos' && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption('Videos')}>
            <Text style={[styles.optionText]}>Videos</Text>
          </TouchableOpacity>
          {profileData?.role !== 'user' ? (
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption ===
                  (profileData?.role === 'nutritionist'
                    ? 'MealPlan'
                    : 'Packages') && styles.selectedOption,
              ]}
              onPress={() =>
                profileData?.role === 'nutritionist'
                  ? setSelectedOption('MealPlan')
                  : setSelectedOption('Packages')
              }>
              <Text style={styles.optionText}>
                {profileData?.role === 'nutritionist'
                  ? 'Meal Plan'
                  : 'Packages'}
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
              }}>
              <Text style={styles.optionText}>Favorites</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 'Bio' && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption('Bio')}>
            <Text style={styles.optionText}>Bio</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.bottomContainer,
          {paddingBottom: tabBarHeight + verticalScale(45)},
        ]}>
        <View>
          {selectedOption === 'Feed' && isLoading ? (
            <CustomLoader />
          ) : (
            selectedOption === 'Feed' && (
              <MyCirclePosts
                isSearchProfile={isSearchProfile}
                data={myPosts}
                isLoading={isLoading}
                isPersonalProfile={true}
                loadMoreItems={loadMoreItems}
                onEditDeletePost={handleEditDeletePost}
                handleCommentButtonPress={handleCommentButtonPress}
              />
            )
          )}
          {myPosts &&
            myPosts.length === 0 &&
            selectedOption === 'Feed' &&
            !isLoading && (
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  padding: 20,
                  position: 'absolute',
                }}>
                No Posts yet!
              </Text>
            )}
        </View>

        {selectedOption === 'Favorites' && (
          <View style={{width: '100%'}}>
            {myFavoriteVideos === undefined ? (
              <Text style={{fontSize: 16, color: 'white', padding: 20}}>
                No Favorites vidoes found!
              </Text>
            ) : (
              <FlatList
                data={myFavoriteVideos}
                keyExtractor={item => item._id}
                renderItem={({item, index}) => (
                  <CustomVideo
                    isSearchProfile={isSearchProfile}
                    isFavoriteVideo={true}
                    key={item._id}
                    userId={userId}
                    video={item?.post}
                    onDeleteVideo={handleDeleteFavoriteVideo}
                    handleCancelButtonPress={handleCancelButton}
                    onPressVideo={handleVideoPress}
                    style={{marginRight: index % 2 === 0 ? 8 : 0}}
                  />
                )}
                numColumns={2}
              />
            )}
          </View>
        )}
        {selectedOption === 'MealPlan' && (
          <ScrollView>
            <NutritionisitPlanContainer
              isLoading={isLoading}
              mealPlans={mealPlans}
            />
          </ScrollView>
        )}
        {selectedOption === 'Packages' && (
          <ScrollView>
            <View style={styles.trainerPackageContainer}>
              <TrainerPackagesContainer
                isLoading={isLoading}
                packages={packages}
              />
            </View>
          </ScrollView>
        )}
        {selectedOption === 'Bio' && (
          <ProfileBio handleBioModal={handleBioModal} userData={profileData} />
        )}
        {selectedOption === 'Videos' && (
          <View style={{width: '100%'}}>
            {myVideos === undefined ? (
              <Text style={{fontSize: 16, color: 'white', padding: 20}}>
                No videos posted yet!
              </Text>
            ) : (
              <FlatList
                data={myVideos}
                keyExtractor={item => item._id}
                renderItem={({item, index}) => (
                  <CustomVideo
                    isFavoriteVideo={isSearchProfile}
                    key={item._id}
                    userId={userId}
                    video={item}
                    onDeleteVideo={handleDeleteVideo}
                    handleCancelButtonPress={handleCancelButton}
                    onPressVideo={handleFavoriteVideoPress}
                    style={{marginRight: index % 2 === 0 ? 8 : 0}}
                  />
                )}
                numColumns={2}
              />
            )}
          </View>
        )}
      </View>
      <Modal
        onBackButtonPress={onCloseModal}
        isVisible={reelsModal}
        style={styles.fullscreenContainer}>
        <View style={{height: '100%', width: '100%'}}>
          <ReelsComponent
            post={selectedVideo}
            isFavoriteVideo={false}
            isProfile={true}
            handleCancelPress={handleVideoPress}
            handleFavoriteDialog={handleFavoriteDialog}
            onDeletePost={onCloseModal}
            onPlayPause={onPlayPause}
            play={play}
            id={id}
            onVideoEnd={onVideoEnd}
          />
        </View>
      </Modal>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackButtonPress={handleCancelButton}>
        <CustomConfirmationModal
          confirmText={'Return'}
          cancelText="Remove"
          modalText="Are you sure you want to remove this video ?"
          highlightedWord={'remove'}
          confirmColor={'rgba(32, 128, 183, 1)'}
          cancelColor={'rgba(220, 77, 77, 1)'}
          onCancel={handleCancelButton}
          onConfirm={() => setIsModalVisible(false)}
        />
      </Modal>
      <Modal
        isVisible={removeModal}
        style={styles.modal}
        onBackButtonPress={() => setRemoveModal(false)}>
        <ProfileSuccessModal
          removal={() => setRemoveModal(false)}
          reelsModal={reelsModal}
        />
      </Modal>
      <Modal
        isVisible={bioModal}
        style={styles.bottomModal}
        onBackButtonPress={() => setBioModal(false)}
        onBackdropPress={() => setBioModal(false)}
        backdropOpacity={0.1}>
        <BioModal userData={userData} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: verticalScale(220),
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
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(2),
    marginVertical: verticalScale(5),
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  optionButton: {
    paddingHorizontal: horizontalScale(28),
    paddingVertical: verticalScale(2),
    borderRadius: 40,
  },
  optionText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
  selectedOption: {
    backgroundColor: '#209BCC',
  },
  bottomContainer: {
    backgroundColor: '#292a2c',
    width: '100%',
    height: '100%',
  },
  fullscreenContainer: {
    margin: 0,
    width: '100%',
    height: '100%',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  trainerPackageContainer: {
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 5,
  },
});

export default ProfileScreen;
