import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/home-screens';

const Home = require('../../assets/icons/home-page.png');
const Search = require('../../assets/icons/search.png');
const Post = require('../../assets/icons/post.png');
const Message = require('../../assets/icons/chat.png');
const Dashboard = require('../../assets/icons/dashboard.png');

const Tab = createBottomTabNavigator();

const SearchScreen = () => <ScreenContent title="Search" />;
const PostScreen = () => <ScreenContent title="Post" />;
const MessageScreen = () => <ScreenContent title="Message" />;
const DashboardScreen = () => <ScreenContent title="Dashboard" />;

interface ScreenContentProps {
  title: string;
}

const ScreenContent = ({title}: ScreenContentProps) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{title}</Text>
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
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#fff' : '#209BCC',
              }}
              source={Home}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#fff' : '#209BCC',
              }}
              source={Search}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
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
          tabBarButton: props => (
            <CustomTabBarButton
              onPress={() => console.log('Something')}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#fff' : '#209BCC',
              }}
              source={Message}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#fff' : '#209BCC',
              }}
              source={Dashboard}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
