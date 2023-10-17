import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
import CustomLoader from '../../components/shared-components/CustomLoader';

const ArrowBackIcon = require('../../../assets/icons/arrow-back.png');

type ScheduleItem = {
  scheduleDate: string;
  slot: string;
  booked: boolean;
  bookedBy: string;
};

const SetSchedule = ({route, navigation}: any) => {
  const currentMonth = moment().format('YYYY-MM-DD');
  const today = format(new Date(), 'u-MM-dd');
  const [selectedDate, setSelectedDate] = useState<any>(today);
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDayPress = (day: DateData) => {
    const selected = day.dateString;

    if (selected === selectedDate) {
      setSelectedDate(today);
      setSlot(undefined);
      return;
    }
    console.log(selected, 'from daypress!');
    setSelectedDate(selected);
  };

  const formatDate = (date: any) => {
    return moment(date).format('ddd, D MMM');
  };

  const formattedSelectedDate = selectedDate
    ? formatDate(selectedDate)
    : formatDate(new Date());
  console.log(selectedDate, 'select');

  // api call

  const fetchUserBookings = async () => {
    setIsLoading(true);
    try {
      if (selectedDate) {
        const response = await getUserBookings(selectedDate);
        const data = response?.data?.data;
        setUserBookedSchedules(data?.bookings);
      }
    } catch (error: any) {
      console.log(error, 'From fetching user booking schedules!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserBookings();
  }, [selectedDate]);
  console.log(userBookedSchedules, 'boookkkkk');
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <ScrollView contentContainerStyle={{minHeight: 300}}>
        <View style={styles.bottomContainer}>
          <Text style={styles.selectedDateText}>{formattedSelectedDate}</Text>
          {isLoading ? (
            <CustomLoader />
          ) : !userBookedSchedules ? (
            <Text style={{color: 'white', paddingTop: 20}}>No Bookings!</Text>
          ) : (
            userBookedSchedules?.map((schedule: IUserBookings) => (
              <CustomScheduleTime
                key={schedule?._id}
                profileImage={schedule?.trainer?.profileImage}
                name={
                  schedule?.trainer?.firstName +
                  ' ' +
                  schedule?.trainer?.lastName
                }
                timeSlot={
                  schedule?.slot.startTime + ' - ' + schedule?.slot?.endTime
                }
                exercise="Back and Triceps"
                username={schedule?.trainer?.username}
              />
            ))
          )}
        </View>
      </ScrollView>
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
    gap: 20,
    backgroundColor: '#212223',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    marginTop: 8,
    width: '100%',
    paddingBottom: 20,
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
