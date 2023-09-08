import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CustomContact from '../../components/message-components/CustomContact';
const ArrowBack = require('../../../assets/icons/arrow-back.png');
const SearchIcon = require('../../../assets/icons/search.png');
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {messageDummyData} from '../dummyData';
import {useState} from 'react';
import CrossIcon from '../../../assets/icons/Cross';
import CustomButton from '../../components/shared-components/CustomButton';
import {STYLES} from '../../styles/globalStyles';

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
      messageCount={item.messageCount}
      handleDeleteButton={() => handleCancelButton(item.id)}
      setActionType={setActionType}
    />
  );
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
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: 'white',
          marginHorizontal: 14,
        }}>
        Messages
      </Text>
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
        onBackButtonPress={() => setIsModalVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={styles.modalContent}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 30,
              paddingTop: 15,
              gap: 15,
            }}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
              Please Confirm
            </Text>
            <Text style={styles.whiteText}>
              Are you sure you want to{' '}
              <Text style={styles.coloredText}>
                {actionType === 'Deleted' ? 'Delete' : 'Block'}
              </Text>{' '}
              this user ?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.5)',
              width: '100%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteUser}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: 'rgba(220, 77, 77, 1)',
                }}>
                {actionType === 'Deleted' ? 'Delete' : 'Block'}
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.modalButton}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: 'rgba(32, 128, 183, 1)',
                  textAlign: 'center',
                }}>
                Return
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={removeModal}
        style={styles.modal}
        onBackButtonPress={() => setRemoveModal(false)}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={[styles.modalContent, {backgroundColor: 'transparent'}]}>
          <View style={styles.card}>
            {actionType === 'Blocked' ? (
              <View style={styles.iconModal}>
                <Icon name="checkmark-outline" color="white" size={24} />
              </View>
            ) : (
              <CrossIcon />
            )}
            <Text style={[STYLES.text14, {marginTop: 2}]}>{actionType}</Text>
            {/* <Text
                style={[
                  STYLES.text14,
                  {marginTop: 2, color: 'rgba(48, 210, 152, 1)'},
                ]}>
                Removed Successfully
              </Text> */}
            <View style={{width: '75%', marginTop: verticalScale(25)}}>
              <CustomButton onPress={() => setRemoveModal(false)}>
                Return
              </CustomButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
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
  coloredText: {
    color: 'rgba(220, 77, 77, 1)',
    fontSize: 14,
    fontWeight: '500',
  },
  whiteText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginHorizontal: 28,
    textAlign: 'center',
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  card: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(271),
    height: verticalScale(180),
    borderRadius: 30,
  },
  iconModal: {
    width: horizontalScale(34),
    height: verticalScale(34),
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    borderRadius: 32,
    alignItems: 'center',
    marginHorizontal: horizontalScale(35),
  },
  modalButton: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(60),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
