import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import Toast from 'react-native-toast-message';
const CheckCircle = require('../../../../assets/icons/check-circle.png');

const BlankButtonRenderScreen = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (!route.params.isLoading) {
        setIsLoading(false);
        Toast.show({
          type: 'success',
          text1: `Code verified!`,
        });
        handleVerify();
      }
    }, 3000);
  }, []);

  const handleVerify = () => {
    if (route.params.phone) {
      navigation.navigate('CreateNewPassword', {phone: route.params.phone});
    } else {
      navigation.navigate('CreateNewPassword', {email: 'samather66@gmail.com'});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <TouchableOpacity
          style={styles.verifyButtonContainer}
          onPress={handleVerify}>
          {isLoading ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomLoader />
              <Text style={styles.verifyButtonText}>{'  '}Verifying Code</Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={CheckCircle}
                style={{width: 25, height: 25, tintColor: '#8BC75A'}}
              />
              <Text style={styles.verifyButtonText}>{'  '}Code Verified</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonContainer: {
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 17,
    marginVertical: 16,
    alignItems: 'center',
    backgroundColor: '#209BCC',
    width: '85%',
    position: 'absolute',
    bottom: 0,
  },
  verifyButtonText: {
    fontWeight: '400',
    fontSize: 14,
    color: 'white',
  },
});

export default BlankButtonRenderScreen;
