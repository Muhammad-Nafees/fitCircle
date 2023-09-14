import React, {useState, useEffect, useMemo} from 'react';
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
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-paper';
// ---------------------------------------------------------------------//
import {RootState} from '../../redux/store';
import {CustomPost} from '../../components/home-components/CustomPost';
import {ReelsComponent} from '../../components/home-components/Reels';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import NotificationIcon from '../../../assets/icons/NotificationIcon';
import {
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
} from '../../redux/postSlice';
const SearchIcon = require('../../../assets/icons/search.png');
import {setSelectedPost} from '../../redux/postSlice';
import {PostsData} from '../dummyData';

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
  const [fetchedPosts, setFetchedPosts] = useState<any>(PostsData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();

  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 0],
    outputRange: [0, -0],
  });

  const handleSearchBarFocus = () => {
    navigation.navigate('Search' as never);
  };

  const handleCommentButtonPress = (selectedPost: any, userId: any) => {
    dispatch(setSelectedPost(selectedPost));
    navigation.navigate('CommentsScreen', {userId});
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     handleRefresh();
  //   }, []),
  // );

  useEffect(() => {
    // setIsRefreshing(true);
    // setIsLoadingMore(false);
    setFetchedPosts(PostsData);
    dispatch(fetchPostsStart());
  }, []);

  const handleRefresh = () => {
    dispatch(setSelectedPost(null));
    setIsRefreshing(true);
  };

  const getVideoPosts = (allPosts: any) => {
    return allPosts.filter(
      (post: any) => post.media && post.media.endsWith('.mp4'),
    );
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
    const filteredData = filteredVideos.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
    );
    setFilteredVideos(filteredData);
  }, [filteredVideos]);

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
      <Animated.View
        style={[styles.topContainer, {transform: [{translateY: translateY}]}]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile' as never)}>
            {profileImageUrl ? (
              <Avatar.Image size={40} source={{uri: profileImageUrl}} />
            ) : (
              <Avatar.Text
                size={40}
                label={username ? username[0].toUpperCase() : 'SA'}
                style={{backgroundColor: '#5e01a9'}}
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
        <View style={styles.topContentContainer}>
          <View style={styles.topContainerButtons}>
            <View style={[styles.button]}>
              <TouchableWithoutFeedback
                onPress={() => handleButtonPress('My Circle')}>
                <Text
                  style={[
                    styles.button1Text,
                    selectedButton === 'My Circle'
                      ? {backgroundColor: '#019acd'}
                      : {color: '#444444'},
                  ]}>
                  My Circle
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => handleButtonPress('Creator')}>
                <Text
                  style={[
                    styles.button2Text,
                    selectedButton === 'Creator'
                      ? {backgroundColor: '#019acd'}
                      : {color: '#444444'},
                  ]}>
                  Creator
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <NotificationIcon />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        {isRefreshing ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : selectedButton === 'My Circle' ? (
          <FlatList
            data={fetchedPosts}
            renderItem={renderCustomPost}
            keyExtractor={(item: any) => item._id}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            // onEndReached={handleLoadMore}
            onEndReachedThreshold={2.7}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
          />
        ) : (
          <View
            style={{
              width: width,
              height: height - 120 - tabBarHeight,
            }}>
            <SwiperFlatList
              onScroll={e => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}
              vertical={true}
              data={filteredVideos}
              keyExtractor={item => item._id}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              onEndReachedThreshold={3}
              onChangeIndex={i => console.log(i)}
              renderItem={({item, index}: any) => (
                <ReelsComponent
                  post={item}
                  index={index}
                  userId={userId}
                  tabBarHeight={tabBarHeight}
                  isProfile={true}
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
    backgroundColor: '#292a2c',
    justifyContent: 'center',
    height: 120,
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
    margin: 'auto',
    flex: 1,
    paddingLeft: 25,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
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
    zIndex: 999,
  },
  button2Text: {
    backgroundColor: '#373638',
    borderBottomRightRadius: 40,
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(32),
    color: '#fff',
    marginLeft: -20,
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
  notificationIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 15,
  },
  topContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
});

export default HomeScreen;
