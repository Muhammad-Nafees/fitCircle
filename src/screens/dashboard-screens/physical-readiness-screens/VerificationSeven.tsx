import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {VerificationOne} from './VerificationOne';
import VerificationTwo from './VerificationTwo';
import VerificationFour from './VerificationFour';
import VerificationFive from './VerificationFive';

const VerificationSeven = () => {
  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.formContainer}>
          <VerificationOne disabled={true} />
          <VerificationTwo disabled={true} />
          <VerificationFour disabled={true} />
          <VerificationFive disabled={true}/>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 40,
  },
});

export default VerificationSeven;
