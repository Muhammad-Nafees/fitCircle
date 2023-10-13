import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
// ----------------------------------------------------------------------------------------------//
import {RootState} from '../../redux/store';
import {Favorites} from '../../components/profile-components/Favourites';
import {CustomTrainerPackage} from '../../components/profile-components/CustomTrainerPackage';
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
} from '../../api/profile-module';
import MyCirclePosts from '../../components/home-components/MyCirclePosts';
import {setUserProfile} from '../../redux/authSlice';
import {IUser} from '../../interfaces/user.interface';
import {ProfileSuccessModal} from '../../components/profile-components/ProfileModals';
import {
  setCommunitiesList,
  setFollowersList,
  setFollowingsList,
} from '../../redux/profileSlice';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {deletePost} from '../../api/home-module';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  CustomNutritionistPlan,
  CustomPlanDescription,
} from '../../components/dashboard-components/CustomNutritionistPlan';

const ProfileScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const tabBarHeight = useBottomTabBarHeight();
  let isTrainerView = route.params?.isTrainerView || false;
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

  const [profileData, setProfileData] = useState<IUser | null>(userData);
  const searchUserProfile = useSelector(
    (state: RootState) => state.auth.userProfile,
  );
  const [userSearchId, setUserSearchId] = useState<string | undefined>(
    userData?._id,
  );
  const profilePersonalData = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (searchUserProfile && searchUserProfile._id) {
      setUserSearchId(searchUserProfile._id);
      setProfileData(searchUserProfile);
      setShouldFetchPostsInitially(true);
    } else {
      setUserSearchId(userData?._id as string);
      setProfileData(userData);
      setShouldFetchPostsInitially(true);
    }

    return () => {
      dispatch(setUserProfile(null as any));
      setShouldFetchPostsInitially(false);
    };
  }, [searchUserProfile, userData, dispatch]);

  const handleCancelButton = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModal = () => {
    setIsModalVisible(false);
    setRemoveModal(!removeModal);
  };

  const handleBioModal = () => {
    setBioModal(!bioModal);
  };

  const handleCommentButtonPress = (selectedPost: any, userId: any) => {
    dispatch(setSelectedPost(selectedPost));
    navigation.navigate('CommentsScreen', {userId, profileScreen: true});
  };
  const handleVideoPress = (video: any) => {
    setSelectedVideo(video);
    setReelsModal(!reelsModal);
  };

  const handleFavoriteDialog = () => {
    setRemoveModal(!removeModal);
  };
  console.log(userData?._id, 'user');
  console.log(searchUserProfile?._id, 'prof');

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
      console.log(followings);
      dispatch(setFollowingsList(followings));
    } catch (error: any) {
      console.log(error?.response?.data, 'From followings List!');
    }
    setIsLoading(false);
  };
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

  useEffect(() => {
    if (shouldFetchPostsInitially) {
      fetchUserPosts();
      fetchUserVideos();
      fetchFollowersList();
      fetchFollowingList();
      fetchCommunityList();
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

  const handleEditDeletePost = async (type: string, postId: string) => {
    if (type == 'Delete' || type == 'DeleteVideo') {
      try {
        const response = await deletePost(postId);
        if (type == 'Delete') {
          setIsEditDeletePost(true);
        } else if (type == 'DeleteVideo') {
          setIsDeleteVideo(true);
        }
        console.log(response?.data, 'sss');
        Toast.show({
          type: 'success',
          text1: `${response?.data?.message}`,
        });
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data?.message}`,
        });
        console.log(error?.response?.data, 'from from delete post!');
      }
    }
  };
  const handleDeleteVideo = (id: string) => {
    handleEditDeletePost('DeleteVideo', id);
  };

  return (
    <View style={[styles.container]}>
      <ProfileHeaderContainer
        profilePersonalData={profilePersonalData}
        isFollowing={route?.params?.isFollowing}
        isTrainerView={isTrainerView}
        userData={profileData}
        followers={followers}
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
                setSelectedOption(
                  profileData?.role === 'nutritionist'
                    ? 'MealPlan'
                    : 'Packages',
                )
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
                console.log(userId);
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
          <>
            <Favorites />
          </>
        )}
        {selectedOption === 'MealPlan' && (
          <>
            <CustomPlanDescription
              plan={{
                id: 1,
                planName: 'Premium Meal Plan',
                price: '$79.99',
                description: 'Lincoln Smith',
              }}
            />
          </>
        )}
        {selectedOption === 'Packages' && (
          <View style={styles.trainerPackageContainer}>
            <CustomTrainerPackage />
            <CustomTrainerPackage />
          </View>
        )}
        {selectedOption === 'Bio' && (
          <ProfileBio
            isTrainerView
            handleBioModal={handleBioModal}
            userData={profileData}
          />
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
                    key={item._id}
                    userId={userId}
                    video={item}
                    onDeleteVideo={handleDeleteVideo}
                    isTrainerView={isTrainerView}
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
      </View>
      <Modal
        onBackButtonPress={() => setReelsModal(false)}
        isVisible={reelsModal}
        style={styles.fullscreenContainer}>
        <View style={{height: '100%', width: '100%'}}>
          <ReelsComponent
            post={selectedVideo}
            isProfile={true}
            handleCancelPress={handleVideoPress}
            handleFavoriteDialog={handleFavoriteDialog}
            onDeletePost={() => {}}
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
          onConfirm={toggleModal}
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
        <BioModal />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '60%',
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
