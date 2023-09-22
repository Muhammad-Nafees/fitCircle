import React from 'react';
import {Text, View} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  name?: string;
  label?: string;
  error?: string;
  route?: any;
}

const CustomError = ({...props}: Props) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          marginTop: verticalScale(7),
          marginBottom: verticalScale(4),
        },
        props.label === 'Age' &&
          props.route.name === 'VerificationOne' && {
            width: horizontalScale(75),
            marginBottom: -verticalScale(0),
          },
      ]}>
      <Icon name="alert-circle" size={22} color="red" />
      <Text style={[STYLES.text12, {color: 'red'}]}>{props.error}</Text>
    </View>
  );
};

export default CustomError;
