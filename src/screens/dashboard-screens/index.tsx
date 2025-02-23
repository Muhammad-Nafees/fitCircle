import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
// -------------------------------------------------------------------------------------//
import {RootState} from '../../redux/store';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import ScheduleDashboardIcon from '../../../assets/icons/ScheduleDashboardIcon';
import WalletDashboardIcon from '../../../assets/icons/WalletDashboard';
import PackagesMealIcon from '../../../assets/icons/PackagesMealIcon';
import {
  CustomTransaction,
  CustomSchedule,
} from '../../components/dashboard-components/CustomTransactionSchedule';
import {ScheduleContainer} from '../../components/dashboard-components/ScheduleContainer';
import {TransactionModal} from '../../components/dashboard-components/TransactionModal';
import {HeaderContainer} from '../../components/dashboard-components/HeaderContainer';
import {userBasedItems} from '../../components/dashboard-components/UserBasedItems';
import {DashboardCarouselItem} from '../../components/dashboard-components/DashboardCarouselItem';

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
      if (routeName === 'Wallet') {
        navigation.navigate('Settings', {screen: 'Payment'});
      } else {
        navigation.navigate(routeName);
      }
    };
  };

  const roleBasedItems =
    userData?.role !== 'user'
      ? [
          {
            text: userData.role === 'nutritionist' ? 'Meal Plan' : 'Packages',
            icon: <PackagesMealIcon />,
            routeName:
              userData.role === 'nutritionist'
                ? 'MealPlanScreen'
                : 'PackagesScreen',
          },
          {
            text: 'Wallet',
            icon: <WalletDashboardIcon />,
            routeName: 'Wallet',
          },
          {
            text: 'Schedule',
            icon: <ScheduleDashboardIcon />,
            routeName: 'ScheduleScreen',
          },
        ]
      : userBasedItems;

  if (userData.role === 'nutritionist') {
    roleBasedItems.pop();
  }

  const renderItem = ({item}: any) => {
    return (
      <DashboardCarouselItem
        isDropdownVisible={isDropdownVisible}
        item={item}
        onPress={item.routeName && withNavigationAction(item.routeName)}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.topContainer]}>
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
          }}>
          <FlatList
            horizontal
            data={roleBasedItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingRight: horizontalScale(35),
            }}
          />
        </View>
      </View>
      <View style={[styles.bottomContainer, isTrainerAvailable && {flex: 1}]}>
        <Text style={styles.transactionText}>Last Transaction</Text>
        {userData.role === 'trainer' ? (
          // <Text
          //   style={[
          //     styles.transactionText,
          //     {fontSize: 14, paddingVertical: 0, opacity: 0.8},
          //   ]}>
          //   Coming soon
          // </Text>
          // <CustomSchedule />
          <CustomTransaction
            profileImageUrl={profileImageUrl}
            username="Sam"
            name="Sameer Ather"
            date={'May 4, 2023'}
            extraAmountStyles={{color: 'rgba(48, 210, 152, 1)'}}
            amount="+ $50.00"
            listText="Subscription"
          />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('TransactionScreen')}>
            <CustomTransaction
              profileImageUrl={profileImageUrl}
              username="Sam"
              name="Sameer Ather"
              date={'May 4'}
              amount="- $50.00"
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
        <TransactionModal closeModal={closeModal} />
      </Modal>
    </ScrollView>
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
    height: verticalScale(400),
    marginTop: -verticalScale(20),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: -1,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modal: {
    margin: 0,
    width: '100%',
    height: '100%',
  },
  dropdown: {
    top: '90%', // Position it just below the carousel item
    position: 'absolute', // Set absolute positioning
    backgroundColor: 'rgba(68, 68, 68, 1)',
    borderRadius: 5,
    width: horizontalScale(106),
    zIndex: 9999999, // Ensure the dropdown has a high zIndex
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
});

export default DashboardScreen;
