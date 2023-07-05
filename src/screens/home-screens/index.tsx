import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const HomeScreen = () => {
  const userData = useSelector((state: RootState) => state.auth.user);

  console.log(userData?.email);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to Home Screen!</Text>
      <Text>I am a {userData?.role}</Text>
      <Text>My name is {userData?.firstName}</Text>
    </View>
  );
};

export default HomeScreen;
