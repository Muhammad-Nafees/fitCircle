import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/home-screens';
import {AddPostScreen} from '../screens/home-screens/AddPostScreen';
import {SearchScreen} from '../screens/home-screens/SearchScreen';
import HomeStackNavigator from './HomeStackNavigator';
import {ProfileScreen} from '../screens/home-screens/ProfileScreen';
import SearchProfileScreen from '../screens/home-screens/SearchProfile';

const Home = require('../../assets/icons/home-page.png');
const Search = require('../../assets/icons/search.png');
const Post = require('../../assets/icons/post.png');
const Message = require('../../assets/icons/chat.png');
const Dashboard = require('../../assets/icons/dashboard.png');

const Tab = createBottomTabNavigator();
const MessageScreen = () => <ScreenContent title="Message" />;
const DashboardScreen = () => <ScreenContent title="Dashboard" />;

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
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? '#fff' : '#209BCC',
        }}
        source={icon}
      />
    </View>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#3EB6E6',
          height: 70,
        },
        tabBarLabelStyle: {
          color: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon focused={focused} icon={Home} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon focused={focused} icon={Search} />
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
            <CustomTabBarIcon focused={focused} icon={Message} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon focused={focused} icon={Dashboard} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="SearchProfile"
        component={SearchProfileScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
