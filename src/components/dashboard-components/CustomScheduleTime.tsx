import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Avatar} from 'react-native-paper';
const Options = require('../../../assets/icons/customPostOption.png');

export const CustomScheduleTime = ({
  profileImageUrl,
  name,
  username,
  timeSlot,
  exercise,
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarName}>
        <View>
          {profileImageUrl ? (
            <Avatar.Image size={48} source={{uri: profileImageUrl}} />
          ) : (
            <Avatar.Text
              size={40}
              label={username ? username[0].toUpperCase() : 'SA'}
              style={{backgroundColor: '#5e01a9'}}
            />
          )}
        </View>
        <View style={styles.data}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 10,
              color: 'rgba(32, 155, 204, 1)',
            }}>
            {name}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 12,
              color: 'rgba(255,255,255,1)',
            }}>
            {exercise}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 10,
              color: 'rgba(255,255,255,0.5)',
            }}>
            {timeSlot}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Image
          source={Options}
          style={{width: 5, height: 32, tintColor: 'white'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 18,
    backgroundColor: '#004c58',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  avatarName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  data: {
    marginHorizontal: 10,
    flexDirection: 'column',
    gap: 1,
  },
  amountList: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
