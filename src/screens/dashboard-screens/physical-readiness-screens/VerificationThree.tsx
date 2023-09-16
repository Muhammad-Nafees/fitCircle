import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomInput from '../../../components/shared-components/CustomInput';
import {Formik} from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  initial: Yup.string().required('Initial is required'),
});

const VerificationThree = ({navigation, route}: any) => {
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
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <Formik
        initialValues={{
          initial: '',
        }}
        onSubmit={values =>
          navigation.navigate('VerificationFour', {
            ...route.params,
            initial: values.initial,
          })
        }
        validateOnChange={false}
        validationSchema={schema}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          setFieldError,
        }) => (
          <>
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
                    BUYER ACKNOWLEDGMENT AND ASSUMPTION OF RISK AND FULL RELEASE
                    FROM LIABILITY OF ME FIRST FITNESS BUYER ACKNOWLEDGES THESE
                    PHYSICAL ACTIVITIES INVOLVES THE INHERENT RISK OF PHYSICAL
                    INJURIES OR OTHER DAMAGES, INCUDING, BUT NOT LIMITED TO,
                    HEART ATTACKS, MUSCLE STRAINS, PULLS OR TEARS, BROKEN BONES,
                    SHIN SPLINTS, HEART Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
                </ScrollView>
              </LinearGradient>
              <View style={styles.input}>
                <CustomInput
                  label="Initial"
                  placeholder="LS"
                  value={values.initial}
                  error={errors.initial}
                  touched={touched.initial}
                  handleChange={handleChange('initial')}
                  setFieldError={setFieldError}
                  fieldName="initial"
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton onPress={handleSubmit}>Continue</CustomButton>
            </View>
          </>
        )}
      </Formik>
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
  input: {justifyContent: 'center', alignItems: 'center'},
});

export default VerificationThree;
