import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import axiosInstance from '../../api/interceptor';

export const UserSearch = ({username, email, id}: any) => {
  const [isFollowing, setIsFollowing] = useState(false); 

  const handleFollow = () => {
    axiosInstance
      .patch(`/users/follow/${id}`)
      .then(response => {
        console.log('Follow successful!', response.data);
        setIsFollowing(true);
      })
      .catch(error => {
        console.error('Follow failed.', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <TouchableOpacity onPress={handleFollow}>
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(20),
    zIndex: 1,
    paddingVertical: verticalScale(15),
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
