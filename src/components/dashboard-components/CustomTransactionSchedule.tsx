import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
const Option = require('../../../assets/icons/customPostOption.png');

export const CustomTransaction = ({
  profileImageUrl,
  username,
  name,
  date,
  amount,
  listText,
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarName}>
        <View>
          <CustomProfileAvatar username={username} />
        </View>
        <View style={styles.nameDate}>
          <Text style={{fontWeight: '400', fontSize: 12, color: 'white'}}>
            {name}
          </Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.amountList}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={{color: '#30D298', fontSize: 12.54}}>{listText}</Text>
      </View>
    </View>
  );
};

export const CustomSchedule = ({
  profileImageUrl,
  username,
  name,
  time,
  exercise,
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarName}>
        <View>
          <CustomProfileAvatar username="Sameer" size={48} />
        </View>
        <View style={[styles.nameDate, {gap: 0}]}>
          <Text style={styles.scheduleName}>Isaac Butler</Text>
          <Text
            style={[
              styles.date,
              {fontSize: 12, color: 'rgba(255, 255, 255, 1)'},
            ]}>
            Back and Triceps
          </Text>
          <Text
            style={[
              styles.date,
              {fontSize: 12, color: 'rgba(255, 255, 255, 0.65)'},
            ]}>
            1:00 PM- 2:00 PM
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.amountList}>
        <Image
          source={Option}
          style={{tintColor: 'white', width: 12, height: 32}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(19, 114, 140, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  avatarName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameDate: {
    marginHorizontal: 10,
    flexDirection: 'column',
    gap: 3,
  },
  amountList: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  amount: {
    color: '#DE3131',
    fontSize: 14.33,
    fontWeight: '500',
    textAlign: 'right',
  },
  date: {
    fontWeight: '400',
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  scheduleName: {
    fontWeight: '400',
    fontSize: 10,
    color: 'rgba(32, 155, 204, 1)',
  },
});
