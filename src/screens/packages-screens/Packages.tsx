import React, {useState} from 'react';
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

const ArrowBack = require('../../../assets/icons/arrow-back.png');

const PackagesScreen = ({navigation}: any) => {
  const userRole: any = useSelector((state: RootState) => state.auth.userRole);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [outputModal, setOutputModal] = useState(false);

  const handleDeletePackage = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDeleteConfirmed = () => {
    setIsModalVisible(false);
    setOutputModal(!outputModal);
  };

  const handleEditPackage = () => {
    navigation.navigate('CreatePackageScreen', {
      dummyData: {
        packageTitle: '30 Days New Year Challenge',
        packageDescription: 'A great routine for biceps and triceps workout!',
        preview: 'Something',
        cost: '100',
        hours: '1',
        username: '@testingUser123',
      },
    });
  };

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
        <View style={{marginVertical: 16}}>
          <CustomTrainerPackage
            hidePackageButton={true}
            handleEditButton={handleEditPackage}
            handleDeleteButton={handleDeletePackage}
          />
          <CustomTrainerPackage
            hidePackageButton={true}
            handleEditButton={handleEditPackage}
            handleDeleteButton={handleDeletePackage}
          />
          <CustomTrainerPackage
            hidePackageButton={true}
            handleEditButton={handleEditPackage}
            handleDeleteButton={handleDeletePackage}
          />
        </View>
      </ScrollView>
      <View style={{margin: 20}}>
        <CustomButton
          onPress={() => navigation.navigate('CreatePackageScreen')}>
          Add Package
        </CustomButton>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={handleDeletePackage}
        onBackdropPress={handleDeletePackage}
        style={styles.modal}>
        <CustomConfirmationModal
          onCancel={handleDeleteConfirmed}
          onConfirm={handleDeletePackage}
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
  },
  modal: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});

export default PackagesScreen;
