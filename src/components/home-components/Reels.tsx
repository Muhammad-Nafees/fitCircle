import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import Video from 'react-native-video';
import {Avatar, Button} from 'react-native-paper';
import CustomDialog from '../shared-components/CustomDialog';
const FavouritesIcon = require('../../../assets/icons/favourites.png');
const ShareIcon = require('../../../assets/icons/share2.png');
// const LockOpenIcon = require('../../../assets/icons/lock-open.png');
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../../api/interceptor';
import {horizontalScale, verticalScale} from '../../utils/metrics';

interface ReelsProps {
  post: {
    _id: string;
    media?: string;
    content?: string;
    likes: any[];
    cost: 0;
    comments: any[];
    shares: any[];
    createdAt: string;
    user: {
      profileImageUrl?: string;
      username: string;
      email?: string;
    };
  };
}

export const ReelsComponent = ({post}: ReelsProps) => {
  const {_id, media, content, likes, comments, shares, createdAt, user, cost} =
    post;
  console.log(media);
  const {profileImageUrl, username, email} = user;
  const videoRef = useRef(null);
  const isLocked = cost && cost > 0;
  const [showDialog, setShowDialog] = useState(false);

  const onBuffer = () => {
    console.log('onBuffer');
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
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
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
        // Dismissed
      }
    } catch (error) {
      console.error('Error sharing video:', error);
    }
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.postId}>{email}</Text>
        </View>
      </View>
      {isLocked ? (
        <View style={styles.lockedOverlay}>
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedText}>{content}</Text>
            <Text style={styles.lockedText}>This Video Is Locked</Text>
          </View>
        </View>
      ) : null}
      <Video
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        resizeMode="cover"
        source={{
          uri: media,
        }}
        style={{width: '100%', height: '100%'}}
      />
      <View style={styles.textContentContainer}>
        <Text style={styles.textContent}>{content}</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconItem}>
          <TouchableOpacity
            style={styles.iconItemContainer}
            onPress={handleFavoritePress}>
            <Image source={FavouritesIcon} style={styles.icon} />
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
      {showDialog && (
        <CustomDialog
          name="Added to favorites!"
          buttonText="Return"
          isLoading={false}
          isIcon={true}
          button1Function={handleCloseDialog}
          onContinue={() => {}}
          navigation={null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: verticalScale(610),
    paddingBottom: 10,
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
    bottom: verticalScale(30),
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
    bottom: verticalScale(16),
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
    fontWeight: 'bold',
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
    backgroundColor: '#ebebeb',
  },
});

export default ReelsComponent;
