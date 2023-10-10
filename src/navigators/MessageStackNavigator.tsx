import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {MessagesOne} from '../screens/message-screens';
import {ChatDetails} from '../screens/message-screens/ChatDetails';
import {VoiceCall} from '../screens/message-screens/VoiceCall';
import {VideoCall} from '../screens/message-screens/VideoCall';
import Rating from '../screens/message-screens/Rating';

const Stack = createStackNavigator();
const MessageStackNavigator = () => {
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
    </Stack.Navigator>
  );
};

export default MessageStackNavigator;
// import React from 'react';
// import {Text, View} from 'react-native';
// import {STYLES} from 'styles/globalStyles';

// const MessageStackNavigator = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: '#292A2C',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text style={{color: 'white'}}>Messages Coming Soon.</Text>
//     </View>
//   );
// };

// export default MessageStackNavigator;
