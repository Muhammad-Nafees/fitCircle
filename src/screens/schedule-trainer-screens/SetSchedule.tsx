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
import {format, parse, parseISO, startOfDay} from 'date-fns';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {verticalScale} from '../../utils/metrics';
import Modal from 'react-native-modal';
import {
  CustomConfirmationModal,
  CustomOutputModal,
} from '../../components/shared-components/CustomModals';
import {
  generateSlots,
  getTrainerSlots,
  setSlots,
} from '../../api/dashboard-module';
import {generateTimeSlots} from '../../utils/helper';
import {STYLES} from '../../styles/globalStyles';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../components/shared-components/CustomLoader';

const ArrowBackIcon = require('../../../assets/icons/arrow-back.png');

type ITimeSlot = {
  _id: string;
  endTime: Date;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
};

const SetSchedule = ({navigation, route}: any) => {
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);
  const [selectedSlotDates, setSelectedSlotDates] = useState<string[]>([]);
  const today = format(new Date(), 'yyyy-MM-dd');
  const [currentDate, setCurrentDate] = useState<Date | string>(today);
  const [selectedDate, setSelectedDate] = useState<Date | string>(today);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [isDateFormatted, setIsDateFormatted] = useState(false);
  const [slotsDate, setSlotsDate] = useState<any>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOptionsWDate, setSelectedOptionsWDate] = useState<TimeSlot[]>(
    [],
  );
  const userData = useSelector((state: RootState) => state.auth.user);
  const [selectedSlotDate, setSelectedSlotDate] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentType, setPaymentType] = useState<'success' | 'failed'>(
    'success',
  );
  const [paymentModal, setPaymentModal] = useState(false);
  console.log(route.params);

  useEffect(() => {
    const date = route?.params?.date;
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setSelectedDate(formattedDate);
    }
  }, []);

  const handleDayPress = (day: DateData) => {
    const selected = day.dateString;
    if (moment(selected).isBefore(moment(today))) {
      Toast.show({
        type: 'error',
        text1: 'Please select future date!',
      });
      return;
    }

    if (selected === selectedDate) {
      setSelectedDate('');

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

  const handleSelectOption = (id: string) => {
    const isSelected = selectedSlotDates?.some((slot: any) => slot === id);
    if (isSelected) {
      const updatedSlots = selectedSlotDates?.filter(slot => slot !== id);
      setSelectedSlotDates(updatedSlots);
    } else {
      setSelectedSlotDates((prev: any) => [...prev, id]);
    }
  };

  const fetchTimeSlots = async () => {
    setIsListLoading(true);
    try {
      const response = await generateSlots();
      const slots = response?.data?.data;
      const filteredSlots = generateTimeSlots(currentDate !== selectedDate);
      const extractedData = filteredSlots.map(timeSlot => {
        const [start, end] = timeSlot.split(' - ');
        const slot = slots.find((slot: ITimeSlot) => {
          const slotStart = moment(slot.startTime, 'h:mm A');
          const slotEnd = moment(slot.endTime, 'h:mm A');
          return (
            slotStart.format('h:mmA') === start &&
            slotEnd.format('h:mmA') === end
          );
        });

        return slot;
      });
      setTimeSlots(extractedData);
      setIsListLoading(false);
    } catch (error: any) {
      console.log(error?.response, 'error from generate slots!');
      setIsListLoading(false);
    }
  };

  const fetchTrainerSlots = async () => {
    try {
      const response = await getTrainerSlots(selectedDate as string);
      const bookedSlots = response?.data?.data?.slots;
      const filterSlots = bookedSlots?.map((slot: ITimeSlot) => slot._id);
      if (filterSlots) {
        setSelectedSlotDates(filterSlots);
      } else {
        setSelectedSlotDates([]);
      }
    } catch (error: any) {
      console.log(error?.response?.data, 'error from trainer booled slots!');
    }
  };

  useEffect(() => {
    fetchTimeSlots();
    fetchTrainerSlots();
  }, [selectedDate]);

  const handleSetSchedule = async () => {
    setIsLoading(true);
    try {
      const reqData = {
        scheduleDate: selectedDate == null ? currentDate : selectedDate,
        slots: selectedSlotDates,
      };

      const response = await setSlots(reqData);
      Toast.show({
        type: 'success',
        text1: `${response?.data?.message}`,
      });
      navigation.navigate('Slot');
      setIsLoading(false);
    } catch (error: any) {
      console.log('error from setSchedule', error?.response);
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
      setIsLoading(false);
    }
  };

  const renderOptionItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[styles.optionItem]}
        onPress={() => handleSelectOption(item._id)}>
        <Text style={styles.optionTime}>
          {item?.startTime} - {item?.endTime}
        </Text>
        <View style={styles.optionCheckboxContainer}>
          <View
            style={[
              styles.optionCheckbox,
              {
                backgroundColor: selectedSlotDates?.includes(item._id)
                  ? '#209BCC'
                  : 'transparent',
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleButtonPress = () => {
    setIsModalVisible(true);
  };

  const handlePayment = (type: string) => {
    setIsModalVisible(false);
    setPaymentType(type);
    setPaymentModal(true);
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
              [selectedDate as any]: {
                selected: true,
                selectedColor: '#209BCC',
                selectedTextColor: '#FFF',
              },
            }}
            onDayPress={handleDayPress}
            hideExtraDays={true}
            // current={formattedCurrentDate}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.bottomContainer,
            timeSlots.length == 0
              ? {justifyContent: 'center', alignItems: 'center'}
              : undefined,
          ]}>
          {isListLoading ? (
            <CustomLoader extraStyles={{marginTop: 30}} />
          ) : timeSlots.length == 0 ? (
            <Text style={[STYLES.text16]}>No slots available for today!</Text>
          ) : (
            <>
              <Text style={styles.selectedDateText}>
                {formattedSelectedDate}
              </Text>

              <FlatList
                data={timeSlots}
                keyExtractor={(item, index) => item._id + index.toString()}
                renderItem={renderOptionItem}
                contentContainerStyle={styles.optionsContainer}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          extraStyles={{paddingHorizontal: 110}}
          onPress={handleButtonPress}>
          {route.params.hourlyRate
            ? 'Continue'
            : route.params.packageView
            ? 'Pay Via Wallet Card'
            : 'Set Schedule'}
        </CustomButton>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}>
        <CustomConfirmationModal
          modalHeading="Please Confirm"
          modalText={
            route.params.packageView
              ? `Are you sure you want to purchase this package for ${route.params.price} ?`
              : `Are you sure you want to schedule for ${route.params.price} ?`
          }
          onCancel={() => handlePayment('failed')}
          onConfirm={() => handlePayment('success')}
          confirmText="Yes"
          cancelText="No"
          cancelColor={'rgba(220, 77, 77, 1)'}
          confirmColor={'rgba(32, 128, 183, 1)'}
        />
      </Modal>
      <Modal
        isVisible={paymentModal}
        onBackButtonPress={() => setPaymentModal(false)}
        onBackdropPress={() => setPaymentModal(false)}
        style={styles.modal}>
        <CustomOutputModal
          type={paymentType}
          onPress={() => setPaymentModal(false)}
          modalText={
            paymentType === 'success'
              ? 'Payment Successful'
              : 'Payment Unsuccessful'
          }
        />
      </Modal>
      {!route.params.hourlyRate &&
        !route.params.packageView &&
        timeSlots.length > 0 && (
          <View style={styles.buttonContainer}>
            <CustomButton
              isDisabled={isLoading}
              extraStyles={{paddingHorizontal: 110}}
              onPress={handleSetSchedule}>
              {isLoading ? <CustomLoader /> : 'Set Schedule'}
            </CustomButton>
          </View>
        )}
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
    borderRadius: 30,
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
  modal: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});

export default SetSchedule;
