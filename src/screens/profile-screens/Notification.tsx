import {CustomOutputModal} from '../../components/shared-components/CustomModals';
import CustomNotification from '../../components/profile-components/CustomNotification';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
const ArrowBack = require('../../../assets/icons/arrow-back.png');
import Modal from 'react-native-modal';
import {useState} from 'react';

const NotificationScreen = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      username: 'Sameer',
      dateTime: '02/10/2023 - 10:00 AM',
      requestText: 'Requesting for a meal plan',
      responseTime: 'You have until 24hrs to respond',
    },
    {
      id: 2,
      username: 'John',
      dateTime: '02/12/2023 - 09:30 AM',
      requestText: 'Requesting for a pakacage training schedule.',
      responseTime: 'You have until 24hrs to respond',
    },
    {
      id: 3,
      username: 'Alice',
      dateTime: '02/15/2023 - 03:45 PM',
      requestText: 'Requesting for a training schedule.',
      responseTime: 'You have until 24hrs to respond',
    },
  ]);

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleConfirmPress = (notificationText: string, username: string) => {
    if (notificationText === 'Requesting for a training schedule.') {
      handleModal();
    } else {
      navigation.navigate('Message', {
        screen: 'ChatDetails',
        params: {username},
      });
    }
  };

  const handleDeclinePress = (notificationId: any) => {
    const updatedNotifications = notifications.filter(
      notification => notification.id !== notificationId,
    );
    setNotifications(updatedNotifications);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{paddingTop: 24, paddingBottom: 16}}
        onPress={() => navigation.goBack()}>
        <Image
          source={ArrowBack}
          style={{width: 24, height: 24, tintColor: 'white'}}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>Notification</Text>
      {notifications.map(notification => (
        <CustomNotification
          key={notification.id}
          username={notification.username}
          dateTime={notification.dateTime}
          requestText={notification.requestText}
          responseTime={notification.responseTime}
          handleDeclinePress={() => handleDeclinePress(notification.id)}
          handleConfirmPress={() =>
            handleConfirmPress(notification.requestText, notification.username)
          }
        />
      ))}
      <CustomNotification
        username={'Jason Smith'}
        dateTime={'02/15/2023 - 03:45 PM'}
        requestText={'Requesting for a meal plan'}
        responseTime={'Please wait until 24 hours to respond'}
        buttonVisible={false}
        containerPress={() =>
          navigation.navigate('Message', {
            screen: 'ChatDetails',
            params: {
              type: 'pending',
              username: 'Jason Smith',
            },
          })
        }
      />
      <CustomNotification
        username={'Jason Smith'}
        dateTime={'02/15/2023 - 03:45 PM'}
        requestText={'Requesting for a meal plan'}
        responseTime={'Accepted your meal plan request'}
        buttonVisible={false}
        extraResponseStyles={{color: 'rgba(32, 155, 204, 1)'}}
        containerPress={() =>
          navigation.navigate('Message', {
            screen: 'ChatDetails',
            params: {
              type: 'accepted',
              username: 'Jason Smith',
            },
          })
        }
      />
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={handleModal}
        onBackdropPress={handleModal}
        style={styles.modal}>
        <CustomOutputModal
          type="success"
          modalText="Package Training Schedule Accepted"
          onPress={handleModal}
          buttonText="Back"
          extraTextStyles={{
            marginHorizontal: 40,
            textAlign: 'center',
            lineHeight: 24,
            marginBottom: -7,
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
  modal: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});

export default NotificationScreen;
