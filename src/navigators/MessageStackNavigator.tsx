import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {MessagesOne} from '../screens/message-screens';
import {ChatDetails} from '../screens/message-screens/ChatDetails';
import {VoiceCall} from '../screens/message-screens/VoiceCall';
import {VideoCall} from '../screens/message-screens/VideoCall';
import Rating from '../screens/message-screens/Rating';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import HomeTabNavigator from './HomeTabNavigator';

const Stack = createStackNavigator();
const MessageStackNavigator = () => {
  const navigation = useNavigation();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const onBlurUnsubscribe = navigation.addListener('blur', () => {
      setIsMounted(false);
    });

    return onBlurUnsubscribe;
  }, [navigation]);

  if (!isMounted) {
    return null;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        title: '',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="MessagesOne">
      <Stack.Screen name="MessagesOne" component={MessagesOne} />
      <Stack.Screen name="ChatDetails" component={ChatDetails} />
      <Stack.Screen name="VoiceCall" component={VoiceCall} />
      <Stack.Screen name="VideoCall" component={VideoCall} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="HomeTabNav" component={HomeTabNavigator} />
    </Stack.Navigator>
  );
};

export default MessageStackNavigator;
