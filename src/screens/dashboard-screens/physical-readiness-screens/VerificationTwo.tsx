import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
// ------------------------------------------------------------------------------------------//
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomRadioButton from '../../../components/dashboard-components/CustomRadioButton';
import {STYLES} from '../../../styles/globalStyles';
import {verticalScale} from '../../../utils/metrics';
import {PhysicalReadinessTwoSchema} from '../../../validations';
import {verficationTwoquestionTexts} from '../../../../data/data';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

interface FormValues {
  isHighCholesterol: string;
  isHeartTrouble: string;
  isBoneTrouble: string;
  isHighBloodPressure: string;
  isOverAge: string;
  isAnyReasonNotToParticipate: string;
}

const VerificationTwo = ({disabled, navigation, route, data}: any) => {
  const formdata: null | any = data;
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const physicalData = useSelector(
    (state: RootState) => state.phyiscalReadiness.data,
  );
  console.log(physicalData, 'reduxddata');

  const initialValues = {
    isHighCholesterol: (formdata && formdata?.isHighCholesterol) ?? '',
    isHeartTrouble: (formdata && formdata?.isHeartTrouble) ?? '',
    isBoneTrouble: (formdata && formdata?.isBoneTrouble) ?? '',
    isHighBloodPressure: (formdata && formdata?.isHighBloodPressure) ?? '',
    isOverAge: (formdata && formdata?.isOverAge) ?? '',
    isAnyReasonNotToParticipate:
      (formdata && formdata?.isAnyReasonNotToParticipate) ?? '',
  };

  const handleSubmit = (answers: any) => {
    navigation.navigate('VerificationThree', {
      ...route.params,
      verificationTwo: answers,
    });
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={initialValues}
          validationSchema={PhysicalReadinessTwoSchema}
          onSubmit={handleSubmit}>
          {({values, setFieldValue, handleSubmit, errors}) => (
            <>
              {disabled !== true && (
                <Text style={[STYLES.text16, styles.heading]}>
                  Physical Activity Readiness
                </Text>
              )}
              <View style={styles.formContainer}>
                {verficationTwoquestionTexts.map(question => (
                  <View key={question.id}>
                    <CustomRadioButton
                      disabled={disabled}
                      text={question.question}
                      value={values[question.id as keyof FormValues]}
                      setFieldValue={setFieldValue}
                      name={question.id}
                      error={errors[question.id as keyof FormValues]}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </View>
                ))}
              </View>
              {disabled !== true && (
                <View style={styles.button}>
                  <CustomButton
                    onPress={() => {
                      setIsFormSubmitted(true), handleSubmit();
                    }}>
                    Continue
                  </CustomButton>
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
  heading: {
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  formContainer: {
    paddingHorizontal: 40,
  },
  button: {
    marginTop: verticalScale(60),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
});

export default VerificationTwo;
