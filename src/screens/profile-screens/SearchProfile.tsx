import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
// -----------------------------------------------------------------------//
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CustomButton from '../../components/shared-components/CustomButton';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SearchCommunityItem,
  SearchProfleItem,
  SearchFollowingItem,
} from '../../components/profile-components/SearchProfleItem';
import {SearchOptionContainer} from '../../components/profile-components/SearchOptionContainer';
import {CustomConfirmationModal} from '../../components/shared-components/CustomModals';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  getFollowersList,
  getFollowingList,
  getSubscribedCommunities,
  removeFollower,
  followToggle as unFollow,
  communitiesToggle as unSubscribeCommunity,
} from '../../api/profile-module';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {unFollowUser} from '../../redux/profileSlice';
const BackArrowIcon = require('../../../assets/icons/arrow-back.png');
const SearchIcon = require('../../../assets/icons/search.png');

const capitalizeFirstLetter = (text: string) => {
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
  const [modalOpenFor, setModalOpenFor] = useState<any>(null);
  const [removedCommunities, setRemovedCommunities] = useState<string[]>([]);

  const [data, setData] = useState<any>();
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const followersList = useSelector(
    (state: RootState) => state.profile.followersList,
  );
  const followingsList = useSelector(
    (state: RootState) => state.profile.followingsList,
  );
  const communitesList = useSelector(
    (state: RootState) => state.profile.communitiesList,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedOption(route.params.default);
    console.log(route.params.default);
  }, [route]);

  const fetchFollowersList = async () => {
    setData(followersList);
  };
  const fetchFollowingList = async () => {
    setData(followingsList);
  };
  const fetchCommunityList = async () => {
    setData(communitesList);
  };

  useEffect(() => {
    console.log('iam running!!!!!');
    if (selectedOption == 'followers') {
      fetchFollowersList();
    } else if (selectedOption == 'following') {
      fetchFollowingList();
    } else {
      fetchCommunityList();
    }
  }, [selectedOption, followersList, followingsList, communitesList]);

  const handleUnSubscribeCommunity = async () => {
    try {
      const response = await unSubscribeCommunity(modalOpenFor);
      setIsDeleted(true);
    } catch (error: any) {
      console.log(error?.response?.data, 'From unsubscribe community!');
    }
  };

  const handleUnFollow = async () => {
    try {
      const response = await unFollow(modalOpenFor);
      dispatch(unFollowUser(modalOpenFor));
      setIsDeleted(true);
    } catch (error: any) {
      console.log(error?.response?.data, 'From unsubscribe community!');
    }
  };

  const handleRemoveFollower = async () => {
    try {
      const response = await removeFollower(modalOpenFor);
      setIsDeleted(true);
    } catch (error: any) {
      console.log(error?.response?.data, 'From unsubscribe community!');
    }
  };

  const onRemove = () => {
    setModalVisible(false);
    if (selectedOption == 'community') {
      handleUnSubscribeCommunity();
    } else if (selectedOption == 'following') {
      handleUnFollow();
    } else {
      handleRemoveFollower();
    }
  };

  const toggleModal = () => {
    if (selectedOption === 'following') {
      handleModalConfirm(true, modalOpenFor, 'following');
    } else if (selectedOption === 'community') {
      handleModalConfirm(true, modalOpenFor, 'community');
    } else if (selectedOption === 'followers') {
      handleModalConfirm(true, modalOpenFor, 'followers');
    } else setModalVisible(!isModalVisible);
  };

  const handleSearch = (searchText: string) => {
    setSearchInput(searchText);
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

  const handleModalConfirm = (
    confirmed: boolean,
    itemId: string,
    actionType: string,
  ) => {
    if (confirmed) {
      if (actionType === 'community') {
        const updatedRemovedCommunity = removedCommunities.includes(itemId)
          ? removedCommunities.filter(id => id !== itemId)
          : [...removedCommunities, itemId];
        setRemovedCommunities(updatedRemovedCommunity);
      }
    }
    setModalOpenFor(null);
    setModalVisible(false);
  };

  useFocusEffect(() => {
    const backAction = () => {
      navigation.navigate('Profile');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });

  const renderItem = ({item}: any) => {
    const handleToggleRemove = (id: string) => {
      console.log(id, 'idd');
      setModalOpenFor(id);
      setModalVisible(true);
    };
    return (
      <SearchProfleItem
        onToggle={handleToggleRemove}
        item={item}
        selectedOption={selectedOption}
      />
    );
  };
  console.log(data, 'ff');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.navigate('Profile')}>
        <Image source={BackArrowIcon} style={styles.backArrowIcon} />
      </TouchableOpacity>
      <SearchOptionContainer
        onPressFollowers={() => setSelectedOption('followers')}
        onPressFollowing={() => setSelectedOption('following')}
        onPressCommunity={() => setSelectedOption('community')}
        selectedOption={selectedOption}
      />
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
        <View style={styles.headingContainer}>
          <Text style={styles.selectedOptionText}>
            All {capitalizeFirstLetter(selectedOption)}
          </Text>
        </View>
        {isLoading ? (
          <CustomLoader />
        ) : data == undefined || data.length == 0 ? (
          <Text style={{color: 'white', fontSize: 13}}>
            {' '}
            No {selectedOption} yet!
          </Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item: any) => item._id}
            renderItem={renderItem}
          />
        )}
      </View>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackButtonPress={toggleModal}>
        <CustomConfirmationModal
          onCancel={toggleModal}
          onConfirm={onRemove}
          modalText={`Are you sure you want to ${
            selectedOption === 'followers'
              ? 'remove this person'
              : selectedOption === 'following'
              ? 'unfollow this person'
              : `unsubscribe ${communityName}`
          }?`}
          confirmText="Yes"
          cancelText="No"
          confirmColor="rgba(32, 128, 183, 1)"
          cancelColor="rgba(220, 77, 77, 1)"
          highlightedWord={
            selectedOption === 'followers'
              ? 'remove'
              : selectedOption === 'following'
              ? 'unfollow'
              : 'unsubscribe'
          }
        />
      </Modal>
      <Modal
        isVisible={followModal}
        style={styles.modal}
        onBackButtonPress={() => setFollowModal(false)}>
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
  headingContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 10,
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
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '100%',
    margin: 0,
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
