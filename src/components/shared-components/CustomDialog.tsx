import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';
import CustomLoader from './CustomLoader';
import {verticalScale} from '../../utils/metrics';

const CustomDialog = ({
  name,
  isLoading,
  onClose,
  buttonText,
  button2Text,
  isIcon,
  price,
  button1Function = () => {},
  button2Function = () => {},
}: any) => {
  const handleReturn = () => {
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.card}>
          {isIcon && (
            <View style={styles.icon}>
              <Icon name="checkmark-outline" color="white" size={24} />
            </View>
          )}
          <Text style={[styles.text, {marginTop: 2}]}>{name}</Text>
          {price && (
            <Text style={styles.price}>
              {price}
              {'?'}
            </Text>
          )}
          <View style={{width: '75%', marginTop: verticalScale(10)}}>
            {button2Text && (
              <CustomButton
                onPress={button2Function}
                extraStyles={{backgroundColor: '#fb012e'}}>
                {button2Text}
              </CustomButton>
            )}
            <View style={styles.buttonContainer}>
              <CustomButton isDisabled={isLoading} onPress={button1Function}>
                {isLoading ? <CustomLoader /> : buttonText}
              </CustomButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0d1818',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 271,
    height: 180,
    borderRadius: 30,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  price: {
    color: '#30D298',
    fontSize: 24,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default CustomDialog;
