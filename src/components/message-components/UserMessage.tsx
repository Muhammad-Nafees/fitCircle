import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

export const UserMessage = ({text, timestamp}: any) => {
  const formattedTimestamp = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <Text style={styles.messageText}>{text}</Text>
      </View>
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
    // backgroundColor: 'rgba(32, 155, 204, 1)',
    backgroundColor: 'rgba(50, 54, 69, 0.5)',
    width: 219,
    minHeight: 50,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: 8,
  },
  parentContainer: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
  messageText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});
