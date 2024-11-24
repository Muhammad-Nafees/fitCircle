import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  ParamListBase,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import NotificationIcon from '../../../assets/icons/NotificationIcon';
const SearchIcon = require('../../../assets/icons/search.png');
import {
  IMyCirclePosts,
  setAllPosts,
  setPagination,
  setSelectedPost,
} from '../../redux/postSlice';

import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import MyCirclePosts from '../../components/home-components/MyCirclePosts';
import { deletePost, getPosts, getVideoPosts } from '../../api/home-module';
import CreatorPosts from '../../components/home-components/CreatorPosts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { setTrainerView } from '../../redux/profileSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const [userId, setUserId] = useState(userData?._id);
  const [selectedButton, setSelectedButton] = useState('My Circle');
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();
  const [myCircleData, setMycirleData] = useState();
  const [creatorData, setCreatorData] = useState();
  const [creatorPage, setCreatorPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(40);
  const [hasMoreCirclePosts, setHasMoreCirclePosts] = useState(false);
  const [hasMoreVideos, setHasMoreVideos] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 0],
    outputRange: [0, -0],
  });

  const handleSearchBarFocus = () => {
    navigation.navigate('Search');
  };

  const handleCommentButtonPress = (selectedPost, id) => {
    dispatch(setSelectedPost(selectedPost));
    navigation.navigate('CommentsScreen', { id: id });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
  };

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchMyCirclePosts = async () => {
        setIsLoading(true);
        try {
          const response = await getPosts(page, limit);
          const data = response?.data?.data;
          if (myCircleData && isLoadMore) {
            setMycirleData((prevData) => {
              return [...prevData, ...data?.posts];
            });
          } else {
            setMycirleData(data?.posts);
          }
          setHasMoreCirclePosts(data?.pagination?.hasNextPage);
          setIsLoadMore(false);
          setIsRefreshing(false);
        } catch (error) {
          console.log(error?.response, 'Error fetching my circle posts!');
        }
        setIsLoading(false);
      };
      dispatch(setTrainerView(false));
      fetchMyCirclePosts();
    }, [page, isRefreshing, isFocused, creatorPage]),
  );

  const loadMoreItems = () => {
    if (hasMoreCirclePosts) {
      setIsLoadMore(true);
      setPage((prevPage) => prevPage + 1);
    }
    return;
  };

  useFocusEffect(
    useCallback(() => {
      const fetchVideos = async () => {
        setIsLoading(true);
        try {
          const response = await getVideoPosts(creatorPage, limit);
          const data = response?.data?.data;

          setCreatorData(data?.posts);
          setHasMoreVideos(data?.pagination?.hasNextPage);
        } catch (error) {
          console.log(error, 'Error fetching my creator posts!');
        }
        setIsLoading(false);
      };
      fetchVideos();
    }, [creatorPage, page, selectedButton]),
  );

  const loadMoreVideos = () => {
    if (hasMoreCirclePosts) {
      setCreatorPage((prevPage) => prevPage + 1);
    }
    return;
  };

  const handleDeleteVideo = async (id) => {
    try {
      const response = await deletePost(id);
      const responseData = response?.data;
      setCreatorData(1);
      setSelectedButton('My Circle');
      Toast.show({
        type: 'success',
        text1: `${responseData?.message}`,
      });
    } catch (error) {
      console.log(error?.response?.data?.message, 'From delete video');
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.topContainer, { transform: [{ translateY: translateY }] }]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', { isFollowing: false })
            }>
            <CustomProfileAvatar
              username={userData?.username}
              profileImage={userData?.profileImage}
            />
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
                      ? { backgroundColor: '#019acd' }
                      : { color: '#444444' },
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
                      ? { backgroundColor: '#019acd' }
                      : { color: '#444444' },
                  ]}>
                  Creator
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => navigation.navigate('Notification')}>
            <NotificationIcon />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        {selectedButton === 'My Circle' ? (
          <MyCirclePosts
            data={myCircleData}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            handleRefresh={handleRefresh}
            loadMoreItems={loadMoreItems}
            handleCommentButtonPress={handleCommentButtonPress}
          />
        ) : (
          <CreatorPosts
            data={creatorData}
            userId={userId}
            tabBarHeight={tabBarHeight}
            isProfile={false}
            handleRefresh={handleRefresh}
            onDeletePost={handleDeleteVideo}
          />
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
    paddingHorizontal: 16,
    paddingTop: 5,
  },
  searchbar: {
    backgroundColor: '#5a5b5c',
    borderRadius: 0,
    width: '85%',
    height: 3,
  },
  topContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
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
    paddingVertical: 5,
    paddingHorizontal: 33,
    color: '#fff',
    zIndex: 999,
  },
  button2Text: {
    backgroundColor: '#373638',
    borderBottomRightRadius: 40,
    paddingVertical: 4,
    paddingHorizontal: 32,
    color: '#fff',
    marginLeft: -20,
  },
  input: {
    width: '100%',
    marginHorizontal: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginLeft: 10,
  },
  textinputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2d2f',
    marginBottom: -5,
    paddingHorizontal: 25,
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
