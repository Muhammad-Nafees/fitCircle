import React from 'react';
import {View} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import HeaderBackArrow from './HeaderBackArrow';
import {useNavigation} from '@react-navigation/native';

interface CustomHeaderProps {
  onPress?: () => void; 
}
const CustomHeader: React.FC<CustomHeaderProps> = ({onPress}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack(); 
    }
  };
  return (
    <View
      style={{
        marginTop: verticalScale(20),
        marginLeft: horizontalScale(12),
      }}>
      <HeaderBackArrow onPress={handlePress} />
    </View>
  );
};

export default CustomHeader;
