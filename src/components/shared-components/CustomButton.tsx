import React, {ReactNode} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/metrics';

interface Props {
  children: ReactNode;
  isDisabled?: boolean;
  extraStyles?: any;
  onPress?: () => void;
}

const CustomButton = ({children, extraStyles, isDisabled, onPress}: Props) => {
  return (
    <Pressable
      style={({pressed}) => pressed && styles.pressed}
      onPress={onPress}
      disabled={isDisabled}>
      <View
        style={[
          isDisabled ? styles.disabledButton : styles.button,
          extraStyles,
        ]}>
        <Text
          style={[styles.buttonText, isDisabled && styles.disabledButtonText]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(100),
    backgroundColor: '#13728C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    // marginTop: verticalScale(40),
    // paddingVertical: verticalScale(12),
    // borderRadius: moderateScale(12),
    // backgroundColor: COLORS.neutral200,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontWeight: '700',
  },
  disabledButtonText: {
    opacity: 0.3,
  },
  pressed: {
    opacity: 0.75,
  },
});
