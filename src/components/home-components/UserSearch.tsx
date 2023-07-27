import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/metrics';

export const UserSearch = ({username, email}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: horizontalScale(20),
    zIndex: 1,
    paddingVertical: verticalScale(15),
  },
  username: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 19,
  },
  email: {
    color: '#209BCC',
  },
});
