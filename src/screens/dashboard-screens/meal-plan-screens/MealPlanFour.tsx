import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {CustomNutritionistPlan} from '../../../components/dashboard-components/CustomNutritionistPlan';
const SearchIcon = require('../../../../assets/icons/search.png');
const ArrowBack = require('../../../../assets/icons/arrow-back.png');
import CustomButton from '../../../components/shared-components/CustomButton';
import {BlurView} from '@react-native-community/blur';
import Modal from 'react-native-modal';
import MealPlanPdf from '../../../../assets/icons/MealPlanPdf';
import {useState} from 'react';

export const MealPlanFour = ({navigation}: any) => {
  const [planModal, setPlanModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalPrice, setModalPrice] = useState('');
  const nutritionistInfo = {
    name: 'Lindsey Middleton',
    role: 'Nutritionist',
    plans: [
      {
        planName: 'Weight Loss Meal Plan',
        price: '$100',
        description: 'For people who are losing weight',
      },
      {
        planName: 'Weight Gain Meal Plan',
        price: '$100',
        description: 'For people who are gaining weight',
      },
      {
        planName: 'Weight Gain Meal Plan',
        price: '$100',
        description: 'For people who are gaining weight',
      },
      {
        planName: 'Weight Gain Meal Plan',
        price: '$100',
        description: 'For people who are gaining weight',
      },
      {
        planName: 'Weight Gain Meal Plan',
        price: '$100',
        description: 'For people who are gaining weight',
      },
    ],
  };

  const handleModalOpen = (text: string, price: string) => {
    setModalPrice(price);
    setModalText(text);
    setPlanModal(true);
  };

  const payment = () => {
    setPlanModal(false);
    navigation.navigate('SuccessfulDialog');
    setModalText('');
    setModalPrice('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{paddingTop: 24, paddingBottom: 16, paddingHorizontal: 12}}
        onPress={() => navigation.goBack()}>
        <Image
          source={ArrowBack}
          style={{width: 24, height: 24, tintColor: 'white'}}
        />
      </TouchableOpacity>
      <ScrollView>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: 'white',
            marginHorizontal: 14,
          }}>
          Meal Plans
        </Text>
        <View style={{flex: 1, marginTop: 10}}>
          <CustomNutritionistPlan
            {...nutritionistInfo}
            handleModalOpen={handleModalOpen}
          />
        </View>
      </ScrollView>
      <Modal
        onBackButtonPress={() => setPlanModal(false)}
        isVisible={planModal}
        style={styles.bottomModal}
        onBackdropPress={() => setPlanModal(false)}
        backdropOpacity={0.1}>
        <BlurView
          blurType="light"
          blurAmount={4}
          overlayColor="transparent"
          reducedTransparencyFallbackColor="rgba(255,255,255,.2)"
          style={styles.blurContainer}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => setPlanModal(false)}
              style={styles.topLine}></TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
              }}>
              Buy Meal Plan
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <MealPlanPdf width={48} height={63} />
              <Text style={{color: 'white'}}>{modalText}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <CustomButton
                extraStyles={{paddingHorizontal: 80, marginTop: 40}}
                extraTextStyles={{fontSize: 14, fontWeight: '600'}}
                onPress={payment}>
                Pay{' '}
                <Text style={{color: 'rgba(48, 210, 152, 1)'}}>
                  {modalPrice}
                </Text>{' '}
                Via Wallet
              </CustomButton>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flex: 1,
  },
  blurContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '45%',
  },
  topLine: {
    height: verticalScale(5),
    width: horizontalScale(48),
    backgroundColor: 'white',
    marginBottom: verticalScale(38),
    marginTop: 14,
    alignSelf: 'center',
    borderRadius: 3,
  },
});
