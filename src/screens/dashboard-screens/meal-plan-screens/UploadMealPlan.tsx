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
  types,
} from 'react-native-document-picker';
import MealPlanPdf from '../../../../assets/icons/MealPlanPdf';
import {useEffect, useState} from 'react';
import {uploadPlanSchema} from '../../../validations';
import Toast from 'react-native-toast-message';
import {createMealPlan, editMealPlan} from '../../../api/mealPlan-module';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {s3bucketReference} from '../../../api';

const UploadMealPlan = ({navigation, route}: any) => {
  const myMealPlan = route?.params?.myMealPlan;
  const [pdfFile, setpdfFile] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >(null);
  const [fileName, setFileName] = useState<any>(myMealPlan?.pdf);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mealPlanId, setMealPlanId] = useState<string | null>(myMealPlan?._id);

  const initialValues = {
    title: myMealPlan?.title || '',
    description: myMealPlan?.description || '',
    cost: myMealPlan?.cost ? String(myMealPlan?.cost) : '',
    username: myMealPlan?.username || '',
  };

  const handleSubmit = async (values: any) => {
    if ((!myMealPlan && pdfFile === null) || pdfFile === undefined) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'You need to attach a Meal Plan PDF',
      });
    } else {
      setIsLoading(true);

      const reqData = {
        title: values.title,
        description: values.description,
        cost: values.cost,
        ...(pdfFile !== null && {pdf: pdfFile}),
        ...(values.username !== '' && {username: values.username}),
      };
      try {
        if (myMealPlan) {
          const response = await editMealPlan(reqData, mealPlanId as string);
          Toast.show({
            type: 'success',
            text1: `${response?.data?.message}`,
          });
          navigation.navigate('CreateMealPlan');
        } else {
          const response = await createMealPlan(reqData);
          Toast.show({
            type: 'success',
            text1: `${response?.data?.message}`,
          });
          navigation.navigate('CreateMealPlan');
        }
      } catch (error: any) {
        Toast.show({
          type: 'success',
          text1: `${error?.response?.data?.message}`,
        });
        console.log('ERROR FROM CREAING OR EDITING MEAL PLAN', error.response.data);
      }
      setIsLoading(false);
      // if (values.username && values.username.startsWith('@')) {
      //   navigation.navigate('CreateMealPlan');
      //   const cleanedUsername = values.username.substring(1);
      //   navigation.navigate('Message', {
      //     screen: 'ChatDetails',
      //     params: {username: cleanedUsername},
      //   });
      // } else {
      // navigation.navigate('CreateMealPlan');
      // }
    }
  };

  const openDocument = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: types.pdf,
      });
      if (!isCancel(res)) {
        const nameWithoutExtension = res.name.replace('.pdf', '');
        setpdfFile(res);
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
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validationSchema={uploadPlanSchema}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldError,
          }) => {
            return (
              <>
                <View style={{alignItems: 'center'}}>
                  <CustomInput
                    label="Title"
                    placeholder="Enter here"
                    value={values.title}
                    error={errors.title as string}
                    touched={touched.title as boolean}
                    initialTouched={true}
                    labelStyles={styles.label}
                    extraStyles={styles.textInput}
                    handleChange={handleChange('title')}
                    setFieldError={setFieldError}
                    fieldName="title"
                  />
                  <CustomInput
                    label="Description "
                    secondLabel={true}
                    placeholder="Description here"
                    value={values.description}
                    error={errors.description as string}
                    touched={touched.description as boolean}
                    initialTouched={true}
                    labelStyles={styles.label}
                    multiline
                    handleChange={handleChange('description')}
                    textAlignVertical="top"
                    extraStyles={[
                      styles.textInput,
                      {height: verticalScale(100)},
                    ]}
                    setFieldError={setFieldError}
                    fieldName="description"
                  />
                  <TouchableOpacity
                    onPress={openDocument}
                    style={styles.document}>
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
                          {fileName.length > 27
                            ? fileName.substring(0, 27 - 3) + '...'
                            : fileName}
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
                    placeholder=" $0.00"
                    value={values.cost}
                    error={errors.cost as string}
                    labelStyles={styles.label}
                    touched={touched.cost as boolean}
                    initialTouched={true}
                    extraStyles={styles.textInput}
                    setFieldError={setFieldError}
                    fieldName="cost"
                    handleChange={handleChange('cost')}
                    keyboardType="numeric"
                  />
                  <CustomInput
                    label="Username  (only the username listed will see this Meal plan)"
                    placeholder=" @linconsmith"
                    value={values.username}
                    error={errors.username as string}
                    touched={touched.username as boolean}
                    labelStyles={[styles.label, {width: horizontalScale(320)}]}
                    initialTouched={true}
                    extraStyles={styles.textInput}
                    setFieldError={setFieldError}
                    fieldName="username"
                    handleChange={handleChange('username')}
                  />
                </View>
                <View style={styles.button}>
                  <CustomButton onPress={handleSubmit} isDisabled={isLoading}>
                    {isLoading ? (
                      <CustomLoader />
                    ) : myMealPlan ? (
                      'Update'
                    ) : (
                      'Create'
                    )}{' '}
                  </CustomButton>
                </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: horizontalScale(16),
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
    marginBottom: 20,
  },
  textInput: {
    borderRadius: 10,
    paddingHorizontal: horizontalScale(14),
    width: horizontalScale(340),
  },
  label: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    marginBottom: 7,
  },
  button: {
    marginVertical: 35,
    marginHorizontal: 30,
  },
  document: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: horizontalScale(340),
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default UploadMealPlan;
