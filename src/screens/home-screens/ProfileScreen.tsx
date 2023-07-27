import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import axiosInstance from '../../api/interceptor';
import {CustomPost} from '../../components/home-components/CustomPost';
import {Favorites} from '../../components/home-components/Favourites';

const BackArrowIcon = require('../../../assets/icons/arrow-back.png');

export const ProfileScreen = ({navigation, route}: any) => {
  const userData = useSelector((state: RootState) => state.auth.user);
  console.log('userData', userData);
  const coverImageUrl = userData?.coverImage;
  const username = userData?.username;
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [communities, setCommunities] = useState([]);
  const [firstName, setFirstName] = useState<string | undefined>(
    userData?.firstName,
  );
  const [lastName, setLastName] = useState<string | undefined>(
    userData?.lastName,
  );
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [email, setEmail] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState<string>('Feed');
  const [favoritesPost, setFavoritesPost] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setUserId(userData?._id);
    setPosts(route.params?.posts);

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

  // const userFavoritePosts = route.params?.posts?.filter((post: any) => {
  //   return post.favorites.some((favorite: any) => favorite._id === userId);
  // });

  const filteredPostsWithoutVideo = posts?.filter(
    post => post.user?._id === userData?._id && !post.media?.endsWith('.mp4'),
  );

  const renderPostItem = ({item}: any) => (
    <CustomPost key={item._id} userId={userId} post={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={BackArrowIcon} style={styles.backIcon} />
        </TouchableOpacity>
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
          <Text style={styles.email}>{email}</Text>
        </View>
        <View style={styles.rowContainer}>
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
      </View>
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
              selectedOption === 'Video' && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption('Video')}>
            <Text
              style={[
                styles.optionText,
                selectedOption === 'Video' && styles.selectedOptionText,
              ]}>
              Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === 'Favorites' && styles.selectedOption,
            ]}
            onPress={() => {
              setSelectedOption('Favorites'), console.log(userId);
            }}>
            <Text
              style={[
                styles.optionText,
                selectedOption === 'Favorites' && styles.selectedOptionText,
              ]}>
              Favorites
            </Text>
          </TouchableOpacity>
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
            {favoritesPost.map(favPost => (
              <Favorites key={favPost._id} post={favPost} />
            ))}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '60%',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
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
    backgroundColor: '#ccc',
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
  backButton: {
    zIndex: 1,
    alignSelf: 'flex-start',
    marginHorizontal: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  columnLabel: {
    fontSize: 10,
    color: '#209BCC',
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
    height: '100%',
    width: '100%',
  },
});
