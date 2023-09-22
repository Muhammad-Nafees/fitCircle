import React from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {verticalScale} from '../../utils/metrics';

interface Props {
  isStyle?: boolean;
}

const CustomLoader = ({isStyle}: Props) => {
  return (
    <ActivityIndicator
      style={[isStyle ? styles.container : {paddingTop: verticalScale(3)}]}
    />
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 140,
    height: 140,
  },
});
