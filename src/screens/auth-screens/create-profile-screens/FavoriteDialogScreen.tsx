import CustomButton from '../../../components/shared-components/CustomButton';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';

const FavoriteDialogScreen = ({navigation, route}: any) => {
  const [buttonText, setButtonText] = useState(
    route.name === 'FavoriteDialog' ? 'Return' : 'Log in',
  );
  const [message, setMessage] = useState(
    route.name === 'FavoriteDialog'
      ? 'Added to favorites!'
      : 'Password successfully changed',
  );

  const buttonFunction = () => {
    if (route.name === 'FavoriteDialog') {
      navigation.goBack();
    } else {
      navigation.navigate('LoginFormScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Icon name="checkmark-outline" color="white" size={24} />
        </View>
        <Text style={[styles.text, {marginTop: 2}]}>{message}</Text>
        <View style={{width: '75%', marginTop: verticalScale(10)}}>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={buttonFunction}>{buttonText}</CustomButton>
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
    width: horizontalScale(34),
    height: verticalScale(34),
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: verticalScale(20),
    padding: moderateScale(10),
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
    marginVertical: verticalScale(10),
  },
});

export default FavoriteDialogScreen;
