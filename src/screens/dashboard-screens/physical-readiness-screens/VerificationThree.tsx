import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomInput from '../../../components/shared-components/CustomInput';

const VerificationThree = ({navigation}: any) => {
  const [initial, setInitial] = useState('');

  const handleChange = newValue => {
    setInitial(newValue);
  };

  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <View>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>
          Physical Readiness Activity
        </Text>
        <LinearGradient
          colors={['rgba(41, 42, 44, 0.1)', 'rgba(41, 42, 44, 0.6)']}
          style={styles.fadeBottom}>
          <ScrollView
            persistentScrollbar={true}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}>
            <Text style={styles.contentText}>
              BUYER ACKNOWLEDGMENT AND ASSUMPTION OF RISK AND FULL RELEASE FROM
              LIABILITY OF ME FIRST FITNESS BUYER ACKNOWLEDGES THESE PHYSICAL
              ACTIVITIES INVOLVES THE INHERENT RISK OF PHYSICAL INJURIES OR
              OTHER DAMAGES, INCUDING, BUT NOT LIMITED TO, HEART ATTACKS, MUSCLE
              STRAINS, PULLS OR TEARS, BROKEN BONES, SHIN SPLINTS, HEART Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
        </LinearGradient>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CustomInput
            label="Initial"
            placeholder="LS"
            value={initial}
            handleChange={handleChange}
          />
        </View>
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
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    marginTop: 16,
    zIndex: -100000,
  },
  scrollContent: {
    padding: 10,
    zIndex: -100000,
  },
  contentText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'left',
    zIndex: -19,
  },
  centeredInput: {
    alignSelf: 'center',
  },
  fadeBottom: {
    height: 150,
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 40,
    marginHorizontal: 20,
  },
});

export default VerificationThree;
