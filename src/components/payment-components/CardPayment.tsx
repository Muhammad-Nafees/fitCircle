import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowForward from '../../../assets/icons/ArrowForward';
import BankIcon from '../../../assets/Bank';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MastercardIcon from '../../../assets/Mastercard';
import ApplePayIcon from '../../../assets/ApplePay';
import PaypalIcon from '../../../assets/Paypal';
import GooglePayIcon from '../../../assets/GooglePay';

interface CardPaymentProps {
  defaultView?: boolean;
  arrowColor?: string | undefined;
  type: 'Bank' | 'Mastercard' | 'Paypal' | 'GooglePay';
  cardName?: string | undefined;
  extraCardNumberStyles?: any;
  cardNumber: string | undefined;
  extraStyles?: any;
  handleCardDelete?: any;
  deleteIcon?: boolean;
  onPress?: any;
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
  onPress,
  handleCardDelete,
}: CardPaymentProps) => {
  let IconComponent;
  if (type === 'Mastercard') {
    IconComponent = MastercardIcon;
  } else if (type === 'Bank') {
    IconComponent = BankIcon;
  } else if (type === 'Paypal') {
    IconComponent = PaypalIcon;
  } else if (type === 'GooglePay') {
    IconComponent = GooglePayIcon;
  } else if (type === 'ApplePay') {
    IconComponent = ApplePayIcon;
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, extraStyles]}>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        {deleteIcon && (
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 64, 64, 1)',
              borderRadius: 30,
              borderWidth: 0,
              height: '100%',
              zIndex: 10000,
            }}>
            <Icon
              name="minus"
              size={24}
              color={'white'}
              onPress={() => handleCardDelete(type)}
            />
          </TouchableOpacity>
        )}
        {IconComponent && <IconComponent />}
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
    </TouchableOpacity>
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
