import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Formik} from 'formik';
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomInput from '../../../components/shared-components/CustomInput';
import {STYLES} from '../../../styles/globalStyles';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../../../utils/metrics';

const VerificationFive = ({navigation, disabled}: any) => {
  const handleSubmit = values => {
    console.log('Form values:', values);
    // Handle form submission or navigation here
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            desiredBodyFat: '',
            desiredWeight: '',
            desiredLeanMuscle: '',
            exerciseFrequency: '',
          }}
          validateOnChange={false}
          onSubmit={handleSubmit}>
          {({handleChange, handleSubmit, values}) => (
            <>
              <View style={{marginTop: 16, paddingHorizontal: 16}}>
                <Text
                  style={[
                    STYLES.text16,
                    {
                      fontWeight: '700',
                      paddingBottom: 28,
                    },
                  ]}>
                  Physical Activity Readiness
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 12,
                    color: 'white',
                    paddingBottom: 28,
                  }}>
                  Please list your desired fitness goals:
                </Text>
              </View>
              <View style={styles.formContainer}>
                <CustomInput
                  label="Desired Body Fat"
                  placeholder="19%"
                  value={values.desiredBodyFat}
                  handleChange={handleChange('desiredBodyFat')}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Desired Weight"
                  placeholder="61 kg"
                  value={values.desiredWeight}
                  handleChange={handleChange('desiredWeight')}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Desired Lean Muscle"
                  placeholder="70-90%"
                  value={values.desiredLeanMuscle}
                  handleChange={handleChange('desiredLeanMuscle')}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="I plan to exercise ______ times of the week."
                  placeholder="6"
                  value={values.exerciseFrequency}
                  handleChange={handleChange('exerciseFrequency')}
                  keyboardType="numeric"
                />
              </View>
              {disabled !== true && (
                <View style={styles.button}>
                  <CustomButton onPress={handleSubmit}>Continue</CustomButton>
                </View>
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(20),
    marginHorizontal: horizontalScale(30),
    zIndex: 1000,
  },
  inputContainer: {
    flex: 3,
  },
  label: {
    fontSize: moderateScale(12),
    lineHeight: verticalScale(17),
    fontWeight: '700',
    color: '#ffffff',
  },
  formContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: verticalScale(100),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
});

export default VerificationFive;
