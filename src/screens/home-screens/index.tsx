import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const HomeScreen = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to Home Screen!</Text>
      <Text>I am a {userRole}</Text>
    </View>
  );
};

export default HomeScreen;
