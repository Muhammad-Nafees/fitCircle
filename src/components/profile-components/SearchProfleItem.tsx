import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';

export const SearchProfleItem = ({item, selectedOption, onToggle}: any) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileInfo}>
        <CustomProfileAvatar
          size={50}
          username={item.username}
          profileImage={item?.profileImage || item?.image}
        />
        {selectedOption !== 'community' && (
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.username}</Text>
          </View>
        )}
        {item?.members && (
          <View style={{gap: 5, marginLeft: 10}}>
            <Text style={STYLES.text12}>{item.name}</Text>
            <Text style={[STYLES.text12, {fontWeight: '400'}]}>
              {item.members.length} member
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.removeButtonContainer}
        onPress={() => onToggle(item._id)}>
        <Text style={styles.remove}>
          {selectedOption == 'followers'
            ? 'Remove'
            : selectedOption == 'following'
            ? 'Unfollow'
            : 'Unsubscribe'}
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
