import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
// ---------------------------------------------------------------------------------------//
import {CustomTransaction} from '../../components/dashboard-components/CustomTransactionSchedule';
import {RootState} from '../../redux/store';
import {horizontalScale} from '../../utils/metrics';
import CustomTransactionReceipt from '../../components/shared-components/CustomTransactionReceipt';

const ArrowBack = require('../../../assets/icons/arrow-back.png');

export const Transaction = ({
  navigation,
  settingsView = false,
  transaction,
}: any) => {
  const [profileImageUrl, setProfileImageUrl] = useState();
  const userData: any = useSelector((state: RootState) => state.auth.user);
  const [userId, setUserId] = useState(userData?._id);

  useEffect(() => {
    setUserId(userData?._id);
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  return (
    <View
      style={[styles.container, settingsView && {backgroundColor: '#292a2c'}]}>
      {!settingsView && (
        <TouchableOpacity
          style={styles.navigationBack}
          onPress={() => navigation.navigate('Dashboard')}>
          <Image
            source={ArrowBack}
            style={{width: 24, height: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
      )}
      {settingsView && (
        <Text style={{fontWeight: '700', fontSize: 16, color: 'white'}}>
          Transaction History
        </Text>
      )}
      <View style={[styles.container1, settingsView && {paddingBottom: 60}]}>
        <CustomTransactionReceipt
          transaction={transaction}
          settingsView={settingsView}
        />
        {!settingsView && (
          <View>
            <CustomTransaction
              profileImageUrl={profileImageUrl}
              username="Sam"
              name="Sameer Ather"
              date={'May 4'}
              amount="- $50"
              listText="Unlocked Content"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBack: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 12,
    flex: 0.05,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: horizontalScale(15),
  },
  container1: {
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(48, 210, 152, 1)',
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
    marginHorizontal: 20,
    paddingBottom: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  detail: {
    color: 'rgba(38, 38, 38, 1)',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 10,
    marginRight: 5,
  },
  detailData: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(38, 38, 38, 1)',
    marginTop: 10,
  },
  detailsColumn: {
    flex: 1,
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

export default Transaction;
