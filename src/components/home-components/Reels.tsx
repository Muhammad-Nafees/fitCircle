import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {createThumbnail} from 'react-native-create-thumbnail';
// ---------------------------------------------------------------------//
const FavouritesIcon = require('../../../assets/icons/favourites.png');
const ShareIcon = require('../../../assets/icons/share2.png');
const PlayIcon = require('../../../assets/icons/playIcon.png');
const PauseIcon = require('../../../assets/icons/pauseIcon.png');
const LockOpenIcon = require('../../../assets/icons/lock-open.png');
const CancelIcon = require('../../../assets/icons/cancel.png');
import DiskIcon from '../../../assets/icons/DiskIcon';
import DiscMusicIcon from '../../../assets/icons/DiskMusicIcon';
import MusicIconTwo from '../../../assets/icons/MusicIconTwo';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import {s3bucketReference} from '../../api';
import {addPostToFavorite, sharePost} from '../../api/home-module';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
interface ReelsProps {
  post: any;
  userId?: string | undefined;
  index?: number;
  tabBarHeight?: any;
  isProfile?: boolean;
  handleCancelPress?: any;
  handleFavoriteDialog?: any;
  isFavoriteVideo?: boolean;
  onDeletePost: (id: string) => void;
  onPlayPause: (id: string) => void;
  onVideoEnd: () => void;
  play: boolean;
  id: string | null;
}

export const ReelsComponent = ({
  post,
  tabBarHeight,
  isProfile = false,
  isFavoriteVideo,
  handleCancelPress,
  onDeletePost,
  handleFavoriteDialog,
  onPlayPause,
  play,
  id,
  onVideoEnd,
}: ReelsProps) => {
  const videoRef = useRef<any>(null);
  const navigation = useNavigation();
  const isLocked = post?.cost && post?.cost > 0;
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(post?.thumbnail !== null);
  const [videoThumbnail, setVideoThumbnail] = useState<any>();

  const fetchThumbnail = async () => {
    if (post?.thumbnail) {
      let uri = `${s3bucketReference}/${post.thumbnail}`;
      setVideoThumbnail(uri);
    } else {
      try {
        const response = await createThumbnail({
          url: `${s3bucketReference}/${post.media}`,
          timeStamp: 1000,
          format: 'jpeg',
        });
        setVideoThumbnail(response.path);
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchThumbnail();
    }, [post]),
  );

  // useEffect(() => {
  //   const isCurrentUserFavorited = favorites.some(
  //     favorite => favorite._id === userId,
  //   );
  //   setIsFavorited(isCurrentUserFavorited);
  // }, [favorites]);

  useEffect(() => {
    let hideButtonTimer: any;
    if (play && showPlayIcon) {
      setShowThumbnail(false);
      hideButtonTimer = setTimeout(() => {
        setShowPlayIcon(false);
      }, 3000);
    }
    return () => {
      clearTimeout(hideButtonTimer);
    };
  }, [play, showPlayIcon]);

  const onBuffer = (buffer: any) => {
    console.log(buffer, 'buffer');
    console.log('onBuffer1');
  };

  const onError = (error: any) => {
    console.log(error);
    console.log('onError');
  };

  const handleFavoritePress = async () => {
    try {
      const response = await addPostToFavorite(post._id);
      navigation.navigate('FavoriteDialog' as never);
    } catch (error: any) {
      console.log(error?.response, 'from favorite video');
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
    }
  };

  const handleShareVideo = async () => {
    try {
      const response = await sharePost(post._id);
      Toast.show({
        type: 'success',
        text1: `${response?.data?.message}`,
      });
    } catch (error: any) {
      console.log(error?.response, 'from sharing video');
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
    }
  };

  const handleDeletePost = (postiId: string) => {
    onDeletePost(postiId);
  };

  return (
    <View
      style={[
        styles.container,
        isProfile !== true && {height: height - 120 - tabBarHeight},
      ]}>
      <View style={[styles.topLeftContent, {padding: 0}]}>
        <View style={[styles.topLeftContent, {left: -15, top: -15}]}>
          <CustomProfileAvatar
            profileImage={post?.user?.profileImage as any}
            username={post?.user?.username}
          />
          <View style={styles.postTextContainer}>
            <Text style={styles.postName}>{post?.user?.username}</Text>
            <Text style={styles.postId}>{`@${post?.user?.username
              ?.toLowerCase()
              ?.replace(/\s/g, '')}`}</Text>
          </View>
        </View>
        {isProfile && (
          <TouchableOpacity
            onPress={() => handleDeletePost(post._id)}
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              left: width - 50,
              top: 8,
            }}>
            <Image
              source={CancelIcon}
              style={{width: 20, height: 20, tintColor: 'white'}}
            />
          </TouchableOpacity>
        )}
      </View>
      {isLocked ? (
        <View style={styles.lockedOverlay}>
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedText}>{post?.text}</Text>
            <TouchableOpacity style={styles.lockedButtonContainer}>
              <Text style={{color: '#fff'}}>
                Unlock this video for{' '}
                <Text style={styles.cost}>${post?.cost}</Text>
              </Text>
              <View style={styles.lockedIconContainer}>
                <Image source={LockOpenIcon} style={styles.lockIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View style={styles.playIconContainer}>
        {showPlayIcon && (
          <TouchableOpacity onPress={() => onPlayPause(post?._id)}>
            <View style={styles.playIconBackground}>
              <Image
                source={play && id == post?._id ? PauseIcon : PlayIcon}
                style={styles.playIcon}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {showThumbnail && videoThumbnail && (
        <View style={styles.thumbnailContainer}>
          <Image source={{uri: videoThumbnail}} style={styles.thumbnail} />
        </View>
      )}
      <Video
        ref={videoRef}
        // onBuffer={onBuffer}
        // onError={onError}
        resizeMode="cover"
        repeat={true}
        source={{
          uri: `${s3bucketReference}/${post.media}`,
        }}
        style={styles.video}
        paused={play && id == post?._id ? false : true}
        onTouchStart={() => setShowPlayIcon(true)}
        onLoad={() => {
          videoRef.current.seek(0);
        }}
        onEnd={onVideoEnd}
        playInBackground={false}
        playWhenInactive={false}
        useTextureView={true}
        bufferConfig={{
          minBufferMs: 15000, // Minimum time (in milliseconds) to buffer before playback starts
          maxBufferMs: 50000, // Maximum time (in milliseconds) to buffer ahead during playback
          bufferForPlaybackMs: 2500, // Amount of time (in milliseconds) to buffer ahead during playback
          bufferForPlaybackAfterRebufferMs: 5000, // Amount of time (in milliseconds) to buffer ahead after rebuffering
        }}
        muted={!!id}
      />
      <View style={styles.textContentContainer}>
        {post?.title !== '' && (
          <Text
            style={[
              styles.textContent,
              {paddingBottom: 20, fontSize: 16, fontWeight: '700'},
            ]}>
            {post?.title}
          </Text>
        )}

        <Text style={styles.textContent}>{post?.text}</Text>
      </View>
      {isFavoriteVideo && (
        <View
          style={
            post?.musicTitle
              ? [styles.iconContainer, {bottom: verticalScale(55)}]
              : styles.iconContainer
          }>
          <View style={styles.iconItem}>
            <TouchableOpacity
              style={styles.iconItemContainer}
              onPress={handleFavoritePress}>
              <Image
                source={FavouritesIcon}
                style={[styles.icon, isFavorited && {tintColor: '#3EB6E6'}]}
              />
              <Text style={styles.iconText}>Favorite</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconItem}>
            <TouchableOpacity
              style={styles.iconItemContainer}
              onPress={handleShareVideo}>
              <Image
                source={ShareIcon}
                style={[styles.icon, {width: horizontalScale(40)}]}
              />
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {post?.musicTitle ? (
        <View style={styles.musicWrapper}>
          <View style={styles.musicContainer}>
            <MusicIconTwo />
            <Text style={styles.musicName} numberOfLines={2}>
              {post?.musicTitle}
            </Text>
          </View>
          <View style={styles.diskIconWrapper}>
            <View style={styles.diskMusicIcon}>
              <DiscMusicIcon />
            </View>
            <DiskIcon />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    // backgroundColor: 'transparent',
  },
  topLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(16),
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  postTextContainer: {
    marginLeft: horizontalScale(10),
  },
  postId: {
    marginRight: horizontalScale(10),
    color: '#007797',
    fontSize: 12,
  },
  postName: {
    color: '#fff',
    fontSize: 14,
  },
  textContentContainer: {
    position: 'absolute',
    bottom: verticalScale(55),
    left: horizontalScale(16),
    zIndex: 3,
    marginRight: '40%',
  },
  textContent: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: horizontalScale(16),
    bottom: verticalScale(25),
    paddingHorizontal: horizontalScale(5),
    zIndex: 3,
  },
  iconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  iconItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: horizontalScale(30),
    height: verticalScale(30),
    tintColor: '#fff',
    justifyContent: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    justifyContent: 'center',
    marginTop: 7,
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  lockedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    // lineHeight: 24,
    marginRight: horizontalScale(30),
  },
  lockedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  shareModal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  shareModalContent: {
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(16),
  },
  shareModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  shareModalButton: {
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },
  shareModalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007797',
  },
  avatarImage: {
    backgroundColor: 'transparent',
  },
  avatarText: {
    backgroundColor: '#5e01a9',
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '47%',
    transform: [
      {translateX: -horizontalScale(38) / 2},
      {translateY: -verticalScale(41) / 2},
    ],
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconBackground: {
    backgroundColor: 'rgba(141, 156, 152, 0.8)',
    width: horizontalScale(55),
    height: verticalScale(55),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: horizontalScale(38),
    height: verticalScale(41),
    tintColor: '#fff',
  },
  lockIcon: {
    width: horizontalScale(18),
    height: verticalScale(18),
    tintColor: '#fff',
  },
  lockedButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#209BCC',
    borderRadius: 40,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(16),
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lockedIconContainer: {
    backgroundColor: '#43c1df',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    marginLeft: horizontalScale(12),
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnailContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 1,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
    borderColor: 'black',
    borderWidth: 0,
    zIndex: 0,
  },
  cost: {color: '#30D298', fontWeight: '600', fontSize: 16},
  musicWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    position: 'absolute',
    bottom: 15,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicName: {
    color: '#fff',
    fontSize: 16,
    width: '85%',
  },
  diskIconWrapper: {
    flexDirection: 'row',
  },
  diskMusicIcon: {
    position: 'absolute',
    right: 18,
  },
});

export default ReelsComponent;
