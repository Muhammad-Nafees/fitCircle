import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

const CustomSettingTransaction = ({transaction}: any) => {
  const isTransactionPositive = transaction.transactionType === 'positive';
  return (
    <View style={styles.rowContainer}>
      <View style={styles.avatarTextContainer}>
        <Avatar.Text
          label={transaction.name[0]}
          size={55}
          style={{borderRadius: 15}}
        />
        <View style={styles.nameDateContainer}>
          <Text style={styles.name}>{transaction.name}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end', gap: 3}}>
        <Text style={styles.price}>
          {isTransactionPositive ? '+' : '-'} {transaction.amount}
        </Text>
        <Text style={styles.subscription}>{transaction.type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameDateContainer: {
    gap: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  date: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '400',
  },
  price: {
    color: 'rgba(222, 49, 49, 1)',
    fontWeight: '400',
    fontSize: 16,
  },
  subscription: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(48, 210, 152, 1)',
  },
});

export default CustomSettingTransaction;
