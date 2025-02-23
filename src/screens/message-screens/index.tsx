import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
// -----------------------------------------------------------------------------//
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CustomContact from '../../components/message-components/CustomContact';
const ArrowBack = require('../../../assets/icons/arrow-back.png');
const SearchIcon = require('../../../assets/icons/search.png');
import {messageDummyData} from '../dummyData';
import {
  CustomConfirmationModal,
  CustomOutputModal,
} from '../../components/shared-components/CustomModals';
import {useFocusEffect} from '@react-navigation/native';

export const MessagesOne = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageData, setMessageData] = useState(messageDummyData);
  const [removeModal, setRemoveModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [actionType, setActionType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredContacts = messageData.filter(item =>
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    setSearchQuery('');
  }, []);

  const handleDeleteUser = () => {
    setIsModalVisible(false);
    setRemoveModal(true);
    const updatedData = messageData.filter(item => item.id !== deleteId);
    setMessageData(updatedData);
  };
  const handleCancelButton = (userId: string) => {
    setDeleteId(userId);
    setIsModalVisible(!isModalVisible);
  };

  const renderItem = ({item}: any) => (
    <CustomContact
      name={item.name}
      message={item.message}
      index={item.id}
      messageCount={item.messageCount}
      handleDeleteButton={() => handleCancelButton(item.id)}
      setActionType={setActionType}
    />
  );

  useFocusEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });

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
      <Text style={styles.heading}>Messages</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textinputContainer}>
          <Image source={SearchIcon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search ..."
            style={styles.input}
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
        <View style={{gap: 10}}>
          <FlatList
            data={filteredContacts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackButtonPress={() => setIsModalVisible(false)}>
        <CustomConfirmationModal
          confirmText="Return"
          cancelText={actionType === 'Blocked' ? 'Block' : 'Delete'}
          modalHeading="Please Confirm"
          modalText={`Are you sure you want to ${
            actionType === 'Blocked' ? 'Block' : 'Delete'
          } this user?`}
          highlightedWord={actionType === 'Blocked' ? 'Block' : 'Delete'}
          onConfirm={() => setIsModalVisible(false)}
          onCancel={handleDeleteUser}
          confirmColor="rgba(32, 128, 183, 1)"
          cancelColor="rgba(220, 77, 77, 1)"
        />
      </Modal>
      <Modal
        isVisible={removeModal}
        style={styles.modal}
        onBackButtonPress={() => setRemoveModal(false)}>
        <CustomOutputModal
          type={actionType === 'Blocked' ? 'success' : 'failed'}
          modalText={actionType === 'Blocked' ? 'Blocked' : 'Deleted'}
          onPress={() => setRemoveModal(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginHorizontal: 14,
  },
  searchIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    tintColor: '#fff',
    marginLeft: horizontalScale(10),
  },
  textinputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2d2f',
    paddingHorizontal: horizontalScale(40),
    marginVertical: verticalScale(10),
    width: '100%',
  },
  input: {
    width: '100%',
    marginHorizontal: horizontalScale(20),
    color: 'white',
  },
  contentContainer: {
    paddingHorizontal: horizontalScale(15),
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});
