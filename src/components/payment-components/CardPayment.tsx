import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowForward from '../../../assets/icons/ArrowForward';
const Mastercard = require('../../../assets/images/mastercard.png');
const Bank = require('../../../assets/images/bank.png');
const Paypal = require('../../../assets/images/paypal.png');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CardPaymentProps {
  defaultView?: boolean;
  arrowColor?: string | undefined;
  type: 'Bank' | 'Mastercard' | 'Paypal';
  cardName?: string | undefined;
  extraCardNumberStyles?: any;
  cardNumber: string | undefined;
  extraStyles?: any;
  handleCardDelete?: any;
  deleteIcon?: boolean;
}

const CardPayment = ({
  defaultView = true,
  arrowColor,
  type = 'Mastercard',
  cardName = 'Mastercard',
  extraCardNumberStyles,
  cardNumber,
  extraStyles,
  deleteIcon = false,
  handleCardDelete,
}: CardPaymentProps) => {
  let imageSource;
  if (type === 'Mastercard') {
    imageSource = Mastercard;
  } else if (type === 'Bank') {
    imageSource = Bank;
  } else if (type === 'Paypal') {
    imageSource = Paypal;
  }
  return (
    <View style={[styles.container, extraStyles]}>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        {deleteIcon && (
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 64, 64, 1)',
              borderRadius: 30,
              borderWidth: 0,
            }}>
            <Icon
              name="minus"
              size={24}
              color={'white'}
              onPress={() => handleCardDelete(type)}
            />
          </TouchableOpacity>
        )}
        <Image source={imageSource} />
        <View style={{gap: 4, justifyContent: 'center'}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: 'rgba(255, 255, 255, 1)',
            }}>
            {cardName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.cardMiniText, extraCardNumberStyles]}>
              {cardNumber}
            </Text>
            {defaultView && (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.cardMiniText}> | </Text>
                <Text
                  style={[
                    styles.cardMiniText,
                    {color: 'rgba(32, 155, 204, 1)'},
                  ]}>
                  Default
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View>
        <ArrowForward color={arrowColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardMiniText: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(125, 125, 125, 1)',
  },
  container: {
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default CardPayment;
