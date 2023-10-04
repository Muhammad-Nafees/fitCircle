import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {horizontalScale} from '../../utils/metrics';
import {CustomTrainerPackage} from '../../components/profile-components/CustomTrainerPackage';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import CustomButton from '../../components/shared-components/CustomButton';

const ArrowBack = require('../../../assets/icons/arrow-back.png');

const PackagesScreen = ({navigation}: any) => {
  const userRole: any = useSelector((state: RootState) => state.auth.userRole);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TouchableOpacity
          style={{paddingTop: 24, paddingBottom: 16}}
          onPress={() => navigation.goBack()}>
          <Image
            source={ArrowBack}
            style={{width: 24, height: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Packages</Text>
        <View style={{marginVertical: 16}}>
          <CustomTrainerPackage hidePackageButton={true} />
          <CustomTrainerPackage hidePackageButton={true} />
          <CustomTrainerPackage hidePackageButton={true} />
        </View>
      </ScrollView>
      <View style={{margin: 20}}>
        <CustomButton
          onPress={() => navigation.navigate('CreatePackageScreen')}>
          Add Package
        </CustomButton>
      </View>
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

export default PackagesScreen;
