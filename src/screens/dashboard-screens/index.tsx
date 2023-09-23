import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
// -------------------------------------------------------------------------------------//
import {RootState} from '../../redux/store';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import ScheduleDashboardIcon from '../../../assets/icons/ScheduleDashboardIcon';
import WalletDashboardIcon from '../../../assets/icons/WalletDashboard';
import PackagesMealIcon from '../../../assets/icons/PackagesMealIcon';
import {CustomTransaction} from '../../components/dashboard-components/CustomTransaction';
import {ScheduleContainer} from '../../components/dashboard-components/ScheduleContainer';
import {TransactionModal} from '../../components/dashboard-components/TransactionModal';
import {HeaderContainer} from '../../components/dashboard-components/HeaderContainer';
import {userBasedItems} from '../../components/dashboard-components/UserBasedItems';

const DashboardScreen = ({navigation}: any) => {
  const userData: any = useSelector((state: RootState) => state.auth.user);
  const isTrainerAvailable = userData?.role !== 'user';
  const username = userData?.username;
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userId, setUserId] = useState(userData?._id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    setUserId(userData?._id);
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  const withNavigationAction = (routeName: string) => {
    return () => {
      navigation.navigate(routeName);
    };
  };

  const roleBasedItems =
    userData?.role !== 'user'
      ? [
          {
            text: 'Packages / Meal Plan',
            icon: <PackagesMealIcon />,
            dropdown: isDropdownVisible,
            selectOption: option => {
              setSelectedOption(option);
              if (option === 'Meal Plan') {
                navigation.navigate('MealPlanScreen');
              }
            },
          },
          {
            text: 'Wallet',
            icon: <WalletDashboardIcon />,
          },
          {
            text: 'Schedule',
            icon: <ScheduleDashboardIcon />,
            routeName: 'ScheduleScreen',
          },
        ]
      : userBasedItems;

  const renderItem = ({item}: any) => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={
            item.text === 'Packages / Meal Plan'
              ? () => setIsDropdownVisible(!isDropdownVisible)
              : item.routeName && withNavigationAction(item.routeName)
          }
          style={styles.carouselItem}>
          {item.icon}
          <Text style={styles.carouselItemText}>{item.text}</Text>
        </TouchableOpacity>
        {item.text === 'Packages / Meal Plan' &&
          item.dropdown &&
          isDropdownVisible && (
            <View style={styles.dropdown}>
              <Text
                onPress={() => console.log('Packages')}
                style={styles.dropdownOption}>
                Packages
              </Text>
              <View style={styles.horizontalLine} />
              <TouchableOpacity>
                <Text
                  onPress={() => item.selectOption('Meal Plan')}
                  style={styles.dropdownOption}>
                  Meal Plan
                </Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <HeaderContainer
          username={username}
          isTrainerAvailable={isTrainerAvailable}
          userData={userData}
        />
        <View style={styles.scheduleContainer}>
          <ScheduleContainer
            username={username}
            userData={userData}
            isTrainerAvailable={isTrainerAvailable}
            openModal={openModal}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            width: screenWidth,
            paddingRight: 30,
          }}>
          <FlatList
            horizontal
            data={roleBasedItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 10}}
          />
        </View>
      </View>
      <View style={[styles.bottomContainer, isTrainerAvailable && {flex: 1}]}>
        <Text style={styles.transactionText}>Last Transaction</Text>
        {userData.role === 'trainer' ? (
          <Text
            style={[
              styles.transactionText,
              {fontSize: 14, paddingVertical: 0, opacity: 0.8},
            ]}>
            Coming soon
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('TransactionScreen')}>
            <CustomTransaction
              profileImageUrl={profileImageUrl}
              username="Sam"
              name="Sameer Ather"
              date={'May 4'}
              amount="- $50"
              listText="Unlocked Content"
            />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}>
        <TransactionModal />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
  },
  topContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  scheduleContainer: {
    marginTop: 20,
    gap: 12,
    backgroundColor: '#222123',
    borderRadius: 10,
    padding: 18,
  },
  bottomContainer: {
    backgroundColor: '#222123',
    flex: 2,
    marginTop: -verticalScale(20),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: -1,
  },
  carouselItem: {
    backgroundColor: '#209BCC',
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(106),
    height: verticalScale(115),
    borderRadius: 10,
  },
  carouselItemText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 6,
    textAlign: 'center',
    lineHeight: 11.77,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dropdown: {
    top: 100,
    position: 'absolute',
    backgroundColor: 'rgba(68, 68, 68, 1)',
    borderRadius: 5,
    width: 110,
    left: 5,
    zIndex: 9999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownOption: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    fontSize: 10,
    color: 'white',
  },
  horizontalLine: {
    width: '75%',
    height: 1,
    backgroundColor: 'gray',
  },
  modal: {
    margin: 0,
    width: '100%',
    height: '100%',
  },
});

export default DashboardScreen;
