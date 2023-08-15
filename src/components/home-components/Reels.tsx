import React, {useRef, useState, useEffect} from 'react';
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
import {Avatar} from 'react-native-paper';
const FavouritesIcon = require('../../../assets/icons/favourites.png');
const ShareIcon = require('../../../assets/icons/share2.png');
const PlayIcon = require('../../../assets/icons/playIcon.png');
const PauseIcon = require('../../../assets/icons/pauseIcon.png');
const LockOpenIcon = require('../../../assets/icons/lock-open.png');
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../../api/interceptor';
import {horizontalScale, verticalScale} from '../../utils/metrics';

const {width, height} = Dimensions.get('window');
interface ReelsProps {
  post: {
    _id: string;
    media?: string;
    content?: string;
    likes: any[];
    cost: 0;
    shares: any[];
    favorites: any[];
    createdAt: string;
    user: {
      profileImageUrl?: string;
      username: string;
      email?: string;
    };
  };
  userId: string | undefined;
  viewable: any;
  index: number;
  currIndex: number;
  tabBarHeight: any;
}

export const ReelsComponent = ({
  post,
  userId,
  viewable,
  index,
  currIndex,
  tabBarHeight,
}: ReelsProps) => {
  // console.log("🚀 ~ file: Reels.tsx:46 ~ ReelsComponent ~ currIndex:", currIndex)
  // console.log("🚀 ~ file: Reels.tsx:46 ~ ReelsComponent ~ index:", index)

  const {_id, media, content, user, cost, favorites} = post;
  const {profileImageUrl, username, email} = user;
  const videoRef = useRef(null);
  const isLocked = cost && cost > 0;
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [play, setPlay] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigation = useNavigation();

  // const video = React.useRef(null);
  // const [isPlaying, setPlaying] = React.useState(false);

  // useEffect(() => {
  //   if (viewable) {
  //     if (viewable.length) {
  //       if (viewable[0]._id === _id) {
  //         setPlaying(true);
  //       } else {
  //         setPlaying(false);
  //       }
  //     } else {
  //       setPlaying(false);
  //     }
  //   } else {
  //     setPlaying(false);
  //   }
  // }, [viewable]);

  useEffect(() => {
    const isCurrentUserFavorited = favorites.some(
      favorite => favorite._id === userId,
    );
    setIsFavorited(isCurrentUserFavorited);
  }, [favorites]);

  useEffect(() => {
    let hideButtonTimer: any;
    if (play && showPlayIcon) {
      hideButtonTimer = setTimeout(() => {
        setShowPlayIcon(false);
      }, 3000);
    }
    return () => {
      clearTimeout(hideButtonTimer);
    };
  }, [play, showPlayIcon]);

  const onBuffer = () => {
    console.log('onBuffer1');
  };

  const onError = () => {
    console.log('onError');
  };

  const handleFavoritePress = () => {
    const apiEndpoint = `posts/favs/${_id}`;
    axiosInstance
      .patch(apiEndpoint)
      .then(response => {
        console.log('Comment Posted successfully!');
        console.log(response);
      })
      .catch(error => {
        console.error('Error while commenting on the post:', error);
      });
    navigation.navigate('FavoriteDialog');
  };

  const handleShareVideo = async () => {
    try {
      const result = await Share.share({
        url: media,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      console.error('Error sharing video:', error);
    }
  };

  return (
    <View style={[styles.container, {height: height - 120 - tabBarHeight}]}>
      <View style={styles.topLeftContent}>
        {profileImageUrl ? (
          <Avatar.Image
            size={40}
            source={{uri: profileImageUrl}}
            style={styles.avatarImage}
          />
        ) : (
          <Avatar.Text
            size={40}
            label={username ? username[0].toUpperCase() : 'SA'}
            style={styles.avatarText}
          />
        )}
        <View style={styles.postTextContainer}>
          <Text style={styles.postName}>{username}</Text>
          <Text style={styles.postId}>{`@${username
            ?.toLowerCase()
            ?.replace(/\s/g, '')}`}</Text>
        </View>
      </View>
      {isLocked ? (
        <View style={styles.lockedOverlay}>
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedText}>{content}</Text>
            <TouchableOpacity style={styles.lockedButtonContainer}>
              <Text style={{color: '#fff'}}>
                Unlock this video for{' '}
                <Text
                  style={{color: '#30D298', fontWeight: '600', fontSize: 16}}>
                  ${cost}
                </Text>
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
          <TouchableOpacity onPress={() => setPlay(!play)}>
            <View style={styles.playIconBackground}>
              <Image
                source={play ? PauseIcon : PlayIcon}
                style={styles.playIcon}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Video
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        resizeMode="cover"
        repeat={true}
        source={{
          uri: media,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderColor: 'black',
          borderWidth: 0,
        }}
        paused={!play}
        onTouchStart={() => setShowPlayIcon(true)}
        onLoad={() => {
          videoRef.current.seek(0);
        }}
      />
      <View style={styles.textContentContainer}>
        <Text style={styles.textContent}>{content}</Text>
      </View>
      <View style={styles.iconContainer}>
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
            <Image source={ShareIcon} style={styles.icon} />
            <Text style={styles.iconText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    // paddingBottom: 10,
    backgroundColor: 'black',
  },
  topLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(16),
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
    width: horizontalScale(38),
    height: verticalScale(41),
    tintColor: '#fff',
    justifyContent: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 10,
    justifyContent: 'center',
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
    lineHeight: 24,
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
});

export default ReelsComponent;
