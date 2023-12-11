import React, {ReactNode} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/metrics';

interface Props {
  children: ReactNode;
  isDisabled?: boolean;
  extraStyles?: any;
  onPress?: () => void;
  extraTextStyles?: any;
}

const CustomButton = ({
  children,
  extraStyles,
  isDisabled,
  onPress,
  extraTextStyles,
}: Props) => {
  return (
    <Pressable
      style={({pressed}) => pressed && styles.pressed}
      onPress={onPress}
      disabled={isDisabled}>
      <View
        style={[
          styles.button,
          {backgroundColor: isDisabled ? '#444444' : 'rgba(32, 155, 204, 1)'},
          extraStyles,
        ]}>
        <Text
          style={[
            styles.buttonText,
            isDisabled && styles.disabledButtonText,
            extraTextStyles,
          ]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    // paddingVertical: verticalScale(12),
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold'
  },
  disabledButtonText: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.75,
  },
});
