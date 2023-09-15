import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import axiosInstance from '../../api/interceptor';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const UserSearch = ({
  username,
  profileImageUrl,
  handleFollowButton,
}: any) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigation = useNavigation();
  console.log(profileImageUrl, 'profile');

  // const handleFollow = () => {
  //   axiosInstance
  //     .patch(`/users/follow/${id}`)
  //     .then(response => {
  //       console.log('Follow successful!', response.data);
  //       setIsFollowing(true);
  //     })
  //     .catch(error => {
  //       console.error('Follow failed.', error);
  //     });
  // };

  const handlePress = () => {
    if (isFollowing === false) {
      setIsFollowing(true);
      handleFollowButton(username);
    } else {
      setIsFollowing(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.rowContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          {profileImageUrl ? (
            <Avatar.Image size={40} source={{uri: profileImageUrl}} />
          ) : (
            <Avatar.Text
              size={40}
              label={username ? username[0].toUpperCase() : 'SA'}
              style={{backgroundColor: '#5e01a9'}}
            />
          )}
          <Text style={styles.username}>{username}</Text>
        </View>
        {/* <TouchableOpacity onPress={handlePress}>
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity> */}
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
