import CustomToggleButton from '../../components/settings-components/CustomToggleButton';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {useState} from 'react';

export const NotificationScreen = () => {
  const [IsDeliverNotifications, setIsDeliverNotifications] =
    useState<boolean>(false);
  const [IsSystemNotifications, setIsSystemNotifications] =
    useState<boolean>(false);
  const [IsAppNotifications, setIsAppNotifications] = useState<boolean>(false);
  const [IsEnableVibration, setIsEnableVibration] = useState<boolean>(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Notifications</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.text}>
            Control your notifications depending on your preferences.
          </Text>
          <Text style={styles.text}>
            If you disable this notification, you will not get notify when
            someone messages you.
          </Text>
        </View>
        <View style={styles.toggleButtonContainer}>
          <CustomToggleButton
            text={'Deliver Notifications'}
            isEnabled={IsDeliverNotifications}
            setIsEnabled={setIsDeliverNotifications}
          />
          <CustomToggleButton
            text={'System Notifications'}
            isEnabled={IsSystemNotifications}
            setIsEnabled={setIsSystemNotifications}
          />
          <CustomToggleButton
            text={'In-App Notifications'}
            isEnabled={IsAppNotifications}
            setIsEnabled={setIsAppNotifications}
          />
          <CustomToggleButton
            text={'Enable App Vibrations'}
            disableHorizontalLine={true}
            text2={'Vibrations'}
            isEnabled={IsEnableVibration}
            setIsEnabled={setIsEnableVibration}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: horizontalScale(16),
  },
  headingContainer: {
    marginHorizontal: 0,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  contentContainer: {
    marginHorizontal: horizontalScale(10),
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
    paddingTop: verticalScale(30),
  },
  toggleButtonContainer: {
    marginTop: verticalScale(45),
  },
});
