import {View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

interface ProfileAvatarProps {
  profileImageUrl?: any;
  username?: string | null;
  size?: number;
  avatarTextStyles?: any;
}

const CustomProfileAvatar = ({
  profileImageUrl,
  username,
  size = 40,
  avatarTextStyles,
}: ProfileAvatarProps) => {
  return (
    <View>
      {profileImageUrl ? (
        <Avatar.Image
          size={size}
          source={{uri: profileImageUrl}}
          style={styles.avatarImage}
        />
      ) : (
        <Avatar.Text
          size={size}
          label={username ? username[0].toUpperCase() : 'SA'}
          style={[styles.avatarText, avatarTextStyles]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    backgroundColor: 'transparent',
  },
  avatarText: {
    backgroundColor: '#5e01a9',
  },
});

export default CustomProfileAvatar;
