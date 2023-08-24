import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {VerificationOne} from './VerificationOne';
import VerificationTwo from './VerificationTwo';
import VerificationFour from './VerificationFour';
import VerificationFive from './VerificationFive';
import VerificationSix from './VerificationSix';
import CustomButton from '../../../components/shared-components/CustomButton';

const VerificationSeven = ({navigation}: any) => {
  return (
    <View style={{backgroundColor: '#292A2C'}}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Text
          style={[
            STYLES.text16,
            {
              fontWeight: '700',
              marginTop: 16,
              paddingHorizontal: 16,
              paddingBottom: 28,
            },
          ]}>
          Physical Activity Readiness
        </Text>
        <View style={styles.formContainer}>
          <VerificationOne disabled={true} />
          <VerificationTwo disabled={true} />
          <VerificationFour disabled={true} />
          <VerificationFive disabled={true} />
          <VerificationSix disabled={true} />
        </View>
        <CustomButton onPress={() => navigation.navigate('VerificationOne')}>
          Retake
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate('FormSaved')}>
          Continue
        </CustomButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 0,
  },
});

export default VerificationSeven;
