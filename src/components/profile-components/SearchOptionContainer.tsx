import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {verticalScale} from '../../utils/metrics';

export const SearchOptionContainer = ({
  onPressFollowers,
  onPressFollowing,
  onPressCommunity,
  selectedOption,
}: any) => {
  return (
    <View style={styles.optionContainer}>
      <TouchableOpacity
        onPress={onPressFollowers}
        style={[
          styles.option,
          selectedOption === 'followers' && styles.selectedOption,
        ]}>
        <Text
          style={[
            styles.optionText,
            selectedOption === 'followers' && {color: 'white'},
          ]}>
          Followers
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressFollowing}
        style={[
          styles.option,
          selectedOption === 'following' && styles.selectedOption,
        ]}>
        <Text
          style={[
            styles.optionText,
            selectedOption === 'following' && {color: 'white'},
          ]}>
          Following
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressCommunity}
        style={[
          styles.option,
          selectedOption === 'community' && styles.selectedOption,
        ]}>
        <Text
          style={[
            styles.optionText,
            selectedOption === 'community' && {color: 'white'},
          ]}>
          Community
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    borderBottomWidth: 3,
    borderColor: '#444444',
  },
  option: {
    paddingVertical: verticalScale(10),
  },
  optionText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 12,
  },
  selectedOption: {
    borderBottomColor: '#209BCC',
    borderBottomWidth: 3,
  },
});
