import {Text, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

interface FavoritesProps {
  post: {
    _id: string;
    media?: string;
    content?: string;
    likes: any[];
    comments: any[];
    shares: any[];
    createdAt: string;
    hexCode: any;
    cost: number | null;
    user: {
      profileImageUrl?: string;
      username: string;
      email?: string;
    };
  };
}

export const Favorites = () => {
  // console.log('Favorite Post', post);
  // const {media, content, createdAt, user} = post;
  // const {profileImageUrl, username, email} = user;
  const username = 'IsaacButtler';
  const email = '@isaacbutler';
  const content = 'Weight loss experience';

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* {profileImageUrl ? (
          <Avatar.Image
            size={40}
            source={{uri: profileImageUrl}}
            style={styles.avatarImage}
          />
        ) : ( */}
          <Avatar.Text
            size={40}
            label={username ? username[0].toUpperCase() : 'SA'}
            style={styles.avatarText}
          />
        {/* )} */}
        <View style={styles.childContainer}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.timestamp}>3 hours ago</Text>
          </View>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 12,
    backgroundColor: '#363639',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    backgroundColor: 'transparent',
  },
  avatarText: {
    backgroundColor: '#5e01a9',
  },
  name: {
    fontSize: 10,
    fontWeight: '500',
    color: '#fff',
  },
  email: {
    fontSize: 8,
    color: '#209BCC',
  },
  timestamp: {
    fontSize: 8,
    color: '#888',
  },
  content: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
    color: '#fff',
  },
  childContainer: {
    flexDirection: 'column',
    textAlign: 'left',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
});
