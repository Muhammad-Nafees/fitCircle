import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';

const App = () => {
  return (
    <NavigationContainer >
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default App;
