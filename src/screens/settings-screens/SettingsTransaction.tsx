import {StyleSheet, View, Text, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// ----------------------------------------------------------------------------------------------------//
import CustomSettingTransaction from '../../components/settings-components/CustomSettingTransaction';
import {dummyTransactions} from '../dummyData';
import {horizontalScale, verticalScale} from '../../utils/metrics';

export const SettingsTransactionScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={{paddingBottom: verticalScale(16)}}>
        <Text style={styles.heading}>Transactions</Text>
      </View>
      <FlatList
        data={dummyTransactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TransactionHistory', {transaction: item})
            }>
            <CustomSettingTransaction transaction={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{gap: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: horizontalScale(16),
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
});
