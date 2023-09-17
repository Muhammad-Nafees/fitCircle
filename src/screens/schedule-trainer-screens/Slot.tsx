import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  BackHandler,
  ScrollView,
} from 'react-native';
import ArrowForward from '../../../assets/icons/ArrowForward';
import axiosInstance from '../../api/interceptor';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {format, parse} from 'date-fns';
import {enUS} from 'date-fns/locale';
import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

const ArrowBackIcon = require('../../../assets/icons/arrow-back.png');

export const Slot = ({navigation}: any) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const getCurrentMonth = () => {
    const currentMonthIndex = new Date().getMonth();
    return months[currentMonthIndex];
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [trainerSchedules, setTrainerSchedules] = useState([]);

  const userData = useSelector((state: RootState) => state.auth.user);
  const authorizationToken = useSelector(
    (state: RootState) => state.auth.authorizationToken,
  );
  const route = useRoute();
  const focus = useIsFocused();

  const getTrainerSchedule = async () => {
    try {
      const response = await axiosInstance.get(`schedules/${userData?._id}`);
      console.log(response.data, 'data');

      // if (response.status === 200) {
      //   setTrainerSchedules(response.data);
      //   console.log(response.data, 'Data');
      // }

      if (response.status === 200) {
        const currentDate = new Date(); // Get current date
        console.log(response.data, 'ddd');
        const formattedCurrentDate = format(currentDate, 'MM/dd/yyyy');

        const filteredData = response.data.filter((item: any) => {
          const dateParts = item.date.split('/');
          const year = parseInt(dateParts[2], 10);
          const month = parseInt(dateParts[0], 10) - 1; // Month is 0-indexed
          const day = parseInt(dateParts[1], 10);
          const date = new Date(year, month, day);

          if (
            date >= currentDate ||
            date.toISOString().split('T')[0] ===
              currentDate.toISOString().split('T')[0]
          ) {
            return true;
          } else {
            console.log(`Excluded: ${item.date}`);
            return false;
          }
        });

        filteredData.sort((a: any, b: any) => {
          const dateA = parse(a.date, 'MM/dd/yyyy', new Date());
          const dateB = parse(b.date, 'MM/dd/yyyy', new Date());
          console.log(a.date, 'from filter data');
          return dateA.getTime() - dateB.getTime();
        });

        // Find today's date
        const todayIndex = filteredData.findIndex((item: any) => {
          console.log(item.date);
          return item.date === formattedCurrentDate;
        });

        if (todayIndex > -1) {
          const todayData = filteredData.splice(todayIndex, 1);
          console.log(todayData, 'todayDa');
          console.log(todayData, 'today');
          filteredData.unshift(todayData[0]);
        }

        setTrainerSchedules(filteredData as any);
        console.log(filteredData, 'Filtered and Sorted Data');
      }
    } catch (error: any) {
      console.log('🚀 ~ getTrainerSlots ~ error:', error.response.data);
    }
  };

  useEffect(() => {
    if (focus == true) {
      getTrainerSchedule();
    }
  }, [focus]);

  const renderCarouselItem = ({item}) => {
    const inputDateString = item?.date;
    const parsedDate = parse(inputDateString, 'MM/dd/yyyy', new Date());
    const month = format(parsedDate, 'MMM', {locale: enUS});
    const date = format(parsedDate, 'dd', {locale: enUS});
    const day = format(parsedDate, 'EEE', {locale: enUS});

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SetSchedule', {date: parsedDate})}
        style={styles.carouselItem}>
        <Text style={styles.carouselItemText1}>{day}</Text>
        <View style={styles.dateMonthRow}>
          <Text style={styles.carouselItemText}>{date} </Text>
          <Text style={styles.carouselItemText}>{month}</Text>
        </View>
        <Text style={styles.carouselItemText1}>
          {item?.timeSlots?.length} Slots
        </Text>
      </TouchableOpacity>
    );
  };

  const handleNavigation = () => {
    if (route.params?.isAddPost === true) {
      navigation.navigate('DashboardScreen', {screen: 'Post'});
      return true;
    } else {
      navigation.navigate('DashboardScreen', {screen: 'Dashboard'});
      return true;
    }
  };

  useEffect(() => {
    const backAction = () => {
      handleNavigation();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleNavigation}>
          <Image source={ArrowBackIcon} style={styles.arrowBack} />
        </TouchableOpacity>
        <Text style={styles.heading}>Schedule</Text>
      </View>
      <TouchableOpacity
        style={styles.calenderButton}
        onPress={() => navigation.navigate('SetSchedule', {selectedMonth})}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{selectedMonth}</Text>
          <ArrowForward />
        </View>
      </TouchableOpacity>
      <ScrollView>
        <FlatList
          data={trainerSchedules}
          renderItem={renderCarouselItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.carouselContainer}
          numColumns={3}
        />
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
