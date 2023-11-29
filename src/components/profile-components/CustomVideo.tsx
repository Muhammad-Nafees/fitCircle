import React, {useCallback, useEffect, useState} from 'react';
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
import {createThumbnail} from 'react-native-create-thumbnail';
import {s3bucketReference} from '../../api';
import {useFocusEffect} from '@react-navigation/native';

const CustomVideo = ({
  onPressVideo,
  onDeleteVideo,
  video,
  isFavoriteVideo,
  isTrainerView,
  isSearchProfile,
}: any) => {
  const [videoThumbnail, setVideoThumbnail] = useState<any>(null);
  const fetchThumbnail = async () => {
    if (video?.thumbnail !== null) {
      let uri = `${s3bucketReference}/${video.thumbnail}`;
      setVideoThumbnail(uri);
    } else {
      try {
        const response = await createThumbnail({
          url: `${s3bucketReference}/${video.media}`,
          timeStamp: 1000,
          format: 'jpeg',
        });
        setVideoThumbnail(response.path);
      } catch (err) {
        console.log('errorrr', err);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchThumbnail();
    }, [video]),
  );

  const handleVideoPress = (video: any) => {
    onPressVideo(video);
  };
  const handleDeleteVideo = (id: string) => {
    onDeleteVideo(id);
  };

  return (
    <TouchableOpacity onPress={() => handleVideoPress(video)}>
      <View style={styles.container}>
        <Image
          source={{uri: videoThumbnail}}
          style={[
            styles.thumbnail,
            {borderColor: videoThumbnail == null ? 'white' : undefined},
          ]}
          resizeMode="cover"
        />
        <View
          style={[
            {
              width: '100%',
              height: '100%',
              borderRadius: 10,
              position: 'absolute',
              zIndex: 13,
            },
          ]}>
          <TouchableOpacity
            disabled={isFavoriteVideo || isSearchProfile}
            style={styles.cancelIconContainer}
            onPress={() => handleDeleteVideo(video._id)}>
            {!isFavoriteVideo && (
              <Image source={CancelIcon} style={styles.cancelIcon} />
            )}
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <View style={styles.playIconBackground}>
              {/* {video.cost !== null ? (
                <ProfileVideoLockIcon />
              ) : ( */}
              <Image source={PlayIcon} style={styles.playIcon} />
              {/* )} */}
            </View>
          </View>
          <Text style={styles.text}>{video?.title}</Text>
          <Text style={styles.text}>{video?.text}</Text>
        </View>
      </View>
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
    position: 'relative',
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
    position: 'relative',
    // zIndex: 999,
    tintColor: '#fff',
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
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 12,
    borderWidth: 1,
  },
});

export default CustomVideo;
