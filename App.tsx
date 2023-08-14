import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <AuthStackNavigator />
        <Toast />
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
