import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomDialog from '../../components/shared-components/CustomDialog';

const PaymentScreen = ({route, navigation}: any) => {
  const {lockedMoney} = route.params;

  const handleUnlockVideo = () => {
    navigation.goBack();
  };

  const handleCloseDialog = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomDialog
        name={`Unlock this video for `}
        buttonText="Yes"
        isLoading={false}
        button1Function={handleCloseDialog}
        button2Function={handleUnlockVideo}
        navigation={null}
        isIcon={false}
        button2Text="No"
        price={lockedMoney}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentScreen;
