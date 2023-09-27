import {View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {CustomSelect} from '../../shared-components/CustomSelect';
import CustomInput from '../../shared-components/CustomInput';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import CustomButton from '../../shared-components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {InterestScreenNavigationProp} from '../../../interfaces/navigation.type';
import {genderSchema} from '../../../validations';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../../redux/authSlice';
import {IUser} from '../../../interfaces/user.interface';
import {RootState} from '../../../redux/store';
import {useState} from 'react';
import DropdownTextInput from '../../shared-components/CustomDropdownInput';

interface Unit {
  kg: string;
  lb: string;
  ft: string;
  m: string;
}

const GenderForm = () => {
  const navigation = useNavigation<InterestScreenNavigationProp>();
  const previousUserData = useSelector((state: RootState) => state.auth.user);
   console.log(previousUserData?.phone,"phone")
  const dispatch = useDispatch();
  const [weightUnit, setWeightUnit] = useState<Unit['kg']>('kg');
  const [heightUnit, setHeightUnit] = useState<Unit['ft']>('ft');

  const handleSelectUnit = (unit: keyof Unit, type: string) => {
    if (type == 'kg') {
      setWeightUnit(unit);
    } else {
      setHeightUnit(unit);
    }
  };

  const initialValues: Partial<IUser> = {
    gender: '',
    age: '',
    height: '' as any,
    weight: '' as any,
    bodytype: '',
    activity: '',
  };
  const handleSubmit = (values: Partial<IUser>) => {
    const partialUserData: Partial<IUser> = {
      ...previousUserData,
      gender: values.gender,
      age: values.age,
      height: {
        value: values.height as any,
        unit: heightUnit,
      },
      weight: {
        value: values.weight as any,
        unit: weightUnit,
      },
      bodytype: values.bodytype,
      activity: values.activity,
    };
    dispatch(setUserData({...partialUserData} as IUser));
    navigation.navigate('InterestScreen');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={genderSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}>
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
          <View style={styles.formContainer}>
            <View style={styles.line} />
            <View style={{marginTop: verticalScale(30), alignItems: 'center'}}>
              <CustomSelect
                label="Gender"
                values={['Male', 'Female']}
                selectedValue={values.gender}
                error={errors.gender}
                initialTouched={true}
                touched={touched.gender}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                fieldName="gender"
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
                setFieldError={setFieldError}
                fieldName="age"
              />
              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Height</Text>
                  <DropdownTextInput
                    value={values.height}
                    options={['ft', 'm']}
                    defaultOption="ft"
                    handleChange={handleChange('height')}
                    error={errors.height}
                    touched={touched.height}
                    initialTouched={true}
                    setFieldError={setFieldError}
                    fieldName="height"
                    onSelectUnit={handleSelectUnit}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Weight</Text>
                  <DropdownTextInput
                    value={values.weight}
                    options={['kg', 'lb']}
                    defaultOption="kg"
                    handleChange={handleChange('weight')}
                    error={errors.weight}
                    touched={touched.weight}
                    initialTouched={true}
                    setFieldError={setFieldError}
                    fieldName="weight"
                    onSelectUnit={handleSelectUnit}
                  />
                </View>
              </View>
              <CustomSelect
                label="Body Type"
                values={['Mesomorph', 'Ectomorph', 'Endomorph']}
                selectedValue={values.bodytype}
                error={errors.bodytype}
                initialTouched={true}
                touched={touched.bodytype}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                fieldName="bodytype"
              />
              <CustomSelect
                label="Activity"
                values={[
                  'Physical Activity',
                  'Physical Fitness',
                  'Exercise',
                  'Sedentary',
                ]}
                selectedValue={values.activity}
                error={errors.activity}
                initialTouched={true}
                touched={touched.activity}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                fieldName="activity"
              />
            </View>
            <View style={styles.buttonContainer}>
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
  buttonContainer: {
    width: '100%',
    paddingHorizontal: horizontalScale(40),
    marginVertical: verticalScale(60),
  },
});
