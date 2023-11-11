import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {s3bucketReference} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {setUserProfile} from '../../redux/authSlice';
import {
  followToggle,
  getFollowersList,
  getFollowingList,
} from '../../api/profile-module';
import {RootState} from '../../redux/store';
import {setTrainerView} from '../../redux/profileSlice';

export const UserSearch = ({
  searchProfileData,
  username,
  profileImage,
  handleFollowButton,
}: any) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myData = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFollowingList = async () => {
    try {
      const response = await getFollowingList();
      const followings = response?.data?.data?.users;
      const isFollowingFound = followings?.filter(
        (list: any) => list._id == searchProfileData._id,
      );
      if (isFollowingFound.length > 0) {
        setIsFollowing(true);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error?.response?.data, 'From followings List!');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowingList();
  }, [isFollowing]);

  const handleFollowToggle = async () => {
    try {
      const response = await followToggle(searchProfileData?._id);
    } catch (error: any) {
      console.log(error?.response?.data, 'from follow toggle on search!');
    }
    if (isFollowing === false) {
      setIsFollowing(true);
      handleFollowButton(username);
    } else {
      setIsFollowing(false);
    }
  };
  const handleSeeUserProfile = () => {
    console.log(searchProfileData, '1111');
    dispatch(setUserProfile(searchProfileData));
    dispatch(setTrainerView(true));
    navigation.navigate('Profile', {
      isFollowing: isFollowing,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={handleSeeUserProfile}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          {profileImage ? (
            <Avatar.Image
              size={40}
              source={{uri: `${s3bucketReference}/${profileImage}`}}
            />
          ) : (
            <Avatar.Text
              size={40}
              label={username ? username[0].toUpperCase() : 'SA'}
              style={{backgroundColor: '#5e01a9'}}
            />
          )}
          <Text style={styles.username}>{username}</Text>
        </View>
        {!isLoading && (
          <TouchableOpacity onPress={handleFollowToggle}>
            <Text style={styles.followButtonText}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(14),
    zIndex: 1,
    paddingVertical: verticalScale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    // lineHeight: 19,
  },
  email: {
    color: '#209BCC',
  },
  followButtonText: {
    color: '#209BCC',
    fontWeight: '500',
    fontSize: 12,
  },
});
