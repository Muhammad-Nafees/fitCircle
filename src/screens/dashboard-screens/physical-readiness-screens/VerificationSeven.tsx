import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, BackHandler} from 'react-native';
// --------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import {VerificationOne} from './VerificationOne';
import VerificationTwo from './VerificationTwo';
import VerificationFour from './VerificationFour';
import VerificationFive from './VerificationFive';
import VerificationSix from './VerificationSix';
import CustomButton from '../../../components/shared-components/CustomButton';

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
    navigation.navigate('FormSaved');
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
        <View style={styles.buttonContainer}>
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
  buttonContainer: {
    gap: 15,
    marginTop: 20,
    marginBottom: 50,
    marginHorizontal: 50,
  },
});

export default VerificationSeven;
