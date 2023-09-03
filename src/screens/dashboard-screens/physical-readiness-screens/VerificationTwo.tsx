import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Formik, Field} from 'formik';
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomRadioButton from '../../../components/dashboard-components/CustomRadioButton';
import {STYLES} from '../../../styles/globalStyles';
import {verticalScale} from '../../../utils/metrics';
import {PhysicalReadinessTwoSchema} from '../../../validations';

const questionTexts = [
  'Do you have high cholesterol?',
  'Has your doctor ever said that you have heart trouble?',
  'Has your doctor ever told you that you have a bone or joint problem (such as arthritis) that has been or may be exacerbated by physical activity?',
  'Has your doctor ever told you that your blood pressure was too high?',
  'Are you over 65 years of age and not accustomed to vigorous exercise?',
  'Is there any reason, not mentioned thus far, that would not allow you to participate in a physical fitness program?',
];

const VerificationTwo = ({disabled, navigation, route, data}: any) => {
  const formdata: null | any = data;

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

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            answer1: (formdata && formdata[0]?.answer) ?? '',
            answer2: (formdata && formdata[1]?.answer) ?? '',
            answer3: (formdata && formdata[2]?.answer) ?? '',
            answer4: (formdata && formdata[3]?.answer) ?? '',
            answer5: (formdata && formdata[4]?.answer) ?? '',
            answer6: (formdata && formdata[5]?.answer) ?? '',
          }}
          validateOnChange={false}
          validationSchema={PhysicalReadinessTwoSchema}
          onSubmit={values => {
            const answersArr = Object.values(values);
            const isRemainingField = answersArr.find(ans => ans === '') === '';
            if (isRemainingField) return;

            let answers: {question: string; answer: 'Yes' | 'No' | string}[] =
              [];

            questionTexts.forEach((q: string, i) => {
              answers.push({
                question: q,
                answer: answersArr[i],
              });
            });
            navigation.navigate('VerificationThree', {
              ...route.params,
              verificationTwo: answers,
            });
          }}>
          {({values, setFieldValue, handleSubmit, errors, setFieldError}) => (
            <>
              {disabled !== true && (
                <Text style={[STYLES.text16, styles.heading]}>
                  Physical Activity Readiness
                </Text>
              )}
              <View style={styles.formContainer}>
                {questionTexts.map((text, index) => (
                  <Field key={`answer${index + 1}`} name={`answer${index + 1}`}>
                    {({field, form}: any) => (
                      <CustomRadioButton
                        disabled={disabled}
                        text={text}
                        value={field.value}
                        selectedValue={values[`answer${index + 1}`]}
                        setFieldValue={setFieldValue}
                        setFieldError={setFieldError}
                        error={errors[`answer${index + 1}`]}
                        name={`answer${index + 1}`}
                      />
                    )}
                  </Field>
                ))}
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
