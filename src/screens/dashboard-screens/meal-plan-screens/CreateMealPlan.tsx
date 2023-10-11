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
import {useState} from 'react';
import {
  CustomConfirmationModal,
  CustomOutputModal,
} from '../../../components/shared-components/CustomModals';

const dummyData = [
  {
    id: 1,
    planName: 'Basic Meal Plan',
    price: '$49.99',
    description: 'For people who are losing weight',
  },
  {
    id: 2,
    planName: 'Premium Meal Plan',
    price: '$79.99',
    description: 'For people who are losing weight',
  },
  {
    id: 3,
    planName: 'Vegetarian Meal Plan',
    price: '$59.99',
    description: 'For people who are losing weight',
  },
  {
    id: 4,
    planName: 'Family Meal Plan',
    price: '$99.99',
    description: 'For people who are losing weight',
  },
];

const CreateMealPlan = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [outputModal, setOutputModal] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState<number | null>(null);
  const [data, setData] = useState(dummyData);

  const handleDeleteMealPlan: any = (itemId: number) => {
    setIsModalVisible(!isModalVisible);
    setDeletedItemId(itemId);
  };

  const handleDeleteConfirmed = () => {
    const updatedData = data.filter(item => item.id !== deletedItemId);
    setData(updatedData);
    setDeletedItemId(null);
    setIsModalVisible(false);
    setOutputModal(!outputModal);
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
        <Text style={styles.heading}>My Meal Plan</Text>
        {data.map((plan, index) => (
          <CustomPlanDescription
            key={plan.id}
            plan={plan}
            handleDeleteButton={() => handleDeleteMealPlan(plan.id)}
          />
        ))}
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
        onBackButtonPress={handleDeleteConfirmed}
        onBackdropPress={handleDeleteConfirmed}
        style={styles.modal}>
        <CustomOutputModal
          type="failed"
          modalText="Deleted"
          onPress={handleDeleteConfirmed}
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
