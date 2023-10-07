import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {s3bucketReference} from '../../api';
import {useDispatch} from 'react-redux';
import {setUserProfile} from '../../redux/authSlice';

export const UserSearch = ({
  userData,
  username,
  profileImage,
  handleFollowButton,
}: any) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = () => {
    if (isFollowing === false) {
      setIsFollowing(true);
      handleFollowButton(username);
    } else {
      setIsFollowing(false);
    }
  };
  const handleSeeUserProfile = () => {
    dispatch(setUserProfile(userData));
    navigation.navigate('Profile', {isTrainerView: true});
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
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
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
    lineHeight: 19,
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
