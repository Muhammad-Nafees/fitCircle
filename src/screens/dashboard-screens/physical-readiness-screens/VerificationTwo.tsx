import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Formik, Field} from 'formik';
// ------------------------------------------------------------------------------------------//
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomRadioButton from '../../../components/dashboard-components/CustomRadioButton';
import {STYLES} from '../../../styles/globalStyles';
import {verticalScale} from '../../../utils/metrics';
import {PhysicalReadinessTwoSchema} from '../../../validations';
import {verficationTwoquestionTexts} from '../../../../data/data';

interface FormValues {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  answer6: string;
}

const VerificationTwo = ({disabled, navigation, route, data}: any) => {
  const formdata: null | any = data;
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const initialValues = {
    answer1: (formdata && formdata?.answer1) ?? '',
    answer2: (formdata && formdata?.answer2) ?? '',
    answer3: (formdata && formdata?.answer3) ?? '',
    answer4: (formdata && formdata?.answer4) ?? '',
    answer5: (formdata && formdata?.answer5) ?? '',
    answer6: (formdata && formdata?.answer6) ?? '',
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
