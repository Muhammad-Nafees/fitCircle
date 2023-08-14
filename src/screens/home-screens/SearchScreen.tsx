import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '../../api/interceptor';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {UserSearch} from '../../components/home-components/UserSearch';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {searchUser} from '../../api';

const SearchIcon = require('../../../assets/icons/search.png');
const FilterIcon = require('../../../assets/icons/filter.png');
const ArrowBack = require('../../../assets/icons/arrow-back.png');

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
      setSearchData([]);
    }, []),
  );

  const handleSearch = async () => {
    setSearchData([]);
    setIsLoading(true);
    try {
      if (searchQuery.trim() !== '') {
        const endpoint = `home/search/${searchQuery}`;
        const response = await axiosInstance.get(endpoint);
        console.log('API Response:', response.data);
        setIsLoading(false);
        setSearchData(response.data);
      }
    } catch (error) {
      console.error('Error while searching:', error);
    }
  };

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
    navigation.goBack();
  };

  let placeholderText = selectedFilter
    ? `Search ${selectedFilter} ...`
    : 'Search';

  const renderItem = ({item}: any) => (
    <View style={styles.searchResultContainer}>
      <UserSearch username={item.username} email={item.email} />
    </View>
  );

  const search = async () => {
    setIsLoading(true);
    if (searchQuery.trim() === '') {
      setSearchData([]);
      setSearchQuery('');
      setIsLoading(false);
      return;
    }
    setSearchQuery(searchQuery);
    try {
      const response = await searchUser(searchQuery.toLowerCase());
      const users = response?.data;
      setSearchData(users);
      setIsLoading(false);
    } catch (error: any) {
      console.log('Error fetching cities:', error);
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   if (countryCode) {
  //     fetchCities(countryCode);
  //   }
  // }, [countryCode]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleBackButtonPress}>
          <Image source={ArrowBack} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={search}>
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
              // onEndEditing={handleSearch}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={showFilterOptions}>
              <Image source={FilterIcon} style={styles.icon} />
            </TouchableOpacity>
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
        <TouchableOpacity onPress={search}>
          <Text style={styles.submitButton}>Search</Text>
        </TouchableOpacity>
      </View>
      {searchData.length > 0 && (
        <FlatList
          data={searchData}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          keyboardShouldPersistTaps="handled"
        />
      )}
      {isLoading && (
        <View style={styles.activityIndicate}>
          <ActivityIndicator size="large" />
        </View>
      )}
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
    fontSize: 16,
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
  searchResultContainer: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.6,
  },
  activityIndicate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
