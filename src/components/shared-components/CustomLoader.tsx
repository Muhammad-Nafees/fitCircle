import React from 'react';
import {View, Image, StyleSheet,ActivityIndicator} from 'react-native';
import { verticalScale } from '../../utils/metrics';

const CustomLoader = () => {
  return (
    <ActivityIndicator style={{paddingTop: verticalScale(3)}} />
  );
};

export default CustomLoader;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   gif: {
//     width: 30,
//     height: 30,
//   },
// });
