import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
const ArrowBack = require('../../../assets/icons/arrow-back.png');

export const TransactionModal = ({closeModal}: any) => {
  const monthsToShow = [
    'January 2023',
    'February 2023',
    'March 2023',
    'April 2023',
    'May 2023',
    'June 2023',
    'July 2023',
    'August 2023',
    'September 2023',
  ];

  const reversedMonthsToShow = [...monthsToShow].reverse();

  return (
    <View style={styles.modalContent}>
      <ScrollView>
        <TouchableOpacity style={{paddingBottom: 16}} onPress={closeModal}>
          <Image
            source={ArrowBack}
            style={{width: 24, height: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <View style={styles.monthsEarningsContainer}>
          {reversedMonthsToShow.map((month, index) => (
            <View key={index} style={styles.monthEarningsRow}>
              <Text style={styles.monthText}>{month}</Text>
              <Text style={styles.earningText}>$0.00</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#292a2c',
    borderRadius: 10,
    padding: 20,
  },
  monthsEarningsContainer: {
    flexDirection: 'column',
  },
  monthEarningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  earningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#209BCC',
  },
});
