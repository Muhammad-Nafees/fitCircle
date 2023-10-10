import {NavigationContainer} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import StackNavigator from './src/navigators/StackNavigator';

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
