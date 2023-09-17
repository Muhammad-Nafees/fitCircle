import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

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

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#004c58',
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
});
