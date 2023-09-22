import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';

import {Text} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import ImageCard from './ImageCard';

interface Props {
  iconName: string;
  text: string;
  selectedCameraImage: any;
  setSelectedCameraImage: any;
  onPress: () => void;
}

const PickCertificateCard = ({
  iconName,
  text,
  selectedCameraImage,
  setSelectedCameraImage,
  onPress,
}: Props) => {
  const handleDelete = () => {
    setSelectedCameraImage('');
  };
  return selectedCameraImage == '' ? (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={0.6}
      onPress={onPress}>
      <Icon name={iconName} size={30} color="white" />
      <Text style={[STYLES.text14, {fontWeight: '600'}]}>{text}</Text>
    </TouchableOpacity>
  ) : (
    <ImageCard uri={selectedCameraImage} onPress={handleDelete} />
  );
};

export default PickCertificateCard;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(298),
    height: verticalScale(204),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(68, 68, 68, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
