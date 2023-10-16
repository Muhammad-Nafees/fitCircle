import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler,
  ScrollView,
} from 'react-native';
import {format, parse} from 'date-fns';
import {enUS} from 'date-fns/locale';
// ----------------------------------------------------------------------//
import ArrowForward from '../../../assets/icons/ArrowForward';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import TrainerHourlyRate from '../../components/buypackage-components/TrainerHourlyRate';
import {CustomTrainerPackage} from '../../components/profile-components/CustomTrainerPackage';
import {
  getTrainerSlotList,
  getTrainerSlotsByMonthForUser,
} from '../../api/dashboard-module';
import {useFocusEffect} from '@react-navigation/native';
import {getCurrentMonth, months} from '../../utils/helper';
import {STYLES} from '../../styles/globalStyles';
const ArrowBackIcon = require('../../../assets/icons/arrow-back.png');

export const Slot = ({navigation, route}: any) => {
  const hourlyRate = route?.params?.hourlyRate || false;
  const packageView = route?.params?.packageView || false;
  const trainerId = route?.params?.userData?._id;

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [trainerSchedules, setTrainerSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData = route?.params?.userData;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('DashboardScreen', {screen: 'Dashboard'});
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  // trainer pov

  const fetchTrainerSlotsByMonth = async () => {
    try {
      const response = await getTrainerSlotList(currentMonth + 1, currentYear);
      const data = response?.data?.data;

      const filterData = data?.filter((slot: any) => {
        currentDate.setHours(0, 0, 0, 0);
        const scheduleDate = new Date(slot._id);
        return scheduleDate >= currentDate;
      });

      const sortedData = filterData?.sort((a: any, b: any) => {
        return new Date(a._id).getTime() - new Date(b._id).getTime();
      });

      setTrainerSchedules(sortedData);
    } catch (error: any) {
      console.log(
        error?.response?.data,
        'from fetching trainer slots by monnths!',
      );
    }
  };

  // user pov
  const fetchTrainerSlotsByMonthForUser = async () => {
    try {
      const response = await getTrainerSlotsByMonthForUser(
        currentMonth + 1,
        currentYear,
        trainerId,
      );
      
      const data = response?.data?.data;

      const filterData = data.filter((slot: any) => {
        currentDate.setHours(0, 0, 0, 0);
        const scheduleDate = new Date(slot.scheduleDate);
        return scheduleDate >= currentDate;
      });

      const sortedData = filterData?.sort((a: any, b: any) => {
        return (
          new Date(a.scheduleDate).getTime() -
          new Date(b.scheduleDate).getTime()
        );
      });

      setTrainerSchedules(sortedData);
    } catch (error: any) {
      console.log(
        error?.response?.data,
        'from fetching trainer slots for user by months!',
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userData) {
        fetchTrainerSlotsByMonthForUser();
      } else {
        fetchTrainerSlotsByMonth();
      }
    }, []),
  );

  const renderCarouselItem = ({item}: any) => {
    let inputDateString;
    // checking if user or trainer
    // if cond for user and else for trainer
    if (userData) {
      inputDateString = item?.scheduleDate;
    } else {
      inputDateString = item?._id;
    }
    const parsedDate = parse(
      inputDateString,
      "yyyy-MM-dd'T'HH:mm:ss.SSSX",
      new Date(),
    );
    const month = format(parsedDate, 'MMM', {locale: enUS});
    const date = format(parsedDate, 'dd', {locale: enUS});
    const day = format(parsedDate, 'EEE', {locale: enUS});
    if (item?.count === 0 || item?.availableSlots === 0) {
      return;
    }

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SetSchedule', {
            date: parsedDate,
            userData: userData,
          })
        }
        style={styles.carouselItem}>
        <Text style={styles.carouselItemText1}>{day}</Text>
        <View style={styles.dateMonthRow}>
          <Text style={styles.carouselItemText}>{date} </Text>
          <Text style={styles.carouselItemText}>{month}</Text>
        </View>
        <Text style={styles.carouselItemText1}>
          {item?.count ? item.count : item?.availableSlots} Slots
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DashboardScreen', {screen: 'Dashboard'})
          }>
          <Image source={ArrowBackIcon} style={styles.arrowBack} />
        </TouchableOpacity>
        <Text style={styles.heading}>Schedule</Text>
      </View>
      {hourlyRate !== false && <TrainerHourlyRate trainerData={userData} />}
      {packageView && <CustomTrainerPackage hidePackageButton={true} />}
      <TouchableOpacity
        style={styles.calenderButton}
        onPress={() =>
          navigation.navigate('SetSchedule', {
            selectedMonth,
            hourlyRate,
            packageView,
          })
        }>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{selectedMonth}</Text>
          <ArrowForward />
        </View>
      </TouchableOpacity>
      <ScrollView>
        {trainerSchedules?.length == 0 ||
        trainerSchedules?.length == undefined ? (
          <Text style={[STYLES.text16, {marginTop: 20}]}>
            No schedules yet!
          </Text>
        ) : (
          <FlatList
            data={trainerSchedules}
            renderItem={renderCarouselItem as any}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.carouselContainer}
            numColumns={3}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: '#292A2C',
  },
  arrowBack: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 25,
  },
  calenderButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
  },
  buttonText: {
    color: '#fff',
    marginRight: 8,
  },
  carouselContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  dateMonthRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carouselItem: {
    backgroundColor: '#209BCC',
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(108),
    height: verticalScale(93),
    marginVertical: 5,
    marginHorizontal: 2.5,
    borderRadius: 10,
  },
  carouselItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 6,
    textTransform: 'uppercase',
  },
  carouselItemText1: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
});
