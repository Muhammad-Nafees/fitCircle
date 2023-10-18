import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {
  CustomOutputModal,
  CustomConfirmationModal,
} from '../../components/shared-components/CustomModals';
import Modal from 'react-native-modal';
import {useState} from 'react';

const DeleteAccountScreen = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [outputModal, setOutputModal] = useState(false);

  const handleOutputModal = () => {
    setIsModalVisible(false);
    setOutputModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Delete Account</Text>
      <View style={styles.contentContainer}>
        <View style={{paddingHorizontal: 40, marginBottom: 20}}>
          <Text style={[styles.text, {fontSize: 20, textAlign: 'center'}]}>
            Delete your account?
          </Text>
          <Text
            style={[
              styles.text,
              {fontSize: 12, textAlign: 'center', marginVertical: 20},
            ]}>
            Deleting your account will remove all of your account’s data,
            contacts, and other information. Are you sure you want to proceed?
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            gap: 16,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(true)}>
            <Text style={[styles.text, {fontSize: 14, textAlign: 'center'}]}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.text, {fontSize: 12, textAlign: 'center'}]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
        style={styles.modal}>
        <CustomConfirmationModal
          modalText="Please enter the word “CIRCLE” before we delete your account."
          modalHeading="Confirmation"
          confirmText="OK"
          cancelText="Cancel"
          onConfirm={handleOutputModal}
          onCancel={() => setIsModalVisible(false)}
          confirmColor="rgba(32, 128, 183, 1)"
          cancelColor="rgba(220, 77, 77, 1)"
          textInput={true}
          extraModalStyles={{height: verticalScale(206)}}
        />
      </Modal>
      <Modal
        isVisible={outputModal}
        onBackButtonPress={() => setOutputModal(false)}
        onBackdropPress={() => setOutputModal(false)}
        style={styles.modal}>
        <CustomOutputModal
          type="failed"
          modalText="Account deleted"
          buttonText="Back"
          onPress={() => setOutputModal(false)}
          extraTextStyles={{
            color: 'rgba(255, 101, 101, 1)',
            fontWeight: '600',
            fontSize: 16,
          }}
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '400',
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(254, 138, 138, 1)',
    paddingVertical: 16,
    borderRadius: 6,
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,1)',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});

export default DeleteAccountScreen;
