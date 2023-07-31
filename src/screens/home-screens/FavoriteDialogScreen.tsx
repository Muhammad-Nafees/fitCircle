import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/shared-components/CustomButton';
import {verticalScale} from '../../utils/metrics';

const FavoriteDialogScreen = ({navigation}: any) => {
  const buttonFunction = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Icon name="checkmark-outline" color="white" size={24} />
        </View>
        <Text style={[styles.text, {marginTop: 2}]}>Added to favorites!</Text>
        <View style={{width: '75%', marginTop: verticalScale(10)}}>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={buttonFunction}>Return</CustomButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#101b1b',
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

export default FavoriteDialogScreen;
