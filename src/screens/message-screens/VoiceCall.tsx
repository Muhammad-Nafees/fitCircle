import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
// ----------------------------------------------------------------//
import CallAcceptIcon from '../../../assets/icons/CallAccept';
import CallRejectIcon from '../../../assets/icons/CallReject';
import {TouchableOpacity} from 'react-native';
import {moderateScale} from '../../utils/metrics';

export const VoiceCall = ({route, navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Text
          size={93}
          label={route.params.username[0]}
          style={{
            backgroundColor: '#5e01a9',
            borderWidth: 1,
            borderColor: 'white',
          }}
        />
        <Text style={styles.name}>{route.params.username}</Text>
        <Text style={styles.miniText}>connecting...</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ChatDetails', {
              username: route.params.username,
            })
          }
          style={styles.iconContainer}>
          <View
            style={[
              styles.iconBackground,
              {backgroundColor: 'rgba(235, 85, 69, 1)'},
            ]}>
            <CallRejectIcon />
          </View>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() =>
            navigation.navigate('ChatDetails', {
              username: route.params.username,
            })
          }>
          <View
            style={[
              styles.iconBackground,
              {backgroundColor: 'rgba(103, 206, 103, 1)', padding: 14},
            ]}>
            <CallAcceptIcon />
          </View>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(20),
  },
  actionContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  iconBackground: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: moderateScale(10),
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  miniText: {
    fontWeight: '300',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 10,
    marginVertical: 8,
  },
});
