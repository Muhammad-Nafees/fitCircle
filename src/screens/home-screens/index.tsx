import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  ParamListBase,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
// ---------------------------------------------------------------------//
import {RootState} from '../../redux/store';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import NotificationIcon from '../../../assets/icons/NotificationIcon';
const SearchIcon = require('../../../assets/icons/search.png');
import {
  IMyCirclePosts,
  setAllPosts,
  setPagination,
  setSelectedPost,
} from '../../redux/postSlice';
// import {PostsData} from '../dummyData';
import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import MyCirclePosts from '../../components/home-components/MyCirclePosts';
import {getPosts, getVideoPosts} from '../../api/home-module';
import CreatorPosts from '../../components/home-components/CreatorPosts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
  const [userId, setUserId] = useState<any>(userData?._id);
  const [selectedButton, setSelectedButton] = useState('My Circle');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();
  const route = useRoute();

  const [myCircleData, setMycirleData] = useState<any>();
  const [creatorData, setCreatorData] = useState<any>();
  const [creatorPage, setCreatorPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [hasMoreCirclePosts, setHasMoreCirclePosts] = useState<boolean>(false);
  const [hasMoreVideos, setHasMoreVideos] = useState<boolean>(false);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const selectedPosts = useSelector(
    (state: RootState) => state.post.selectedPost,
  );

  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 0],
    outputRange: [0, -0],
  });

  const handleSearchBarFocus = () => {
    navigation.navigate('Search' as never);
  };

  const handleCommentButtonPress = (selectedPost: any, id: string) => {
    console.log(selectedPost, 'selectedpppp');
    dispatch(setSelectedPost(selectedPost));
    navigation.navigate('CommentsScreen', {id: id});
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
  };

  const handleButtonPress = (button: string) => {
    setSelectedButton(button);
  };

  useFocusEffect(
    useCallback(() => {
      console.log('useEffect running');
      const fetchMyCirclePosts = async () => {
        setIsLoading(true);
        try {
          const response = await getPosts(page, limit);
          const data = response?.data?.data;
          if (myCircleData && isLoadMore) {
            setMycirleData((prevData: any) => {
              return [...prevData, ...data?.posts];
            });
          } else {
            setMycirleData(data?.posts);
          }
          setHasMoreCirclePosts(data?.pagination?.hasNextPage);
          // dispatch(setPagination(data?.pagination));
          setIsLoadMore(false);
          setIsRefreshing(false);
        } catch (error: any) {
          console.log(error?.response, 'Error fetching my circle posts!');
        }
        setIsLoading(false);
      };
      fetchMyCirclePosts();
    }, [page, isRefreshing, isFocused]),
  );

  const loadMoreItems = () => {
    if (hasMoreCirclePosts) {
      setIsLoadMore(true);
      setPage((prevPage: number) => prevPage + 1);
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
          if (creatorData) {
            setCreatorData((prevData: any) => {
              return [...prevData, ...data?.posts];
            });
          } else {
            setCreatorData(data?.posts);
          }
          setHasMoreVideos(data?.pagination?.hasNextPage);
          // dispatch(setPagination(data?.pagination));
        } catch (error: any) {
          console.log(error, 'Error fetching my circle posts!');
        }
        setIsLoading(false);
      };
      fetchVideos();
    }, [page]),
  );

  const loadMoreVideos = () => {
    if (hasMoreCirclePosts) {
      setCreatorPage((prevPage: number) => prevPage + 1);
    }
    return;
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.topContainer, {transform: [{translateY: translateY}]}]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile' as never)}>
            <CustomProfileAvatar
              username={userData?.username as string}
              profileImage={userData?.profileImage as any}
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
        {
          // isRefreshing ? (
          //   <ActivityIndicator size="large" color="#ffffff" />
          // ) :
          selectedButton === 'My Circle' ? (
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
              isProfile={true}
              handleRefresh={handleRefresh}
            />
          )
        }
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
