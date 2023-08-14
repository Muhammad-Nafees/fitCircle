import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {Avatar} from 'react-native-paper';
import {CustomPost} from '../../components/home-components/CustomPost';
import {ReelsComponent} from '../../components/home-components/Reels';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
} from '../../redux/postSlice';
import axios from 'axios';
const SearchIcon = require('../../../assets/icons/search.png');
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {setSelectedPost} from '../../redux/postSlice';
import {createIconSetFromFontello} from 'react-native-vector-icons';
const NotificationIcon = require('../../../assets/icons/notification.png');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
  const postsRedux = useSelector((state: RootState) => state.post.posts);
  const username = userData?.username;
  const [userId, setUserId] = useState(userData?._id);
  const [selectedButton, setSelectedButton] = useState('My Circle');
  const navigation = useNavigation();
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleSearchBarFocus = () => {
    navigation.navigate('Search');
  };

  const handleCommentButtonPress = (
    selectedPost: any,
    userId: any,
  ) => {
    dispatch(setSelectedPost(selectedPost));
    navigation.navigate('CommentsScreen', {userId});
  };

  const onChangeIndex = ({index}: any) => {
    setFocusedIndex(index);
  };
  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, []),
  );

  useEffect(() => {
    setIsRefreshing(true);
    setIsLoadingMore(false);
    setFetchedPosts([]);
    dispatch(fetchPostsStart());
  }, []);

  const handleRefresh = () => {
    dispatch(setSelectedPost(null));
    setIsRefreshing(true);
    fetchPosts(1);
  };

  const getVideoPosts = (allPosts: any) => {
    return allPosts.filter(post => post.media && post.media.endsWith('.mp4'));
  };

  useEffect(() => {
    setUserId(userData?._id);
    handleButtonPress('My Circle');
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  useEffect(() => {
    setFilteredVideos(getVideoPosts(postsRedux));
  }, [postsRedux]);

  useEffect(() => {
    setFilteredVideos(getVideoPosts(fetchedPosts));
  }, [fetchedPosts]);

  const API_BASE_URL = 'http://3.128.201.197/';
  const fetchPosts = async (page: number) => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: {
          page,
          limit: 10,
        },
      });
      const data = response.data;
      if (data.docs && Array.isArray(data.docs)) {
        setHasMore(data.docs.length >= 10);
        if (page === 1) {
          setFetchedPosts(data.docs);
          dispatch(fetchPostsSuccess(data.docs));
        } else {
          setFetchedPosts(prevPosts => [...prevPosts, ...data.docs]);
          dispatch(fetchPostsSuccess(data.docs));
        }
      } else {
        console.error('Invalid data format from API:', data);
        dispatch(fetchPostsFailure('Error fetching posts'));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      const nextPage = Math.ceil(fetchedPosts.length / 10) + 1;
      console.log(nextPage);
      fetchPosts(nextPage);
    }
  };

  const handleButtonPress = (button: string) => {
    setSelectedButton(button);
  };

  const renderCustomPost = ({item}: any) => {
    if (item && item.media && item.media.endsWith('.mp4')) {
      return null;
    }
    return (
      <CustomPost
        key={item._id}
        post={item}
        userId={userId}
        countComment={item.comments.length}
        handleCommentButtonPress={handleCommentButtonPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            {profileImageUrl ? (
              <Avatar.Image size={40} source={{uri: profileImageUrl}} />
            ) : (
              <Avatar.Text
                size={40}
                label={username ? username[0].toUpperCase() : 'SA'}
              />
            )}
          </TouchableOpacity>
          <View style={styles.textinputContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search ..."
              style={styles.input}
              placeholderTextColor="#fff"
              onFocus={handleSearchBarFocus}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 16,
          }}>
          <View></View>
          <View></View>
          <View></View>
          <View style={styles.topContainerButtons}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === 'Creator'
                  ? {backgroundColor: '#019acd'}
                  : {},
              ]}>
              <TouchableOpacity onPress={() => handleButtonPress('My Circle')}>
                <Text
                  style={[
                    styles.button1Text,
                    selectedButton === 'My Circle'
                      ? {backgroundColor: '#019acd'}
                      : {color: '#444444'},
                  ]}>
                  My Circle
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonPress('Creator')}>
                <Text
                  style={[
                    styles.button2Text,
                    selectedButton === 'Creator'
                      ? {backgroundColor: '#019acd'}
                      : {color: '#444444'},
                  ]}>
                  Creator
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 15,
              marginTop: 15,
            }}>
            <Image
              source={NotificationIcon}
              style={{width: 28, height: 28, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {isRefreshing ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : selectedButton === 'My Circle' ? (
          <FlatList
            data={fetchedPosts}
            renderItem={renderCustomPost}
            keyExtractor={item => item._id}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={2.7}
          />
        ) : (
          <View
            style={{
              height: height - verticalScale(215),
            }}>
            <SwiperFlatList
              vertical={true}
              data={filteredVideos}
              keyExtractor={item => item._id}
              onEndReached={handleLoadMore}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              onEndReachedThreshold={3}
              onChangeIndex={onChangeIndex}
              renderItem={({item, index}: any) => (
                <ReelsComponent
                  post={item}
                  index={index}
                  currIndex={focusedIndex}
                  userId={userId}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#292b2d',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 5,
    backgroundColor: '#353535',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(5),
  },
  searchbar: {
    backgroundColor: '#5a5b5c',
    borderRadius: 0,
    width: '85%',
    height: verticalScale(3),
  },
  topContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#373638',
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  button1Text: {
    backgroundColor: '#373638',
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(33),
    color: '#fff',
  },
  button2Text: {
    borderBottomRightRadius: 40,
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(32),
    color: '#fff',
  },
  input: {
    width: '100%',
    marginHorizontal: horizontalScale(5),
  },
  searchIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    tintColor: '#fff',
    marginLeft: horizontalScale(10),
  },
  textinputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2d2f',
    marginBottom: -verticalScale(5),
    paddingHorizontal: horizontalScale(25),
    width: '85%',
  },
});

export default HomeScreen;
