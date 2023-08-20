import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Formik, Field} from 'formik';
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomRadioButton from '../../../components/dashboard-components/CustomRadioButton';
import {STYLES} from '../../../styles/globalStyles';
import {verticalScale} from '../../../utils/metrics';

const questionTexts = [
  'Do you have high cholesterol?',
  'Has your doctor ever said that you have heart trouble?',
  'Has your doctor ever told you that you have a bone or joint problem (such as arthritis) that has been or may be exacerbated by physical activity?',
  'Has your doctor ever told you that your blood pressure was too high?',
  'Are you over 65 years of age and not accustomed to vigorous exercise?',
  'Is there any reason, not mentioned thus far, that would not allow you to participate in a physical fitness program?',
];

const VerificationTwo = () => {
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            answer5: '',
            answer6: '',
          }}
          validateOnChange={false}
          onSubmit={values => console.log(values)}>
          {({values, setFieldValue, handleSubmit}) => (
            <>
              <Text style={[STYLES.text16, styles.heading]}>
                Physical Activity Readiness
              </Text>
              <View style={styles.formContainer}>
                {questionTexts.map((text, index) => (
                  <Field key={`answer${index + 1}`} name={`answer${index + 1}`}>
                    {({field}: any) => (
                      <CustomRadioButton
                        text={text}
                        value={field.value}
                        selectedValue={values[`answer${index + 1}`]}
                        setFieldValue={setFieldValue}
                        name={`answer${index + 1}`}
                      />
                    )}
                  </Field>
                ))}
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>Continue</CustomButton>
              </View>
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
