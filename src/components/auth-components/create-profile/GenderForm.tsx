import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {Formik} from 'formik';
import {CustomSelect} from '../../shared-components/CustomSelect';
import CustomInput from '../../shared-components/CustomInput';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import CustomButton from '../../shared-components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {InterestScreenNavigationProp} from '../../../interfaces/navigation.type';
import {genderSchema} from '../../../validations';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../../redux/authSlice';
import {IUser} from '../../../interfaces/user.interface';
import {RootState} from '../../../redux/store';

const GenderForm = () => {
  const navigation = useNavigation<InterestScreenNavigationProp>();
  const previousUserData = useSelector((state: RootState) => state.auth.user);
  console.log(previousUserData);

  const dispatch = useDispatch();

  const initialValues: IUser = {
    gender: '',
    age: '',
    height: '',
    weight: '',
    bodytype: '',
    activity: '',
  };
  const handleSubmit = (values: IUser) => {
    const partialUserData: Partial<IUser> = {
      ...previousUserData,
      gender: values.gender,
      age: values.age,
      height: values.height,
      weight: values.weight,
      bodytype: values.bodytype,
      activity: values.activity,
    };

    dispatch(setUserData(partialUserData));
    navigation.navigate('InterestScreen');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={genderSchema}
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
        setFieldValue,
      }) => (
        <>
          <View style={styles.formContainer}>
            <View style={styles.line} />
            <View style={{marginTop: verticalScale(30), alignItems: 'center'}}>
              <CustomSelect
                label="Gender"
                values={['Male', 'Female']}
                selectedValue={values.gender}
                error={errors.gender}
                setFieldValue={setFieldValue}
              />

              <CustomInput
                label="Age"
                placeholder=""
                value={values.age}
                error={errors.age}
                touched={touched.age}
                initialTouched={true}
                keyboardType="numeric"
                handleChange={handleChange('age')}
                // extraStyles={{width: 52}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  gap: horizontalScale(13),
                  marginHorizontal: horizontalScale(42),
                }}>
                <View style={{flex: 1}}>
                  <CustomInput
                    label="Height"
                    placeholder=""
                    value={values.height}
                    error={errors.height}
                    touched={touched.height}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('height')}
                    extraStyles={{
                      width: '100%',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: horizontalScale(0),
                      top: verticalScale(9),
                      height: '100%',
                      justifyContent: 'center',
                    }}>
                    <CustomSelect
                      label="unit"
                      defaultValue="Ft"
                      values={['Ft', 'm']}
                      setFieldValue={setFieldValue}
                      styles={{position: 'relative', bottom: verticalScale(7)}}
                      backgroundColor="#209BCC"
                      width={50}
                      height={50.6}
                      isIcon={false}
                      fontColor="#fff"
                    />
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <CustomInput
                    label="Weight"
                    placeholder=""
                    value={values.weight}
                    error={errors.weight}
                    touched={touched.weight}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('weight')}
                    extraStyles={{width: '100%'}}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: horizontalScale(0),
                      top: verticalScale(9),
                      height: '100%',
                      justifyContent: 'center',
                    }}>
                    <CustomSelect
                      label="unit"
                      defaultValue="Kg"
                      values={['Kg', 'lb']}
                      styles={{position: 'relative', bottom: verticalScale(7)}}
                      backgroundColor="#209BCC"
                      setFieldValue={setFieldValue}
                      width={50}
                      height={50.6}
                      isIcon={false}
                      fontColor="#fff"
                    />
                  </View>
                </View>
              </View>
              <CustomSelect
                label="Activity"
                values={[
                  'Physical Activity',
                  'Physical FItness',
                  'Exercise',
                  'Sedentary',
                ]}
                selectedValue={values.activity}
                error={errors.activity}
                setFieldValue={setFieldValue}
              />
              <CustomSelect
                label="Body Type"
                values={['Mesomorph', 'Ectomorph', 'Endomorph']}
                selectedValue={values.bodytype}
                error={errors.bodytype}
                setFieldValue={setFieldValue}
              />
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: horizontalScale(40),
                marginVertical: verticalScale(60),
              }}>
              <CustomButton onPress={handleSubmit}>Continue</CustomButton>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default GenderForm;

const styles = StyleSheet.create({
  line: {
    width: horizontalScale(60),
    height: verticalScale(3),
    backgroundColor: 'white',
    borderRadius: 30,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    marginTop: verticalScale(54),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
});
