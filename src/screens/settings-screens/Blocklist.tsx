import {useState} from 'react';
import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {horizontalScale, verticalScale} from '../../utils/metrics';

export const BlocklistScreen = () => {
  const dummyUserData = [
    {username: 'John Doe', id: 1},
    {username: 'Alice Johnson', id: 2},
    {username: 'Bob Smith', id: 3},
    {username: 'Eva Williams', id: 4},
    {username: 'Michael Brown', id: 5},
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState(dummyUserData);

  const handlePress = user => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleUnblock = user => {
    setModalVisible(false);
    const updatedData = userData.filter(item => item.id !== user.id);
    setUserData(updatedData);
    setSelectedUser(null);
  };

  return (
    <View style={styles.container}>
      <View style={{paddingBottom: 16}}>
        <Text style={styles.heading}>Blocklist</Text>
      </View>
      <View style={{paddingHorizontal: 5}}>
        {userData.map(user => (
          <View key={user.id} style={styles.rowContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <CustomProfileAvatar username={user.username} />
              <Text style={styles.username}>{user.username}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePress(user)}>
              <Text style={styles.followButtonText}>Unblock</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Modal
        isVisible={modalVisible}
        style={styles.modal}
        onBackButtonPress={() => setModalVisible(false)}
        animationOutTiming={10}>
        <View style={styles.modalContent}>
          <View style={styles.modalAvatarText}>
            <CustomProfileAvatar
              size={93}
              username={selectedUser ? selectedUser.username : ' '}
            />
            <Text style={styles.name}>
              {selectedUser ? selectedUser.username : ''}
            </Text>
            <Text style={styles.whiteText}>
              Are you sure you want to
              <Text
                style={[
                  styles.whiteText,
                  {fontWeight: '500', color: '#DC4D4D'},
                ]}>
                {' '}
                Unblock{' '}
              </Text>
              this user ?
            </Text>
          </View>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleUnblock(selectedUser)}>
              <Text style={styles.modalButtonText}>Unblock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                {borderLeftWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)'},
              ]}
              onPress={() => setModalVisible(false)}>
              <Text
                style={[
                  styles.modalButtonText,
                  {color: 'rgba(32, 128, 183, 1)'},
                ]}>
                Return
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: 16,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  username: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    lineHeight: 19,
  },
  followButtonText: {
    color: '#209BCC',
    fontWeight: '400',
    fontSize: 12,
  },
  modalContent: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 280,
    width: 287,
  },
  modalButton: {
    paddingVertical: verticalScale(15),
    flex: 1,
  },
  whiteText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginHorizontal: 28,
    textAlign: 'center',
  },
  modal: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  modalAvatarText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 15,
    gap: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(220, 77, 77, 1)',
    textAlign: 'center',
  },
});
