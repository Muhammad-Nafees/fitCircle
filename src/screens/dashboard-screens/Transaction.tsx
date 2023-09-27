import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
// ---------------------------------------------------------------------------------------//
import {CustomTransaction} from '../../components/dashboard-components/CustomTransaction';
import {RootState} from '../../redux/store';
import {horizontalScale} from '../../utils/metrics';
import CustomTransactionReceipt from '../../components/shared-components/CustomTransactionReceipt';

const ArrowBack = require('../../../assets/icons/arrow-back.png');

export const Transaction = ({navigation}: any) => {
  const [profileImageUrl, setProfileImageUrl] = useState();
  const userData: any = useSelector((state: RootState) => state.auth.user);
  const [userId, setUserId] = useState(userData?._id);

  useEffect(() => {
    setUserId(userData?._id);
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navigationBack}
        onPress={() => navigation.navigate('Dashboard')}>
        <Image
          source={ArrowBack}
          style={{width: 24, height: 24, tintColor: 'white'}}
        />
      </TouchableOpacity>
      <View style={styles.container1}>
        <CustomTransactionReceipt />
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
});

export default Transaction;
