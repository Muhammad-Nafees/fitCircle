import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, BackHandler} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {VerificationOne} from './VerificationOne';
import VerificationTwo from './VerificationTwo';
import VerificationFour from './VerificationFour';
import VerificationFive from './VerificationFive';
import VerificationSix from './VerificationSix';
import CustomButton from '../../../components/shared-components/CustomButton';
import axiosInstance from '../../../api/interceptor';

type Mcq = {
  question: string;
  options?: string[];
  answer: string;
};

const VerificationSeven = ({navigation, route}: any) => {
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
  const {
    verificationOne,
    verificationTwo,
    verificationFour,
    verificationFive,
    optionals,
    initial,
  } = route?.params;

  const addMcq = (elem: Mcq, arr: Mcq[]) => {
    const mcqs = [...arr];
    const obj: Mcq = {
      question: elem.question,
      answer: elem.answer,
    };

    if (elem.answer === 'Yes' || elem.answer === 'No')
      obj['options'] = ['Yes', 'No'];

    mcqs.push(obj);

    return mcqs;
  };

  const handleFormSave = async () => {
    try {
      const goals = optionals;
      let mcqs: Mcq[] = [];

      if (verificationFour)
        verificationFour?.physicalAReadiness?.forEach((elem: Mcq) => {
          const newMcqs = addMcq(elem, mcqs);
          mcqs = [...newMcqs];
        });

      if (verificationTwo)
        verificationTwo?.forEach((elem: Mcq) => {
          const newMcqs = addMcq(elem, mcqs);
          mcqs = [...newMcqs];
        });

      if (verificationFive)
        for (var key in verificationFive) {
          if (verificationFive.hasOwnProperty(key)) {
            mcqs.push({
              question:
                key === 'desiredBodyFat'
                  ? 'Desired Body Fat'
                  : key === 'desiredLeanMuscle'
                  ? 'Desired lean Muscle'
                  : key === 'desiredWeight'
                  ? 'Desired Weight'
                  : 'I plan to exercise ___ times of the week',
              answer: verificationFive[key],
            });
          }
        }

      const dateArr = verificationOne?.date?.split('/');
      const reqDate = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;

      const reqObj = {
        date: reqDate,
        email: verificationOne?.email,
        firstName: verificationOne?.firstName,
        lastName: verificationOne?.lastName,
        address: verificationOne?.address,
        city: verificationOne?.city,
        zip: verificationOne?.zip,
        homePhone: verificationOne?.homePhone,
        cellphone: verificationOne?.cellPhone,
        age: verificationOne?.age,
        height: verificationOne?.height,
        weight: verificationOne?.weight,
        goal: goals,
        mcqs: mcqs,
      };

      const response = await axiosInstance.post(`physical-readiness`, reqObj);

      console.log(
        '🚀 ~ file: VerificationSeven.tsx:97 ~ handleFormSave ~ response:',
        response,
      );
      navigation.navigate('FormSaved');
    } catch (error) {
      console.log('🚀 ~ handleFormSave ~ error:', error);
    }
  };

  return (
    <View style={{backgroundColor: '#292A2C'}}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Text
          style={[
            STYLES.text16,
            {
              fontWeight: '700',
              marginTop: 16,
              paddingHorizontal: 16,
              paddingBottom: 28,
            },
          ]}>
          Physical Activity Readiness
        </Text>
        <View style={styles.formContainer}>
          <VerificationOne data={verificationOne} disabled={true} />
          <VerificationTwo data={verificationTwo} disabled={true} />
          <VerificationFour data={verificationFour} disabled={true} />
          <VerificationFive data={verificationFive} disabled={true} />
          <VerificationSix data={optionals} disabled={true} />
        </View>
        <View
          style={{
            gap: 15,
            marginTop: 20,
            marginBottom: 50,
            marginHorizontal: 50,
          }}>
          <CustomButton
            onPress={() =>
              navigation.navigate('VerificationOne', {clearValues: true})
            }>
            Retake
          </CustomButton>
          <CustomButton onPress={handleFormSave}>Continue</CustomButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 0,
  },
});

export default VerificationSeven;
