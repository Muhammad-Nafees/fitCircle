import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// ----------------------------------------------------------------//
import {horizontalScale, verticalScale} from '../../utils/metrics';

export const UserMessage = ({
  text,
  timestamp,
  mediaUri,
  handleMessageImagePress,
}: any) => {
  const formattedTimestamp = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity
        onPress={() => handleMessageImagePress(mediaUri)}
        style={[
          styles.container,
          mediaUri !== null && {width: horizontalScale(210)},
        ]}>
        {mediaUri !== null && (
          <Image source={{uri: mediaUri}} style={styles.messageImage} />
        )}
        <Text style={styles.messageText}>{text}</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // gap: 7,
          gap: 4,
          justifyContent: 'flex-end',
        }}>
        {/* <Avatar.Text
          size={16}
          label={'SA'}
          style={{backgroundColor: '#5e01a9'}}
        /> */}
        <Text style={{color: 'rgba(32, 155, 204, 1)', fontSize: 12}}>Seen</Text>
        <Text style={styles.timestamp}>{formattedTimestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(50, 54, 69, 0.5)',
    minWidth: horizontalScale(10),
    minHeight: verticalScale(50),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: verticalScale(8),
    alignSelf: 'flex-end',
    maxWidth: verticalScale(219),
  },
  parentContainer: {
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(7),
  },
  messageText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(14),
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  messageImage: {
    width: horizontalScale(210),
    height: verticalScale(200),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
