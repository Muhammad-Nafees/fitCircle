import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomInput from '../../../components/shared-components/CustomInput'; // Import your custom input component here

const VerificationThree = ({navigation}: any) => {
  const [initial, setInitial] = useState('');

  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <View>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>
          Physical Readiness Activity
        </Text>
        <LinearGradient
          colors={['rgba(41, 42, 44, 1)', 'rgba(255, 255, 255, 0)']}
          style={styles.fadeBottom}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}>
            <Text style={styles.contentText}>
              BUYER ACKNOWLEDGMENT AND ASSUMPTION OF RISK AND FULL RELEASE FROM
              LIABILITY OF ME FIRST FITNESS BUYER ACKNOWLEDGES THESE PHYSICAL
              ACTIVITIES INVOLVES THE INHERENT RISK OF PHYSICAL INJURIES OR
              OTHER DAMAGES, INCUDING, BUT NOT LIMITED TO, HEART ATTACKS, MUSCLE
              STRAINS, PULLS OR TEARS, BROKEN BONES, SHIN SPLINTS, HEART
            </Text>
          </ScrollView>
        </LinearGradient>
        <CustomInput
          label="Initial"
          placeholder="Enter your initial"
          value={initial}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          isDisabled={initial.length === 0}
          onPress={() => navigation.navigate('VerificationFour')}>
          Continue
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 16,
  },
  scrollContent: {
    padding: 10,
  },
  contentText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
  fadeBottom: {
    height: 100,
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 40,
    marginHorizontal: 20,
  },
});

export default VerificationThree;
