import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Toggle from 'react-native-toggle-element';
import Clipboard from '@react-native-clipboard/clipboard';
//----------------------------------------------------------------------------------------//
import ArrowForward from '../../../assets/icons/ArrowForward';
import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import LogoutButton from '../../components/settings-components/LogoutButton';
import {settingsData} from '../../../data/settingsData';
import CustomHeader from '../../components/shared-components/CustomHeader';
import {verticalScale} from '../../utils/metrics';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const SettingsOne = ({navigation}: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [textInputValue, setTextInputValue] = useState('');

  const onToggle = () => {
    setIsEnabled(!isEnabled);
  };

  const handleTextInputChange = (text: string) => {
    setTextInputValue(text);
    console.log(textInputValue);
  };

  const handleCopyText = () => {
    try {
      Clipboard.setString(textInputValue);
    } catch (error) {
      console.error('Error copying text: ', error);
    }
  };

  const withNavigationAction = (routeName: any) => {
    return () => {
      if (routeName) {
        navigation.navigate(routeName);
      } else {
      }
    };
  };
  const SettingItem = ({icon, text, onPress}: any) => (
    <TouchableOpacity
      style={[styles.settingItem, text === 'Support' && {marginBottom: 40}]}
      onPress={onPress}>
      <View
        style={[
          styles.settingIconContainer,
          text === 'Privacy Settings' && {padding: 0},
        ]}>
        {icon}
      </View>
      <Text style={styles.settingText}>
        {text === 'Payment' && userRole !== 'user' ? 'Payment & Wallet' : text}
      </Text>
      {text === 'Notifications' ? (
        <Toggle
          value={isEnabled}
          onPress={onToggle}
          thumbButton={{
            width: 21,
            height: 21,
            radius: 30,
            activeBackgroundColor: '#209BCC',
            inActiveBackgroundColor: '#C2C5CE',
          }}
          trackBar={{
            activeBackgroundColor: 'rgba(32, 155, 204, 1)',
            inActiveBackgroundColor: 'rgba(235, 236, 239, 1)',
            borderActiveColor: 'rgba(32, 155, 204, 1)',
            borderInActiveColor: 'rgba(235, 236, 239, 1)',
            width: 45,
            height: 15,
          }}
        />
      ) : (
        <ArrowForward widthAndHeight={18} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{height: verticalScale(85)}}>
        <CustomHeader onPress={() => navigation.navigate('Profile')} />
      </View>
      <ScrollView>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Settings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            <CustomProfileAvatar username={'Lincoln'} size={60} />
            <View>
              <Text style={{fontSize: 20, color: 'white', fontWeight: '700'}}>
                Lincoln Smith
              </Text>
              <Text style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                lincolnsmith@gmail.com
              </Text>
            </View>
          </View>
          {userRole !== 'user' && (
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="https://link.fitcircle.com..."
                placeholderTextColor="gray"
                value={textInputValue}
                onChangeText={handleTextInputChange}
              />
              <TouchableOpacity
                onPress={() => handleCopyText()}
                style={styles.buttonContainer}>
                <Text style={styles.copyButton}>Copy</Text>
              </TouchableOpacity>
            </View>
          )}
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
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(222, 222, 222, 1)',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 16,
    marginBottom: 10,
    height: 50,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: 'black',
  },
  copyButton: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(32, 155, 204, 1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default SettingsOne;
