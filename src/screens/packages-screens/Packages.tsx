import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {horizontalScale} from '../../utils/metrics';
import {CustomTrainerPackage} from '../../components/profile-components/CustomTrainerPackage';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import CustomButton from '../../components/shared-components/CustomButton';
import Modal from 'react-native-modal';
import {
  CustomConfirmationModal,
  CustomOutputModal,
} from '../../components/shared-components/CustomModals';
import {deletePackageById, getTrainerPackages} from '../../api/packages-module';
import {useFocusEffect} from '@react-navigation/native';
import CustomLoader from '../../components/shared-components/CustomLoader';
import TrainerPackagesContainer from '../../components/profile-components/TrainerPackagesContainer';
import {IPackage} from '../../interfaces/package.interface';

const ArrowBack = require('../../../assets/icons/arrow-back.png');

const PackagesScreen = ({navigation}: any) => {
  const userData: any = useSelector((state: RootState) => state.auth.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [outputModal, setOutputModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [deletedItemId, setDeletedItemId] = useState<string>('');

  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleDeletePackage = (id: string) => {
    setIsModalVisible(!isModalVisible);
    setDeletedItemId(id);
  };

  const handleDeleteConfirmed = async () => {
    setIsLoading(true);
    try {
      const response = await deletePackageById(deletedItemId);
      setIsLoading(false);
      setIsDeleted(!isDeleted);
      setIsModalVisible(false);
      setOutputModal(!outputModal);
    } catch (error: any) {
      console.log(error?.response?.data, 'From Delete Package!');
    }
  };

  const fetchPackagesByTrainer = async () => {
    setIsLoading(true);
    try {
      const response = await getTrainerPackages(
        page,
        limit,
        userData?._id as string,
      );
      const data = response?.data?.data;
      setPackages(data?.packages);
    } catch (error: any) {
      console.log(error?.response?.data, 'From Packages!');
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPackagesByTrainer();
    }, [isDeleted]),
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TouchableOpacity
          style={{paddingTop: 24, paddingBottom: 16}}
          onPress={() => navigation.navigate('Dashboard')}>
          <Image
            source={ArrowBack}
            style={{width: 24, height: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Packages</Text>

        <TrainerPackagesContainer
          isLoading={isLoading}
          packages={packages}
          handleDeletePackage={handleDeletePackage}
        />
      </ScrollView>
      <View style={{margin: 20}}>
        <CustomButton
          onPress={() => navigation.navigate('CreatePackageScreen')}>
          Add Package
        </CustomButton>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => {}}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}>
        <CustomConfirmationModal
          onCancel={handleDeleteConfirmed}
          onConfirm={() => {}}
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
    backgroundColor: '#292a2c',
    paddingHorizontal: horizontalScale(16),
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
    marginBottom: 30,
  },
  modal: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});

export default PackagesScreen;
