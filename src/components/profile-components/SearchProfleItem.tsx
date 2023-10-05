import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';

export const SearchProfileItem = ({item, onToggle, isRemoved}: any) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileInfo}>
        <CustomProfileAvatar size={40} username={item.username} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.username}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButtonContainer}
        onPress={() => onToggle(item._id)}>
        <Text style={styles.remove}>{!isRemoved ? 'Remove' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SearchCommunityItem = ({item, onToggle, isUnsubscribed}: any) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileInfo}>
        <CustomProfileAvatar size={40} profileImageUrl={item.photo} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.members}>{`${item.membersCount} Members`}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButtonContainer}
        onPress={() => onToggle(item._id, item.name)}>
        <Text style={styles.remove}>
          {!isUnsubscribed ? 'Unsubscribe' : 'Join'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(7),
    flex: 1,
    width: '70%',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  removeButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  nameContainer: {
    marginLeft: horizontalScale(10),
    gap: 4,
  },
  name: {
    color: '#fff',
    fontSize: 12,
  },
  remove: {
    color: '#209BCC',
    fontSize: 12,
  },
  members: {
    fontSize: 10,
    color: '#fff',
  },
});
