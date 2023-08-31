import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import CustomButton from '../../components/shared-components/CustomButton';

const ArrowBackIcon = require('../../../assets/icons/arrow-back.png');

const SetSchedule = ({route, navigation}: any) => {
  const {selectedMonth} = route.params;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const customDatesStyles = {};
  customDatesStyles[selectedMonth] = {textStyle: {color: '#fff'}};

  const saturdayAndSundayStyle = {
    textStyle: {color: 'red'},
    containerStyle: {backgroundColor: 'transparent'},
  };
  for (let i = 0; i < 31; i++) {
    const currentDate = new Date(selectedMonth);
    currentDate.setDate(i + 1);
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      customDatesStyles[currentDate] = saturdayAndSundayStyle;
    }
  }

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const formatDate = date => {
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

  const handleSelectOption = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const renderOptionItem = ({item}) => {
    const isSelected = selectedOptions.includes(item);
    return (
      <TouchableOpacity
        style={[styles.optionItem, isSelected && styles.selectedOption]}
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

  return (
    <View style={styles.container}>
      <View style={{flex: 1, paddingHorizontal: 10, paddingBottom: 10}}>
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
            markedDates={customDatesStyles}
            onDayPress={handleDayPress}
            hideExtraDays={true}
          />
        </View>
      </View>
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
        <View style={styles.buttonContainer}>
          <CustomButton
            isDisabled={selectedOptions.length === 0}
            extraStyles={{paddingHorizontal: 110}}>
            Set Schedule
          </CustomButton>
        </View>
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
    flex: 1,
    backgroundColor: '#212223',
    borderRadius: 15,
    padding: 10,
  },
  bottomContainer: {
    flex: 0.8,
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
