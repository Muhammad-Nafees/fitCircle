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
import Modal from 'react-native-modal';
import CustomButton from '../../components/shared-components/CustomButton';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const BackArrowIcon = require('../../../assets/icons/arrow-back.png');
const SearchIcon = require('../../../assets/icons/search.png');

const capitalizeFirstLetter = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const SearchProfileScreen = ({route, navigation}: any) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    route.params.default,
  );
  const [followModal, setFollowModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [filteredFollowing, setFilteredFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [community, setCommunity] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [removedFollowers, setRemovedFollowers] = useState<string[]>([]);
  const [modalOpenFor, setModalOpenFor] = useState<string | null>(null);
  const [removedCommunities, setRemovedCommunities] = useState<Set<string>[]>(
    [],
  );

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearch = (searchText: string) => {
    setSearchInput(searchText);
  };

  useEffect(() => {
    if (searchInput === '') {
      if (selectedOption === 'followers') {
        setFilteredFollowers(followers);
      } else if (selectedOption === 'following') {
        setFilteredFollowing(following);
      } else if (selectedOption === 'community') {
        setFilteredCommunities(community);
      }
    } else {
      if (selectedOption === 'followers') {
        const filteredFollowersList = followers.filter(item =>
          item.username.toLowerCase().includes(searchInput.toLowerCase()),
        );
        setFilteredFollowers(filteredFollowersList);
      } else if (selectedOption === 'following') {
        const filteredFollowingList = following.filter(item =>
          item.username.toLowerCase().includes(searchInput.toLowerCase()),
        );
        setFilteredFollowing(filteredFollowingList);
      } else if (selectedOption === 'community') {
        const filteredCommunitiesList = community.filter(item =>
          item.name.toLowerCase().includes(searchInput.toLowerCase()),
        );
        setFilteredCommunities(filteredCommunitiesList);
      }
    }
  }, [searchInput, selectedOption, followers, following, community]);

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

  const handleModalConfirm = (confirmed: boolean, followerId: string) => {
    console.log(followerId);
    if (confirmed) {
      const updatedRemovedFollowers = removedFollowers.includes(followerId)
        ? removedFollowers.filter(id => id !== followerId)
        : [...removedFollowers, followerId];
      setRemovedFollowers(updatedRemovedFollowers);
    }
    setModalOpenFor(null);
    setModalVisible(false);
  };

  const renderProfileItem = ({item}: any) => {
    const isRemoved = removedFollowers.includes(item._id);
    const handleToggleRemove = (followerId: string) => {
      if (!isRemoved) {
        const updatedRemovedFollowers = [...removedFollowers, followerId];
        setRemovedFollowers(updatedRemovedFollowers);
      } else {
        const updatedRemovedFollowers = isRemoved
          ? removedFollowers.filter(id => id !== item._id)
          : [...removedFollowers, item._id];
        setModalName(`followed ${item.username}`);
        setFollowModal(true);
        setRemovedFollowers(updatedRemovedFollowers);
      }
      if (!isRemoved) {
        setModalVisible(true);
        setModalOpenFor(item._id);
      }
    };
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
          <TouchableOpacity
            style={styles.removeButtonContainer}
            onPress={handleToggleRemove}>
            <Text style={styles.remove}>{!isRemoved ? 'Remove' : 'Add'}</Text>
          </TouchableOpacity>
        )}
        {selectedOption === 'following' && (
          <TouchableOpacity
            style={styles.removeButtonContainer}
            onPress={toggleModal}>
            <Text style={styles.remove}>Unfollow</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderCommunityItem = ({item}) => {
    const isUnsubscribed = removedCommunities.some(set => set.has(item._id));
    const handleUnsubscribe = (communityId: string, communityName: string) => {
      const communityIndex = removedCommunities.findIndex(set =>
        set.has(communityId),
      );
      const isUnsubscribed = communityIndex !== -1;

      if (!isUnsubscribed) {
        const updatedRemovedCommunities = [...removedCommunities];
        updatedRemovedCommunities.push(new Set([communityId]));
        setRemovedCommunities(updatedRemovedCommunities);
      } else {
        const updatedRemovedCommunities = [...removedCommunities];
        updatedRemovedCommunities.splice(communityIndex, 1);
        setModalName(`joined ${item.name}`);
        setFollowModal(true);
        setRemovedCommunities(updatedRemovedCommunities);
      }

      if (!isUnsubscribed) {
        setModalVisible(true);
        setModalOpenFor(communityId);
        setCommunityName(communityName);
      }
    };
    return (
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
            <Text style={styles.members}>{`${item.membersCount} Members`}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeButtonContainer}
          onPress={() => handleUnsubscribe(item._id, item.name)}>
          <Text style={styles.remove}>
            {!isUnsubscribed ? 'Unsubscribe' : 'Join'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.navigate('Profile')}>
        <Image source={BackArrowIcon} style={styles.backArrowIcon} />
      </TouchableOpacity>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          onPress={() => setSelectedOption('followers')}
          style={[
            styles.option,
            selectedOption === 'followers' && styles.selectedOption,
          ]}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'followers' && {color: 'white'},
            ]}>
            Followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedOption('following')}
          style={[
            styles.option,
            selectedOption === 'following' && styles.selectedOption,
          ]}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'following' && {color: 'white'},
            ]}>
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedOption('community')}
          style={[
            styles.option,
            selectedOption === 'community' && styles.selectedOption,
          ]}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'community' && {color: 'white'},
            ]}>
            Community
          </Text>
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
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            marginVertical: 10,
          }}>
          <Text style={styles.selectedOptionText}>
            All {capitalizeFirstLetter(selectedOption)}
          </Text>
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
            renderItem={renderCommunityItem}
          />
        )}
      </View>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={styles.modalContent}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 30,
              paddingTop: 15,
              gap: 15,
            }}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
              Please Confirm
            </Text>
            <Text style={styles.whiteText}>
              Are you sure you want to{' '}
              {selectedOption === 'followers' ? (
                <Text style={styles.coloredText}>remove </Text>
              ) : selectedOption === 'following' ? (
                <Text style={styles.coloredText}>unfollow </Text>
              ) : (
                <>
                  <Text style={styles.coloredText}>unsubscribe</Text>
                  {selectedOption === 'community' && (
                    <Text> {communityName}</Text>
                  )}
                </>
              )}
              {selectedOption === 'followers' && <Text>this person</Text>}
              {selectedOption === 'following' && <Text>this person</Text>}?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.5)',
              width: '100%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: 'rgba(220, 77, 77, 1)',
                }}>
                No
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity
              onPress={() => handleModalConfirm(true, modalOpenFor)}
              style={styles.modalButton}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: 'rgba(32, 128, 183, 1)',
                }}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={followModal}
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={[styles.modalContent, {backgroundColor: 'transparent'}]}>
          <View style={styles.card}>
            <View style={styles.iconModal}>
              <Icon name="checkmark-outline" color="white" size={24} />
            </View>
            <Text style={[STYLES.text14, {marginTop: 2}]}>
              You {modalName}!
            </Text>
            <View style={{width: '75%', marginTop: verticalScale(25)}}>
              <CustomButton onPress={() => setFollowModal(false)}>
                Return
              </CustomButton>
            </View>
          </View>
        </View>
      </Modal>
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
    marginVertical: verticalScale(16),
    marginHorizontal: horizontalScale(16),
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    borderBottomWidth: 3,
    borderColor: '#444444',
  },
  option: {
    paddingVertical: verticalScale(10),
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
    marginVertical: verticalScale(10),
    width: '100%',
  },
  input: {
    width: '100%',
    marginHorizontal: horizontalScale(20),
    color: 'white',
  },
  bottomContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: horizontalScale(15),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(7),
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
    marginLeft: horizontalScale(10),
    gap: 4,
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
  selectedOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    borderRadius: 32,
    alignItems: 'center',
    marginHorizontal: horizontalScale(35),
  },
  modalButton: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(60),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  coloredText: {
    color: 'rgba(220, 77, 77, 1)',
    fontSize: 14,
    fontWeight: '500',
  },
  whiteText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginHorizontal: 28,
    textAlign: 'center',
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(271),
    height: verticalScale(180),
    borderRadius: 30,
  },
  iconModal: {
    width: horizontalScale(34),
    height: verticalScale(34),
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchProfileScreen;
