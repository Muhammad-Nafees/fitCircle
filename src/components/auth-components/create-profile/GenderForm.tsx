import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {Formik} from 'formik';
import {CustomSelect} from '../../shared-components/CustomSelect';
import CustomInput from '../../shared-components/CustomInput';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import CustomButton from '../../shared-components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { InterestScreenNavigationProp } from '../../../interfaces/navigation.type';

interface FormValues {
  age: string;
  height: string;
  weight: string;
}
const GenderForm = () => {

   const navigation = useNavigation<InterestScreenNavigationProp>(); 
  const initialValues: FormValues = {
    age: '',
    height: '',
    weight: '',
  };
  const handleSubmit = (values:FormValues) => {};

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={loginSchema}
      onSubmit={handleSubmit}>
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        submitForm,
        values,
        errors,
        touched,
        initialTouched,
      }) => (
        <View style={styles.formContainer}>
          <View style={styles.line} />
          <View style={{marginTop: 30, alignItems: 'center'}}>
            <CustomSelect
              label="Gender"
              values={['Male', 'Female']}
              defaultValue="Male"
            />
            <View style={{flexDirection: 'row', gap: horizontalScale(13)}}>
              <CustomInput
                label="Age"
                placeholder=""
                value={values.age}
                // error={values.age}
                touched={touched.age}
                keyboardType='numeric'
                handleChange={handleChange('age')}
                extraStyles={{width: 52}}
              />
              <View style={{flexDirection: 'row'}}>
                <CustomInput
                  label="Height"
                  placeholder=""
                  value={values.height}
                  // error={values.height}
                  touched={touched.height}
                  keyboardType='numeric'
                  handleChange={handleChange('height')}
                  extraStyles={{width: 52}}
                />

                <CustomSelect
                  label=""
                  defaultValue="Ft"
                  values={['Ft', 'm']}
                  styles={{position: 'relative', bottom: verticalScale(7)}}
                  backgroundColor="#209BCC"
                  width={50}
                  height={50.5}
                  isIcon={false}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CustomInput
                  label="Weight"
                  placeholder=""
                  value={values.weight}
                  // error={values.weight}
                  touched={touched.weight}
                  keyboardType='numeric'
                  handleChange={handleChange('weight')}
                  extraStyles={{width: 52}}
                />
                <CustomSelect
                  label=""
                  defaultValue="Ft"
                  values={['Kg', 'lb']}
                  styles={{position: 'relative', bottom: verticalScale(7)}}
                  backgroundColor="#209BCC"
                  width={50}
                  height={50.5}
                  isIcon={false}
                />
              </View>
            </View>
            <CustomSelect
              label="Body Type"
              defaultValue="Mesomorph"
              values={['Mesomorph', 'Ectomorph', 'Endomorph']}
            />
            <CustomSelect
              label="Activity"
              defaultValue="Physical Activity"
              values={[
                'Physical Activity',
                'Physical FItness',
                'Exercise',
                'Sedentary',
              ]}
            />
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: horizontalScale(40),
              marginVertical: verticalScale(60),
            }}>
            <CustomButton onPress={() => navigation.navigate('InterestScreen') }>Continue</CustomButton>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default GenderForm;

const styles = StyleSheet.create({
  line: {
    width: 60,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    marginTop: verticalScale(54),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
