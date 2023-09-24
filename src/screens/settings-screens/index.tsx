import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ArrowForward from '../../../assets/icons/ArrowForward';
import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import LogoutButton from '../../components/settings-components/LogoutButton';
import Toggle from 'react-native-toggle-element';
import {settingsData} from '../../../data/settingsData';

export const SettingsOne = ({navigation}: any) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const onToggle = () => {
    setIsEnabled(!isEnabled);
  };

  const withNavigationAction = (routeName: any) => {
    return () => {
      navigation.navigate(routeName);
    };
  };
  const SettingItem = ({icon, text, onPress}: any) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        text === 'Notifications' && {marginBottom: 40},
      ]}
      onPress={onPress}>
      <View style={styles.settingIconContainer}>{icon}</View>
      <Text style={styles.settingText}>{text}</Text>
      {text === 'Notifications' ? (
        <Toggle
          value={isEnabled}
          onPress={onToggle}
          thumbButton={{
            width: 20,
            height: 20,
            radius: 30,
            activeBackgroundColor: '#209BCC',
            inActiveBackgroundColor: '#C2C5CE',
          }}
          trackBar={{
            activeBackgroundColor: 'rgba(32, 155, 204, 1)',
            inActiveBackgroundColor: 'rgba(235, 236, 239, 1)',
            borderActiveColor: 'rgba(32, 155, 204, 1)',
            borderInActiveColor: 'rgba(235, 236, 239, 1)',
            width: 47,
            height: 15,
          }}
        />
      ) : (
        <ArrowForward width="15" height="15" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Settings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            <CustomProfileAvatar username={'Sameer'} size={60} />
            <View>
              <Text style={{fontSize: 20, color: 'white', fontWeight: '700'}}>
                Lincoln Smith
              </Text>
              <Text style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                lincolnsmith@gmail.com
              </Text>
            </View>
          </View>
          {settingsData.map(item => (
            <SettingItem
              icon={item.icon}
              text={item.text}
              key={item.id}
              onPress={withNavigationAction(item.routeName)}
            />
          ))}
        </View>
        <LogoutButton />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  editProfile: {
    fontWeight: '500',
    fontSize: 12.8,
    color: '#209BCC',
    textDecorationLine: 'underline',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contentContainer: {
    paddingHorizontal: 28,
    marginVertical: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  settingIconContainer: {
    backgroundColor: '#209BCC',
    borderRadius: 48,
    height: 36,
    width: 36,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
});
