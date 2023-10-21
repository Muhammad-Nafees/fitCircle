import {CustomPlanDescription} from '../../../components/dashboard-components/CustomNutritionistPlan';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
const ArrowBack = require('../../../../assets/icons/arrow-back.png');
import CustomButton from '../../../components/shared-components/CustomButton';
import Modal from 'react-native-modal';
import {useCallback, useEffect, useState} from 'react';
import {
  CustomConfirmationModal,
  CustomOutputModal,
} from '../../../components/shared-components/CustomModals';
import {IMealPlan} from '../../../interfaces/mealPlan.interface';
import {
  deleteMealPlanById,
  getMealPlansByNutritionist,
} from '../../../api/mealPlan-module';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import NutritionisitPlanContainer from '../../../components/dashboard-components/NutritionisitPlanContainer';

const CreateMealPlan = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [outputModal, setOutputModal] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState<string>('');
  const [mealPlans, setMealPlans] = useState<IMealPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const userData = useSelector((state: RootState) => state.auth.user);

  const handleDeleteMealPlan: any = (itemId: string) => {
    setIsModalVisible(!isModalVisible);
    setDeletedItemId(itemId);
  };

  const handleDeleteConfirmed = async () => {
    setIsLoading(true);
    try {
      const response = await deleteMealPlanById(deletedItemId);
      setIsLoading(false);
      setIsDeleted(!isDeleted);
      setDeletedItemId('');
      setIsModalVisible(false);
      setOutputModal(!outputModal);
    } catch (error: any) {
      console.log(error?.response?.data, 'From Delete meal plan!');
    }
  };

  const handleEditPlan = (planId: number) => {
    // const selectedPlan = data.find(plan => plan.id === planId);
    // navigation.navigate('UploadMealPlan', {
    //   dummyData: {
    //     title: selectedPlan?.planName,
    //     cost: selectedPlan?.price,
    //     description: selectedPlan?.description,
    //     username: '@testingUser',
    //   },
    // });
  };

  const fetchMealPlansByNutritionist = async () => {
    setIsLoading(true);
    try {
      const response = await getMealPlansByNutritionist(
        page,
        limit,
        userData?._id as string,
      );
      const data = response?.data?.data;
      const mealPlans = data?.mealPlans;
      setMealPlans(mealPlans);
    } catch (error: any) {
      console.log(error?.response?.data, 'From Meal plans!');
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchMealPlansByNutritionist();
    }, [isDeleted]),
  );

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
        <Text style={styles.heading}>My Meal Plan</Text>
        <NutritionisitPlanContainer
          isLoading={isLoading}
          mealPlans={mealPlans}
          handleDeleteMealPlan={handleDeleteMealPlan}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => navigation.navigate('UploadMealPlan')}>
          Add Meal Plan
        </CustomButton>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={handleDeleteMealPlan}
        onBackdropPress={handleDeleteMealPlan}
        style={styles.modal}>
        <CustomConfirmationModal
          onCancel={handleDeleteConfirmed}
          onConfirm={handleDeleteMealPlan}
          modalText="Are you sure you want to Delete this?"
          highlightedWord={'Delete'}
          confirmText="Return"
          cancelText="Delete"
          cancelColor="rgba(220, 77, 77, 1)"
          confirmColor="rgba(32, 128, 183, 1)"
        />
      </Modal>
      <Modal
        isVisible={outputModal}
        onBackButtonPress={() => setOutputModal(false)}
        onBackdropPress={() => setOutputModal(false)}
        style={styles.modal}>
        <CustomOutputModal
          type="failed"
          modalText="Deleted"
          onPress={() => setOutputModal(false)}
        />
      </Modal>
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
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modal: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});

export default CreateMealPlan;
