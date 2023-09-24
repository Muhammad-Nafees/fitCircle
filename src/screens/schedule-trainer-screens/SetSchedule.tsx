import React, {useState, useEffect} from 'react';
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
import {Calendar, DateData} from 'react-native-calendars';
import moment from 'moment';
import CustomButton from '../../components/shared-components/CustomButton';
import {format, startOfDay} from 'date-fns';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {verticalScale} from '../../utils/metrics';

const ArrowBackIcon = require('../../../assets/icons/arrow-back.png');

type TimeSlot = {
  date: string;
  option: string[];
};

type ScheduleTimeSlot = {
  slot: string;
  booked: boolean;
  _id: string;
};

type Schedule = {
  _id: string;
  user: string;
  date: string;
  timeSlots: ScheduleTimeSlot[];
  __v: number;
};

const SetSchedule = ({route, navigation}: any) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const [isDateFormatted, setIsDateFormatted] = useState(false);
  const [slotsDate, setSlotsDate] = useState<any>();
  const {selectedMonth} = route.params || {currentMonth};
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOptionsWDate, setSelectedOptionsWDate] = useState<TimeSlot[]>(
    [],
  );
  const today = format(new Date(), 'u-MM-dd');
  const userData = useSelector((state: RootState) => state.auth.user);
  const [selectedSlotDate, setSelectedSlotDate] = useState<any>();

  const handleDayPress = (day: DateData) => {
    setIsDateFormatted(false);
    const selected = day.dateString;
    console.log(selected, selectedDate, selectedSlotDate, 'daypress');

    if (selected === selectedDate) {
      setSelectedDate(undefined);
      return;
    }
    setSelectedDate(selected);
  };

  const formatDate = (date: string | Date) => {
    return moment(date).format('ddd, D MMM');
  };

  const formattedSelectedDate = selectedDate
    ? formatDate(selectedDate)
    : formatDate(new Date());

  const generateTimeSlots = (forNextDay = false) => {
    const currentTime = moment();
    if (forNextDay) {
      const startTime = moment().add(1, 'day').startOf('day');
      const endTime = moment(startTime).add(1, 'day');
      const timeSlots = [];
      while (startTime.isBefore(endTime)) {
        const formattedSlot = `${startTime.format('h:mmA')} - ${startTime
          .add(1, 'hour')
          .format('h:mmA')}`;
        timeSlots.push(formattedSlot);
      }
      return timeSlots;
    } else {
      const nextHourStart = moment().add(1, 'hour').startOf('hour');
      const endTime = moment().set({
        hour: 24,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
      const timeSlots = [];

      while (nextHourStart.isBefore(endTime)) {
        const startTime = nextHourStart.clone();
        const endTime = nextHourStart.add(1, 'hour');
        const formattedSlot = `${startTime.format('h:mmA')} - ${endTime.format(
          'h:mmA',
        )}`;
        timeSlots.push(formattedSlot);
      }

      return timeSlots;
    }
  };

  const options = generateTimeSlots();
  const nextDayOptions = generateTimeSlots(true);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const handleSelectOption = (option: string) => {
    const selectedDateArr = isDateFormatted ? '' : selectedDate?.split('-');
    const selectedSlotDate = new Date(route.params.date);

    const formattedDate = isDateFormatted
      ? format(selectedSlotDate, 'MM/dd/yyyy')
      : '';
    const date = isDateFormatted
      ? formattedDate
      : selectedDate
      ? `${selectedDateArr[1]}/${selectedDateArr[2]}/${selectedDateArr[0]}`
      : format(new Date(), 'MM/dd/u');
    console.log(date);
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }

    const availDateInd = selectedOptionsWDate?.findIndex(
      el => el.date === date,
    );

    if (availDateInd >= 0) {
      let temp = [...selectedOptionsWDate];
      const savedOptions = [...temp[availDateInd].option];

      if (savedOptions.find(i => i === option) === undefined) {
        temp[availDateInd]['option'] = [...savedOptions, option];
      } else {
        temp[availDateInd]['option'] = savedOptions.filter(op => op !== option);
      }

      setSelectedOptionsWDate(temp);

      return;
    }

    const obj = {
      date,
      option: [option],
    };

    setSelectedOptionsWDate([...selectedOptionsWDate, obj]);
  };

  const renderOptionItem = ({item}) => {
    if (route.params.date && isDateFormatted) {
      const parsedDate = new Date(route.params.date);
      const formattedDate = format(parsedDate, 'MM/dd/yyyy');
      setSlotsDate(formattedDate);
    } else {
      const selectedDateArr = selectedDate?.split('-');
      setSlotsDate(
        selectedDate
          ? `${selectedDateArr[1]}/${selectedDateArr[2]}/${selectedDateArr[0]}`
          : format(new Date(), 'MM/dd/u'),
      );
    }

    const selectedSlot = selectedOptionsWDate.find(
      el => el.date === slotsDate,
    )?.option;

    const isSelected = selectedSlot?.includes(item);
    return (
      <TouchableOpacity
        style={[styles.optionItem]}
        onPress={() => handleSelectOption(item)}>
        <Text style={styles.optionTime}>{item}</Text>
        <View style={styles.optionCheckboxContainer}>
          <View
            style={[
              styles.optionCheckbox,
              {
                backgroundColor: isSelected ? '#209BCC' : 'transparent',
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (route.params.date) {
      setSelectedDate(route.params.date);
      setIsDateFormatted(true);
      const parsedDate = new Date(route.params.date);
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');
      setSelectedSlotDate(formattedDate);
    } else {
      setIsDateFormatted(false);
    }
  }, []);
  console.log(selectedSlotDate);
  const currentttDate = startOfDay(new Date());
  const formattedCurrentDate = route.params.date
    ? format(route.params.date, 'yyyy-MM-dd')
    : format(currentttDate, 'yyyy-MM-dd');

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
              [today]: {
                selected: true,
                selectedColor: '#209BCC',
                selectedTextColor: '#FFF',
              },
              [selectedSlotDate && isDateFormatted
                ? selectedSlotDate
                : selectedDate]: {
                selected: true,
                selectedColor: '#209BCC',
                selectedTextColor: '#FFF',
              },
            }}
            onDayPress={handleDayPress}
            hideExtraDays={true}
            current={formattedCurrentDate}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bottomContainer}>
          <Text style={styles.selectedDateText}>{formattedSelectedDate}</Text>
          <FlatList
            data={
              formattedSelectedDate === formatDate(new Date())
                ? options
                : nextDayOptions
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderOptionItem}
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          isDisabled={selectedOptions.length === 0}
          extraStyles={{paddingHorizontal: 110}}
          onPress={() => console.log('Something')}>
          Set Schedule
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: '#292A2C',
    position: 'relative',
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
    backgroundColor: '#212223',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    marginTop: 8,
    width: '100%',
    paddingBottom: 100,
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
    bottom: verticalScale(30),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
});

export default SetSchedule;
