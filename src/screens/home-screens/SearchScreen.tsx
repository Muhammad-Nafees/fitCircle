import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {UserSearch} from '../../components/home-components/UserSearch';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/shared-components/CustomButton';
import {STYLES} from '../../styles/globalStyles';
import {searchProfile, searchTrainerProfile} from '../../api/profile-module';
import {useDispatch, useSelector} from 'react-redux';
import {setUserProfile} from '../../redux/authSlice';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {RootState} from '../../redux/store';

const SearchIcon = require('../../../assets/icons/search.png');
const FilterIcon = require('../../../assets/icons/filter.png');
const ArrowBack = require('../../../assets/icons/arrow-back.png');

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followModal, setFollowModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [message, setMessage] = useState<string>('');
  const userData = useSelector((state: RootState) => state.auth.user);

  const handleSearchBarBlur = () => {
    setIsSearchActive(false);
  };

  const dropdownOptions = ['Nutritionist', 'Trainer', 'Other'];

  const showFilterOptions = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleFilterSelection = (option: any) => {
    setSelectedFilter(option.toLowerCase());
    setIsSearchActive(false);
  };

  const handleBackButtonPress = () => {
    setSearchQuery('');
    navigation.goBack();
  };

  const handleFollowButton = (name: string) => {
    setModalName(name);
    setFollowModal(!followModal);
  };

  let placeholderText = selectedFilter
    ? `Search ${selectedFilter} ...`
    : 'Search';

  const renderItem = ({item}: any) => {
    return (
      <UserSearch
        searchProfileData={item}
        username={item.username}
        email={item.email}
        profileImage={item.profileImage}
        handleFollowButton={handleFollowButton}
      />
    );
  };

  const handleSearchProfile = async () => {
    setIsLoading(true);
    console.log(selectedFilter, 'SelectedFilter');
    try {
      if (selectedFilter == 'other' || selectedFilter == null) {
        const response = await searchProfile(searchQuery);
        console.log('from user   search');
        const users = response?.data?.data?.users;
        setSearchData(users);
        setMessage('No users Found!');
      } else {
        const response = await searchTrainerProfile(selectedFilter,searchQuery);
        const users = response?.data?.data?.users;
        setSearchData(users);
        setMessage(`No ${selectedFilter} Found!`);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error?.response?.data, 'from search profile!');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topContainer]}>
        <TouchableOpacity onPress={handleBackButtonPress}>
          <Image source={ArrowBack} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <TouchableOpacity style={styles.searchButton}>
              <Image source={SearchIcon} style={styles.icon} />
            </TouchableOpacity>
            <TextInput
              autoFocus={true}
              placeholder={placeholderText}
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onBlur={handleSearchBarBlur}
              placeholderTextColor="#fff"
            />
            {userData?.role === 'user' && (
              <TouchableOpacity
                style={styles.searchButton}
                onPress={showFilterOptions}>
                <Image source={FilterIcon} style={styles.icon} />
              </TouchableOpacity>
            )}
          </View>
          {isSearchActive ? (
            <View style={styles.searchOverlay}>
              <View style={styles.dropdownContainer}>
                {dropdownOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleFilterSelection(option)}>
                    <Text
                      style={[
                        styles.dropdownItemText,
                        index === 2 ? {borderBottomWidth: 0} : null,
                      ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}
        </View>
        <TouchableOpacity onPress={handleSearchProfile}>
          <Text style={styles.submitButton}>
            {isLoading ? <CustomLoader /> : 'Search'}{' '}
          </Text>
        </TouchableOpacity>
      </View>

      {searchData?.length > 0 ? (
        <FlatList
          data={searchData}
          renderItem={renderItem}
          keyExtractor={(item: any) => item._id}
          keyboardShouldPersistTaps="handled"
        />
      ) : message !== '' ? (
        <Text style={{fontSize: 14, color: 'white', padding: 10}}>
          {message}
        </Text>
      ) : null}

      <Modal
        isVisible={followModal}
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={styles.modalContent}>
          <View style={styles.card}>
            <View style={styles.iconModal}>
              <Icon name="checkmark-outline" color="white" size={24} />
            </View>
            <Text style={[STYLES.text14, {marginTop: 2}]}>
              You followed {modalName}
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
    backgroundColor: '#292b2d',
    flex: 1,
    padding: moderateScale(10),
  },
  topContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
    zIndex: 1000,
  },
  searchBarContainer: {
    marginHorizontal: horizontalScale(10),
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2f',
    justifyContent: 'flex-start',
    borderRadius: 8,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: moderateScale(13),
    color: '#fff',
    marginLeft: horizontalScale(8),
  },
  searchButton: {
    padding: moderateScale(8),
    backgroundColor: 'transparent',
  },
  icon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    tintColor: '#fff',
  },
  searchOverlay: {
    position: 'absolute',
    top: '100%',
    backgroundColor: '#444545',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropdownContainer: {
    backgroundColor: '#444545',
    padding: moderateScale(8),
    borderRadius: 8,
  },
  dropdownItem: {
    paddingVertical: verticalScale(5),
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 14,
    borderBottomWidth: 0.6,
    borderColor: '#fff',
    paddingBottom: verticalScale(6),
  },
  submitButton: {
    color: '#0193c0',
  },
  backIcon: {
    height: verticalScale(24),
    width: horizontalScale(24),
    tintColor: '#fff',
  },
  activityIndicate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    marginHorizontal: 35,
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
    width: 271,
    height: 180,
    borderRadius: 30,
  },
  iconModal: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
