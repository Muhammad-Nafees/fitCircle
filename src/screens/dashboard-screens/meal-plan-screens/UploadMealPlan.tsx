import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik} from 'formik';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import UploadMealPdf from '../../../../assets/icons/UploadMealPdf';
const ArrowBack = require('../../../../assets/icons/arrow-back.png');
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import MealPlanPdf from '../../../../assets/icons/MealPlanPdf';
import {useState} from 'react';

const initialValues = {
  title: '',
  description: '',
  preview: '',
  cost: '',
  username: '',
};

const UploadMealPlan = ({navigation}: any) => {
  const [result, setResult] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();
  const [fileName, setFileName] = useState<any>('');

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const openDocument = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: types.pdf,
      });
      console.log(res);
      if (!isCancel(res)) {
        const nameWithoutExtension = res.name.replace('.pdf', '');
        setFileName(nameWithoutExtension);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={{paddingTop: 24, paddingBottom: 16}}
          onPress={() => navigation.goBack()}>
          <Image
            source={ArrowBack}
            style={{width: 24, height: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Upload Meal Plan</Text>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
              <View style={{alignItems: 'center'}}>
                <CustomInput
                  label="Title"
                  placeholder="Enter here"
                  value={values.title}
                  error={errors.title}
                  touched={touched.title}
                  initialTouched={true}
                  labelStyles={styles.label}
                  extraStyles={styles.textInput}
                  handleChange={handleChange('title')}
                  setFieldError={setFieldError}
                  fieldName="title"
                />
                <CustomInput
                  label="Description"
                  placeholder="Description here"
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                  initialTouched={true}
                  labelStyles={styles.label}
                  multiline
                  handleChange={handleChange('description')}
                  textAlignVertical="top"
                  extraStyles={[styles.textInput, {height: verticalScale(100)}]}
                  setFieldError={setFieldError}
                  fieldName="description"
                />
                <TouchableOpacity
                  onPress={openDocument}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    width: horizontalScale(320),
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 20,
                    borderRadius: 10,
                  }}>
                  {fileName ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <MealPlanPdf width={33} height={43} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 1)',
                        }}>
                        {fileName}
                      </Text>
                    </View>
                  ) : (
                    <UploadMealPdf />
                  )}
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 10,
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}>
                    Uploaded File
                  </Text>
                </TouchableOpacity>
                <CustomInput
                  label="Cost"
                  placeholder="$0.00"
                  value={values.cost}
                  error={errors.cost}
                  labelStyles={styles.label}
                  touched={touched.cost}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="cost"
                  handleChange={handleChange('cost')}
                />
                <CustomInput
                  label="Username  (only the username listed will see this Meal plan)"
                  placeholder="@linconsmith"
                  value={values.username}
                  error={errors.username}
                  touched={touched.username}
                  labelStyles={styles.label}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="username"
                  handleChange={handleChange('username')}
                />
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>Create</CustomButton>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: 16,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  textInput: {
    borderRadius: 10,
  },
  label: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    marginBottom: 7,
  },
});

export default UploadMealPlan;
