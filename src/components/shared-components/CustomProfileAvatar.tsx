import {s3bucketReference} from '../../api';
import {View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

interface Props {
  profileImage: string;
  username?: string;
  size?: number;
}

const CustomProfileAvatar = ({profileImage, username, size = 40}: Props) => {
  return (
    <View>
      {profileImage ? (
        <Avatar.Image
          size={size}
          source={{uri: `${s3bucketReference}/${profileImage}`}}
          style={styles.avatarImage}
        />
      ) : (
        <Avatar.Text
          size={size}
          label={username ? username[0].toUpperCase() : 'U'}
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
