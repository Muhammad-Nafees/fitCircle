import {View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

interface ProfileAvatarProps {
  profileImageUrl?: any;
  username?: string | null;
}

const CustomProfileAvatar = ({
  profileImageUrl,
  username,
}: ProfileAvatarProps) => {
  return (
    <View>
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
