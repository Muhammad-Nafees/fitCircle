import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {authenticate} from '../../redux/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => {
        dispatch(authenticate(false));
      }}>
      <View style={styles.logoutIconContainer}>
        <FontAwesomeIcon name="power-off" size={20} color="white" />
      </View>
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(235, 45, 37, 0.2)',
    borderRadius: 48,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 30,
    marginHorizontal: 20,
    gap: 16,
  },
  logoutIconContainer: {
    backgroundColor: '#FF7C7C',
    borderRadius: 25,
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: 'rgba(255, 124, 124, 1)',
  },
});
