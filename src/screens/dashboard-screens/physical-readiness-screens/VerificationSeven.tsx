import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
// --------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import {VerificationOne} from './VerificationOne';
import VerificationTwo from './VerificationTwo';
import VerificationFour from './VerificationFour';
import VerificationFive from './VerificationFive';
import VerificationSix from './VerificationSix';
import CustomButton from '../../../components/shared-components/CustomButton';
import {IPhysicalActivity} from '../../../interfaces/user.interface';
import {addPhysicalActivity} from '../../../api/dashboard-module';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';

type Mcq = {
  question: string;
  options?: string[];
  answer: string;
};

const VerificationSeven = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    verificationOne,
    verificationTwo,
    verificationFour,
    verificationFive,
    verificationSix,
    initial,
  } = route?.params;

  const handleFormSave = async () => {
    const reqData = {
      ...verificationOne,
      ...verificationTwo,
      ...verificationFour,
      ...verificationFive,
      ...verificationSix,
      initial,
    };
    console.log(verificationSix, 'verif');
    console.log(reqData, 'req');
    setIsLoading(true);
    try {
      const response = await addPhysicalActivity(reqData);
      Toast.show({
        type: 'success',
        text1: `${response?.data?.message}`,
      });
      setIsLoading(false);
      navigation.navigate('Dashboard');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
      console.log(error?.response?.data, 'from add physical activity!');
    }
  };

  const disabledStlyes = {
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    color: 'rgba(255, 255, 255, 0.5)',
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
          <VerificationOne
            data={verificationOne}
            disabled={true}
            disabledStlyes={disabledStlyes}
          />
          <VerificationTwo
            data={verificationTwo}
            disabled={true}
            disabledStlyes={disabledStlyes}
          />
          <VerificationFour
            data={verificationFour}
            disabled={true}
            disabledStlyes={disabledStlyes}
          />
          <VerificationFive
            data={verificationFive}
            disabled={true}
            disabledStlyes={disabledStlyes}
          />
          <VerificationSix
            data={verificationSix}
            disabled={true}
            disabledStlyes={disabledStlyes}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() =>
              navigation.navigate('VerificationOne', {clearValues: true})
            }>
            Retake
          </CustomButton>
          <CustomButton onPress={handleFormSave} isDisabled={isLoading}>
            {isLoading ? <CustomLoader /> : 'Continue'}{' '}
          </CustomButton>
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
