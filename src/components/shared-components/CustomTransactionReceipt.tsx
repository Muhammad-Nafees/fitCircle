import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTransactionReceipt = () => {
  return (
    <View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.contentContainer}>
          <View style={styles.icon}>
            <Icon name="checkmark-outline" color="white" size={24} />
          </View>
          <Text style={styles.thankyouText}>Thank you!</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: 'rgba(38, 38, 38, 1)',
            }}>
            Your transaction was successful
          </Text>
          <View style={styles.dottedLineContainer}>
            <View style={styles.halfCircleLeft}></View>
            <View style={styles.dottedLine}></View>
            <View style={styles.halfCircleRight}></View>
          </View>
          <View style={styles.transactionDetailsContainer}>
            <View style={[styles.detailsColumn, {alignItems: 'flex-start'}]}>
              <Text style={styles.detail}>Date</Text>
              <Text></Text>
              <Text style={styles.detail}>Start Time</Text>
              <Text></Text>
              <Text style={styles.detail}>Finish Time</Text>
              <Text></Text>
              <Text style={styles.detail}>To</Text>
              <Text></Text>
            </View>
            <View style={[styles.detailsColumn, {alignItems: 'flex-end'}]}>
              <Text style={styles.detailData}>May 4, 2023</Text>
              <Text></Text>
              <Text style={styles.detailData}>1:00 PM</Text>
              <Text></Text>
              <Text style={styles.detailData}>2:00 PM</Text>
              <Text></Text>
              <Text style={styles.detailData}>Isaac Butler</Text>
              <Text style={{fontSize: 10, fontWeight: '400', color: '#262626'}}>
                isaacButtler@gmail.com
              </Text>
              <Text></Text>
            </View>
          </View>
          <View style={styles.amountParentContainer}>
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <Text style={styles.detail}>Amount</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '600',
                  color: 'rgba(255, 123, 131, 1)',
                }}>
                - $20.00
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dottedLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  halfCircleLeft: {
    width: 8,
    height: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'black',
  },
  halfCircleRight: {
    width: 8,
    height: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'black',
  },
  thankyouText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(38, 38, 38, 1)',
    marginVertical: 8,
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: 20,
  },
  transactionDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  detailsColumn: {
    flex: 1,
  },
  detail: {
    color: 'rgba(38, 38, 38, 1)',
    fontSize: 12,
    fontWeight: '400',
  },
  detailData: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(38, 38, 38, 1)',
  },
  amountParentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  contentContainer: {
    backgroundColor: 'white',
    width: 325,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTransactionReceipt;
