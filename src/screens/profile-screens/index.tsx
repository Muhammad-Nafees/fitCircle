import React, {useEffect, useState} from 'react';
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
import {CustomPost} from '../../components/home-components/CustomPost';
import {Favorites} from '../../components/home-components/Favourites';
import {CustomTrainerPackage} from '../../components/profile-components/CustomTrainerPackage';
import {setSelectedPost} from '../../redux/postSlice';
import CustomVideo from '../../components/profile-components/CustomVideo';
import {ReelsComponent} from '../../components/home-components/Reels';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {communitiesData, followersData, followingData} from '../dummyData';
import {ProfileBio} from '../../components/profile-components/ProfileBio';
import {ProfileSuccessModal} from '../../components/profile-components/ProfileModals';
import {ProfileHeaderContainer} from '../../components/profile-components/HeaderContainer';
import CustomConfirmationModal from '../../components/shared-components/CustomConfirmationModal';

export const ProfileScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) => state.post.posts);
  const username = userData?.username;
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [communities, setCommunities] = useState(communitiesData);
  const tabBarHeight = useBottomTabBarHeight();
  const [firstName, setFirstName] = useState<string | undefined>(
    userData?.firstName,
  );
  let isTrainerView = route.params?.isTrainerView || false;
  const [lastName, setLastName] = useState<string | undefined>(
    userData?.lastName,
  );
  const [following, setFollowing] = useState(followingData);
  const [followers, setFollowers] = useState(followersData);
  const [selectedOption, setSelectedOption] = useState<string>('Feed');
  const [reelsModal, setReelsModal] = useState(false);
  const [firstVideoPost, setFirstVideoPost] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setSelectedOption('Feed');
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  useEffect(() => {
    const backAction = () => {
      setSelectedOption('Feed');
      navigation.navigate('Home');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const handleCancelButton = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModal = () => {
    setIsModalVisible(false);
    setRemoveModal(!removeModal);
  };

  const filteredPostsWithoutVideo = posts?.filter(
    post => post.user?._id === userData?._id && !post.media?.endsWith('.mp4'),
  );

  const handleCommentButtonPress = (selectedPost: any, userId: any) => {
    dispatch(setSelectedPost(selectedPost));
    navigation.navigate('CommentsScreen', {userId, profileScreen: true});
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

  const handleVideoPress = () => {
    setReelsModal(!reelsModal);
  };

  const handleFavoriteDialog = () => {
    setRemoveModal(!removeModal);
  };

  return (
    <View style={[styles.container]}>
      <ProfileHeaderContainer
        isTrainerView={isTrainerView}
        username={username}
        userData={userData}
        followers={followers}
        following={following}
        communities={communities}
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
          {isTrainerView || userData.role === 'trainer' ? (
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'Packages' && styles.selectedOption,
              ]}
              onPress={() => setSelectedOption('Packages')}>
              <Text style={styles.optionText}>Packages</Text>
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
          <View style={styles.trainerPackageContainer}>
            <CustomTrainerPackage isTrainerView={isTrainerView} />
            <CustomTrainerPackage isTrainerView={isTrainerView} />
          </View>
        )}
        {selectedOption === 'Bio' && <ProfileBio isTrainerView />}
        {selectedOption === 'Videos' && (
          <View style={{width: '100%'}}>
            <FlatList
              data={firstVideoPost}
              keyExtractor={item => item._id}
              renderItem={({item, index}) => (
                <View>
                  <CustomVideo
                    key={item._id}
                    userId={userId}
                    video={item}
                    isTrainerView={isTrainerView}
                    handleCancelButtonPress={handleCancelButton}
                    handleVideoPress={handleVideoPress}
                    style={{marginRight: index % 2 === 0 ? 8 : 0}}
                  />
                </View>
              )}
              numColumns={2}
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
            handleFavoriteDialog={handleFavoriteDialog}
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
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 5,
  },
});
