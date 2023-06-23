import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';

import BackIcon from '../../../assets/icons/BackIcon';

interface Props {
  onPress: () => void;
}

const HeaderBackArrow = ({onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <BackIcon />
    </TouchableOpacity>
  );
};

export default HeaderBackArrow;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: verticalScale(44),
    // left: horizontalScale(14),
    width: horizontalScale(44),
    height: verticalScale(44),
    borderRadius: moderateScale(10),
    backgroundColor: '#34535A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
