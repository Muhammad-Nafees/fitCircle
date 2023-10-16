import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';
import {DateData, MarkedDates} from 'react-native-calendars/src/types';
// ----------------------------------------------------------------------------------------------//
import {CustomScheduleTime} from '../../components/dashboard-components/CustomScheduleTime';
import {RootState} from '../../redux/store';
import {getUserBookings} from '../../api/dashboard-module';
import {IUserBookings} from '../../interfaces/schedule.interface';

const ArrowBackIcon = require('../../../assets/icons/arrow-back.png');

type ScheduleItem = {
  scheduleDate: string;
  slot: string;
  booked: boolean;
  bookedBy: string;
};

const SetSchedule = ({route, navigation}: any) => {
  const currentMonth = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<any>();
  const [profileImageUrl, setProfileImageUrl] = useState();
  const today = format(new Date(), 'u-MM-dd');
  const [customDatesStyles, setCustomDatesStyles] = useState<
    MarkedDates | undefined
  >({
    [today]: {
      selected: true,
      selectedColor: '#209BCC',
      selectedTextColor: '#FFF',
    },
    [selectedDate]: {
      selected: true,
      selectedColor: '#209BCC',
      selectedTextColor: '#FFF',
    },
  });
  const userData = useSelector((state: RootState) => state.auth.user);
  const [userBookedSchedules, setUserBookedSchedules] = useState<
    IUserBookings[]
  >([]);
  const [slot, setSlot] = useState<ScheduleItem | undefined>();

  const handleDayPress = (day: DateData) => {
    const selected = day.dateString;

    if (selected === selectedDate) {
      setSelectedDate(undefined);
      setSlot(undefined);
      return;
    }

    // const availableSlot = schedule.find(
    //   ({scheduleDate}) => scheduleDate === selected,
    // );
    // setSlot(availableSlot);
    setSelectedDate(selected);
  };

  const formatDate = (date: any) => {
    return moment(date).format('ddd, D MMM');
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Dashboard');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const formattedSelectedDate = selectedDate
    ? formatDate(selectedDate)
    : formatDate(new Date());

  // api call

  const fetchUserBookings = async () => {
    try {
      const response = await getUserBookings('2023-10-16');
      const data = response?.data;
      console.log(data, 'From fetching user booking schedules!');
    } catch (error: any) {
      console.log(
        error?.response?.data,
        'From fetching user booking schedules!',
      );
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Image source={ArrowBackIcon} style={styles.arrowBack} />
        </TouchableOpacity>
        <Text style={styles.heading}>My Schedule</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            theme={{
              backgroundColor: '#212223',
              calendarBackground: '#212223',
              arrowColor: '#fff',
              textDayFontWeight: '400',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              selectedDayBackgroundColor: '#fff',
              selectedDayTextColor: '#209BBC',
              textDisabledColor: '#666',
              dayTextColor: '#fff',
              monthTextColor: '#fff',
            }}
            markingType="custom"
            // markedDates={customDatesStyles}
            markedDates={{
              ...customDatesStyles,
              [selectedDate]: {
                selected: true,
                selectedColor: '#209BCC',
                selectedTextColor: '#FFF',
              },
            }}
            onDayPress={handleDayPress}
            hideExtraDays={true}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.selectedDateText}>{formattedSelectedDate}</Text>

        {slot ? (
          <CustomScheduleTime
            profileImageUrl={profileImageUrl}
            name={userData?.firstName + ' ' + userData?.lastName}
            timeSlot={slot?.slot}
            exercise="None"
            username="Sam"
          />
        ) : (
          <Text style={{color: 'white'}}>Coming Soon!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: '#292A2C',
  },
  arrowBack: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
  calendarContainer: {
    backgroundColor: '#212223',
    borderRadius: 15,
    padding: 10,
    paddingBottom: 25,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#212223',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    marginTop: 8,
    width: '100%',
  },
  selectedDateText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: '600',
  },
  optionsContainer: {
    paddingHorizontal: 0,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  optionTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  optionCheckboxContainer: {
    alignItems: 'flex-end',
  },
  optionCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#209BCC',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default SetSchedule;
