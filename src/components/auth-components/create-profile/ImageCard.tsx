import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';

interface Props {
  uri: string;
  onPress: () => void;
}

const ImageCard = ({uri, onPress}: Props) => {
  return (
    <View
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={{uri: uri}} style={styles.image} />
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <Icon name="close-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    width: horizontalScale(298),
    height: verticalScale(204),
    borderRadius: moderateScale(16),
  },
  iconContainer: {
    position: 'absolute',
    padding: 8,
    backgroundColor: '#9B9B99',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
});
