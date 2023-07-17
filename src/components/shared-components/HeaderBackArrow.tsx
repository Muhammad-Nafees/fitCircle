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
  extraStyles?: any;
}

const HeaderBackArrow = ({extraStyles, onPress}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, extraStyles]} onPress={onPress}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> main
