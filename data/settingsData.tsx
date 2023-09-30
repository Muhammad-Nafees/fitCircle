import {Image} from 'react-native';
import ProfileSvgIcon from '../assets/icons/ProfileIcon';
import SettingsBlocklistIcon from '../assets/icons/SettingsBlocklist';
import SettingsFaqIcon from '../assets/icons/SettingsFaq';
import SettingsFileIcon from '../assets/icons/SettingsFileIcon';
import SettingsNotificationIcon from '../assets/icons/SettingsNotification';
import SettingsPayment from '../assets/icons/SettingsPayment';
import SettingsSubscriptionIcon from '../assets/icons/SettingsSubscription';
import SettingsTransactionIcon from '../assets/icons/SettingsTransaction';
import {ProfileSettingsIcon} from '../assets/icons/profilesettings';
const DeleteIcon = require('../assets/icons/cancel.png');

export const settingsData = [
  {id: '1', icon: <SettingsPayment />, text: 'Payment', routeName: 'Payment'},
  {
    id: '2',
    icon: <SettingsNotificationIcon />,
    text: 'Notifications',
    routeName: 'Notification',
  },
  {id: '3', icon: <ProfileSvgIcon color={'white'} />, text: 'Support'},
  {id: '4', icon: <SettingsFaqIcon />, text: 'FAQ', routeName: 'Faq'},
  {
    id: '5',
    icon: <SettingsFileIcon />,
    text: 'Terms and Conditions',
    routeName: 'TermsConditions',
  },
  {
    id: '6',
    icon: <SettingsFileIcon />,
    text: 'Privacy Policy',
    routeName: 'PrivacyPolicy',
  },
  {
    id: '7',
    icon: <SettingsSubscriptionIcon />,
    text: 'Subscriptions',
    routeName: 'Subscription',
  },
  {
    id: '8',
    icon: <ProfileSettingsIcon />,
    text: 'Privacy Settings',
    routeName: 'PrivacySettings',
  },
  {
    id: '9',
    icon: <SettingsBlocklistIcon />,
    text: 'Blocklist',
    routeName: 'Blocklist',
  },
  {
    id: '10',
    icon: <SettingsTransactionIcon />,
    text: 'Transaction History',
    routeName: 'SettingsTransaction',
  },
  {
    id: '11',
    icon: (
      <Image
        source={DeleteIcon}
        style={{width: 15, height: 15, tintColor: 'white'}}
      />
    ),
    text: 'Delete Account',
  },
];
