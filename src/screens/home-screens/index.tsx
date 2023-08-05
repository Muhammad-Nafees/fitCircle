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
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Avatar} from 'react-native-paper';
import {CustomPost} from '../../components/home-components/CustomPost';
import {ReelsComponent} from '../../components/home-components/Reels';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import axios from 'axios';
const SearchIcon = require('../../../assets/icons/search.png');
import Carousel from 'react-native-reanimated-carousel';
const NotificationIcon = require('../../../assets/icons/notification.png');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const HomeScreen = ({route}: any) => {
  const userData = useSelector((state: RootState) => state.auth.user);
  console.log(userData);
  const username = userData?.username;
  const [userId, setUserId] = useState(userData?._id);
  const [posts, setPosts] = useState([]);
  const [selectedButton, setSelectedButton] = useState('My Circle');
  const navigation = useNavigation();
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [isPostUploaded, setIsPostUploaded] = useState(false);

  const handleSearchBarFocus = () => {
    navigation.navigate('Search');
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, []),
  );
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPosts();
  };

  useEffect(() => {
    if (isPostUploaded) {
      setIsRefreshing(true);
      fetchPosts();
      setIsPostUploaded(false);
    }
  }, [isPostUploaded]);

  useEffect(() => {
    if (route.params?.newPostData) {
      const newPostData = route.params?.newPostData;
      if (newPostData) {
        setPosts(prevPosts => [newPostData, ...prevPosts]);
        setIsPostUploaded(true);
      }
    }
  }, [route.params?.newPostData]);

  useEffect(() => {
    setUserId(userData?._id);
    handleButtonPress('My Circle');
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  useEffect(() => {
    const videoPosts = posts.filter(
      post => post.media && post.media.endsWith('.mp4'),
    );
    setFilteredVideos(videoPosts);
  }, [posts]);

  const API_BASE_URL = 'https://glorious-tan-gilet.cyclic.cloud/';
  const fetchPosts = async () => {
    setIsPostUploaded(false);
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      const data = response.data;
      console.log(data);
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('Invalid data format from API:', data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleButtonPress = (button: string) => {
    setSelectedButton(button);
  };

  const renderCustomPost = ({item}: any) => {
    if (item && item.media && item.media.endsWith('.mp4')) {
      return null;
    }
    return <CustomPost post={item} userId={userId} />;
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
              style={{width: 24, height: 24, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {isRefreshing ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : selectedButton === 'My Circle' ? (
          <FlatList
            data={posts}
            renderItem={renderCustomPost}
            keyExtractor={item => item._id}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        ) : (
          <View style={{flex: 1}}>
            <Carousel
              width={width}
              height={height - verticalScale(185)}
              windowSize={2}
              vertical={true}
              data={filteredVideos}
              onSnapToItem={index => {}}
              pagingEnabled={true}
              renderItem={({item}: any) => (
                <ReelsComponent post={item} isFocused={false} userId={userId} />
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
    backgroundColor: '#2c2d2e',
    borderRadius: 0,
    width: '85%',
    height: verticalScale(34),
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
    paddingHorizontal: horizontalScale(25),
    width: '85%',
  },
});

export default HomeScreen;
