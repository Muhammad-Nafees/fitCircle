import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {Avatar} from 'react-native-paper';

const BackArrowIcon = require('../../../assets/icons/arrow-back.png');
const SearchIcon = require('../../../assets/icons/search.png');

const SearchProfileScreen = ({route, navigation}: any) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    route.params.default,
  );
  const [searchInput, setSearchInput] = useState('');
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [filteredFollowing, setFilteredFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [community, setCommunity] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);

  useEffect(() => {
    setSelectedOption(route.params.default);
  }, [route]);

  useEffect(() => {
    if (route.params?.followers) {
      setFollowers(route.params?.followers);
      setFilteredFollowers(route.params?.followers);
    }
    if (route.params?.following) {
      setFollowing(route.params?.following);
      setFilteredFollowing(route.params?.following);
    }
    if (route.params?.communities) {
      setFilteredCommunities(route.params?.communities);
      setCommunity(route.params?.communities);
    }
  }, []);

  const handleSearch = (searchText: string) => {
    setSearchInput(searchText);
    if (selectedOption === 'followers') {
      const filteredFollowersList = followers.filter(item =>
        item.username.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredFollowers(filteredFollowersList);
    } else if (selectedOption === 'following') {
      const filteredFollowingList = following.filter(item =>
        item.username.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredFollowing(filteredFollowingList);
    } else if (selectedOption === 'community') {
      const filteredCommunitiesList = community.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredCommunities(filteredCommunitiesList);
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    if (selectedOption === 'followers') {
      setFilteredFollowers(followers);
    } else if (selectedOption === 'following') {
      setFilteredFollowing(following);
    } else if (selectedOption === 'community') {
      setFilteredCommunities(community);
    }
  };

  const renderProfileItem = ({item}: any) => {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          {item.profileImageUrl ? (
            <Avatar.Image size={40} source={{uri: item.profileImageUrl}} />
          ) : (
            <Avatar.Text
              size={40}
              label={item.username ? item.username[0].toUpperCase() : 'SA'}
            />
          )}
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.username}</Text>
          </View>
        </View>
        {selectedOption === 'followers' && (
          <TouchableOpacity style={styles.removeButtonContainer}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        )}
        {selectedOption === 'following' && (
          <TouchableOpacity style={styles.removeButtonContainer}>
            <Text style={styles.remove}>Unfollow</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}>
        <Image source={BackArrowIcon} style={styles.backArrowIcon} />
      </TouchableOpacity>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          onPress={() => setSelectedOption('followers')}
          style={[
            styles.option,
            selectedOption === 'followers' && styles.selectedOption,
          ]}>
          <Text style={styles.optionText}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedOption('following')}
          style={[
            styles.option,
            selectedOption === 'following' && styles.selectedOption,
          ]}>
          <Text style={styles.optionText}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedOption('community')}
          style={[
            styles.option,
            selectedOption === 'community' && styles.selectedOption,
          ]}>
          <Text style={styles.optionText}>Community</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.textinputContainer}>
          <Image source={SearchIcon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search ..."
            style={styles.input}
            placeholderTextColor="#fff"
            value={searchInput}
            onChangeText={handleSearch}
            onEndEditing={clearSearch}
          />
        </View>
        {(selectedOption === 'followers' || selectedOption === 'following') && (
          <FlatList
            data={
              selectedOption === 'followers'
                ? filteredFollowers
                : filteredFollowing
            }
            keyExtractor={item => item._id}
            renderItem={renderProfileItem}
          />
        )}
        {selectedOption === 'community' && (
          <FlatList
            data={filteredCommunities}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View style={styles.profileContainer}>
                <View style={styles.profileInfo}>
                  {item.photo ? (
                    <Avatar.Image size={40} source={{uri: item.photo}} />
                  ) : (
                    <Avatar.Text
                      size={40}
                      label={item.name ? item.name[0].toUpperCase() : 'SA'}
                    />
                  )}
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text
                      style={
                        styles.members
                      }>{`${item.membersCount} Members`}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.removeButtonContainer}>
                  <Text style={styles.remove}>Unsubscribe</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
  },
  backArrowIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  backIconContainer: {
    justifyContent: 'flex-start',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    borderBottomWidth: 3,
    borderColor: '#444444',
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    color: '#444444',
    fontSize: 12,
  },
  selectedOption: {
    borderBottomColor: '#209BCC',
    borderBottomWidth: 3,
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
    paddingHorizontal: horizontalScale(40),
    marginVertical: 10,
    width: '100%',
  },
  input: {
    width: '100%',
    marginHorizontal: horizontalScale(20),
  },
  bottomContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    flex: 1,
    width: '70%',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  removeButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  nameContainer: {
    marginLeft: 10,
  },
  name: {
    color: '#fff',
    fontSize: 12,
  },
  remove: {
    color: '#209BCC',
    fontSize: 12,
  },
  members: {
    fontSize: 10,
    color: '#fff',
  },
});

export default SearchProfileScreen;
