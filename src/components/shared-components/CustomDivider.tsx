import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {verticalScale, horizontalScale} from '../../utils/metrics';

interface Props {
  text: string;
  extraStyles?: any;
}

const CustomDivider = ({text, extraStyles}: Props) => {
  return (
    <View style={[styles.divider, extraStyles]}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
};

export default CustomDivider;

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dividerLine: {
    borderBottomColor: 'rgba(255, 255, 255, 0.19)',
    width: horizontalScale(90),
    borderBottomWidth: horizontalScale(1),
  },
  dividerText: {
    paddingHorizontal: horizontalScale(20),
    color: 'rgba(255, 255, 255, 0.66)',
    fontFamily: 'GeneralSans-Medium'
  },
});