import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, Keyboard} from 'react-native';
import {TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/home-screens';
import {SearchScreen} from '../screens/home-screens/SearchScreen';
import HomeStackNavigator from './HomeStackNavigator';
import FavoriteDialogScreen from '../screens/home-screens/FavoriteDialogScreen';
import CommentsScreen from '../screens/home-screens/CommentScreen';
import HomeSvgIcon from '../../assets/icons/HomeSvgIcon';
import SearchSvgIcon from '../../assets/icons/SearchSvgIcon';
import MessageSvgIcon from '../../assets/icons/MessageSvgIcon';
import DashboardSvgIcon from '../../assets/icons/DashboardSvgIcon';


const Post = require('../../assets/icons/post.png');
const Wave = require('../../assets/wave.png');

const Tab = createBottomTabNavigator();
const MessageScreen = () => <ScreenContent title="Message" />;
const DashboardScreen = () => <ScreenContent title="Message" />;

interface ScreenContentProps {
  title: string;
}

const ScreenContent = ({title}: ScreenContentProps) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#292a2c',
    }}>
    <Text style={{color: '#fff'}}>{title} Screen Coming Soon!</Text>
  </View>
);

const CustomTabBarButton = ({children, onPress}: any) => (
  <TouchableOpacity
    style={{
      top: -32,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 39,
        backgroundColor: '#209BCC',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const CustomTabBarIcon = ({focused, icon}: any) => {
  const iconColor = focused ? '#fff' : '#209BCC';
  return (
    <View>
      {focused && (
        <View
          style={{
            position: 'relative',
            top: -15,
            left: 0,
            right: 0,
            zIndex: -1,
            marginBottom: -12,
          }}>
          <Image
            source={Wave}
            style={{width: 100, height: 13, tintColor: '#3EB6E6'}}
          />
        </View>
      )}
      <View style={{marginHorizontal: 25}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: focused ? 'rgba(168, 213, 229, 0.35)' : null,
            borderRadius: focused ? 30 : null,
            padding: focused ? 12 : null,
          }}>
          {icon === 'Home' ? (
            <HomeSvgIcon color={iconColor} />
          ) : icon === 'Search' ? (
            <SearchSvgIcon color={iconColor} />
          ) : icon === 'Message' ? (
            <MessageSvgIcon color={iconColor} widthAndHeight={24} />
          ) : (
            <DashboardSvgIcon color={iconColor} />
          )}
        </View>
      </View>
    </View>
  );
};

const HomeTabNavigator = () => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const tabBarStyle = {
    backgroundColor: '#3EB6E6',
    height: 70,
    paddingTop: isKeyboardVisible ? 40 : 0,
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle,
        tabBarLabelStyle: {
          color: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <CustomTabBarIcon focused={focused} icon="Home" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <CustomTabBarIcon focused={focused} icon="Search" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor: '#fff',
                marginTop: 12,
              }}
              source={Post}
            />
          ),
          tabBarStyle: {display: 'none'},
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <CustomTabBarIcon focused={focused} icon="Message" />
            </View>
          ),
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <CustomTabBarIcon focused={focused} icon="Dashboard" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteDialog"
        component={FavoriteDialogScreen}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
