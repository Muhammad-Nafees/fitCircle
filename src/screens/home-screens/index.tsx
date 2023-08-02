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
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Avatar} from 'react-native-paper';
import {CustomPost} from '../../components/home-components/CustomPost';
import {ReelsComponent} from '../../components/home-components/Reels';
import {useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
const SearchIcon = require('../../../assets/icons/search.png');
import Carousel from 'react-native-reanimated-carousel';
const NotificationIcon = require('../../../assets/icons/notification.png');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const HomeScreen = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  console.log(userData);
  const username = userData?.username;
  const [userId, setUserId] = useState(userData?._id);
  const [posts, setPosts] = useState([]);
  const [selectedButton, setSelectedButton] = useState('My Circle');
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [listKey, setListKey] = useState<number>(0);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState();

  const handleSearchBarFocus = () => {
    navigation.navigate('Search');
  };

  useEffect(() => {
    setIsRefreshing(true);
    fetchPosts();
    setUserId(userData?._id);
  }, []);

  useEffect(() => {
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  useEffect(() => {
    const videoPosts = posts.filter(
      post => post.media && post.media.endsWith('.mp4'),
    );
    setFilteredVideos(videoPosts);
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://fit-circle.cyclic.app/posts/');
      const data = await response.json();
      setPosts(data);
      setIsRefreshing(false);
      setListKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            key={listKey}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            onRefresh={() => handleRefresh()}
            refreshing={isRefreshing}
          />
        ) : (
          <View style={{flex: 1}}>
            <Carousel
              width={width}
              height={height - verticalScale(185)}
              windowSize={2}
              vertical={true}
              data={filteredVideos}
              onSnapToItem={setCurrentIndex}
              renderItem={({item, index}: any) => (
                <ReelsComponent
                  post={item}
                  isFocused={currentIndex === index}
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
