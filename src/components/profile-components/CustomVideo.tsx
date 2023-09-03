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
import ProfileVideoLockIcon from '../../../assets/icons/ProfileVideoLock';

const CustomVideo = ({
  handleVideoPress,
  handleCancelButtonPress,
  video,
  isTrainerView,
}: any) => {
  console.log(video.cost);
  console.log(isTrainerView);
  return (
    <TouchableOpacity onPress={handleVideoPress}>
      <ImageBackground
        source={Image1}
        style={styles.container}
        imageStyle={{borderRadius: 10}}
        resizeMode="cover">
        <View
          style={[
            {flex: 1, borderRadius: 10},
            video.cost !== null && {backgroundColor: 'black'},
          ]}>
          <TouchableOpacity
            style={styles.cancelIconContainer}
            onPress={() => handleCancelButtonPress()}>
            {isTrainerView !== true && (
              <Image source={CancelIcon} style={styles.cancelIcon} />
            )}
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <View style={styles.playIconBackground}>
              {video.cost !== null ? (
                <ProfileVideoLockIcon />
              ) : (
                <Image source={PlayIcon} style={styles.playIcon} />
              )}
            </View>
          </View>
          <Text style={styles.text}>
            Sweat is magic. Cover yourself in it daily to grant your wishes.
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(170),
    height: verticalScale(195),
    justifyContent: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 6,
    flex: 1,
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
  },
  playIcon: {
    width: horizontalScale(8.86),
    height: verticalScale(10.85),
    tintColor: '#fff',
  },
});

export default CustomVideo;
