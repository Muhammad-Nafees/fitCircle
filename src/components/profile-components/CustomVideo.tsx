import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';

const Image1 = require('../../../assets/images/backgroundImage.jpg');
const CancelIcon = require('../../../assets/icons/cancel.png');
const PlayIcon = require('../../../assets/icons/playIcon.png');

const CustomVideo = ({handleVideoPress}: any) => {
  return (
    <TouchableOpacity onPress={handleVideoPress}>
      <ImageBackground
        source={Image1}
        style={styles.container}
        imageStyle={{borderRadius: 10}}
        resizeMode="cover">
        <TouchableOpacity style={styles.cancelIconContainer}>
          <Image source={CancelIcon} style={styles.cancelIcon} />
        </TouchableOpacity>
        <View style={styles.playIconBackground}>
          <Image source={PlayIcon} style={styles.playIcon} />
        </View>
        <Text style={styles.text}>
          Sweat is magic. Cover yourself in it daily to grant your wishes.
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 195,
    justifyContent: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 6
  },
  cancelIconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 5,
    flex: 1,
  },
  cancelIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  text: {
    color: 'white',
    marginRight: 60,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 8,
  },
  playIconBackground: {
    backgroundColor: 'rgba(141, 156, 152, 0.8)',
    width: horizontalScale(21),
    height: verticalScale(21),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '35%',
  },
  playIcon: {
    width: horizontalScale(8.86),
    height: verticalScale(10.85),
    tintColor: '#fff',
  },
});

export default CustomVideo;
