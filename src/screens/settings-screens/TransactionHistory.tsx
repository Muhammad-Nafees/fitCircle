import {View, Text} from 'react-native';
// ----------------------------------------------------------------//
import Transaction from '../dashboard-screens/Transaction';

export const TransactionHistoryScreen = ({route}: any) => {
  const transaction = route.params?.transaction;

  return (
    <View style={{flex: 1}}>
      <Transaction settingsView={true} transaction={transaction} />
    </View>
  );
};
