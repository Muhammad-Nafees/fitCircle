import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Modal from 'react-native-modal';
// -----------------------------------------------------------------------------------------------------//
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {CustomNutritionistPlan} from '../../../components/dashboard-components/CustomNutritionistPlan';
const SearchIcon = require('../../../../assets/icons/search.png');
const ArrowBack = require('../../../../assets/icons/arrow-back.png');
import MealPlanPdf from '../../../../assets/icons/MealPlanPdf';
import CustomButton from '../../../components/shared-components/CustomButton';
import {nutritionistInfo2 as nutritionistInfo} from '../../dummyData';
import {
  getAllMealPlans,
  searchMealPlan,
  searchNutritionist,
} from '../../../api/mealPlan-module';
import {IAllMealPlans, IMealPlan} from '../../../interfaces/mealPlan.interface';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {IUser} from '../../../interfaces/user.interface';

export const MealPlanThree = ({navigation}: any) => {
  const [planModal, setPlanModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalPrice, setModalPrice] = useState('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allMealPlans, setAllMealPlans] = useState<IAllMealPlans[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

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
  // api call

  const fetchAllMealPlans = async () => {
    setIsLoading(true);
    try {
      const response = await getAllMealPlans(page, limit);
      const data = response?.data?.data;
      setAllMealPlans(data?.mealPlans);
    } catch (error: any) {
      console.log(error?.response?.data, 'From fetching All meal plans!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllMealPlans();
  }, [searchQuery]);

  const handleSearchNutritionist = async (search: string) => {
    setIsLoading(true);
    try {
      const response = await searchMealPlan(search);
      const mealPlan = response?.data?.data?.mealPlans;
      setAllMealPlans(mealPlan);
    } catch (error: any) {
      console.log(error?.response?.data, 'FROM SEARCHING MEAL PLAN!');
    }
    setIsLoading(false);
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
        <Text style={[styles.buttonText, {marginHorizontal: 14}]}>
          Nutritionist
        </Text>
        <View style={styles.textInputParentContainer}>
          <View style={styles.textinputContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search ..."
              style={styles.input}
              onChangeText={(value: string) => handleSearchNutritionist(value)}
              placeholderTextColor="#fff"
            />
          </View>
        </View>
        <View style={{flex: 0.9, marginTop: 10, gap: 20}}>
          {isLoading ? (
            <CustomLoader extraStyles={{marginTop: 30}} />
          ) : !allMealPlans ? (
            <Text style={{color: 'white', padding: 20}}>
              No Meal Plans found!
            </Text>
          ) : (
            allMealPlans?.map((mealPlan: IAllMealPlans) => (
              <CustomNutritionistPlan
                {...nutritionistInfo}
                plans={mealPlan?.mealPlans}
                nutritionistInfo={mealPlan?.nutritionist}
                key={mealPlan?._id}
                handleModalOpen={handleModalOpen}
              />
            ))
          )}
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
            <Text style={[styles.buttonText, {textAlign: 'center'}]}>
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
    paddingBottom: 20,
  },
  searchIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    tintColor: '#fff',
    marginLeft: horizontalScale(10),
  },
  textInputParentContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textinputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2d2f',
    marginBottom: -verticalScale(5),
    paddingHorizontal: horizontalScale(25),
    width: '90%',
  },
  input: {
    width: '100%',
    marginHorizontal: horizontalScale(5),
    color: '#ffffff',
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
