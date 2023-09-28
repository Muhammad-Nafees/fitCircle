import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowForward from '../../../assets/icons/ArrowForward';

interface CustomPaymentProps {
  text: string;
  miniText?: string;
  arrowColor?: string;
  onPress: any;
  extraStyles?: any;
}

const CustomPaymentMethod = ({
  text,
  miniText,
  arrowColor = 'white',
  onPress,
  extraStyles,
}: CustomPaymentProps) => {
  return (
    <TouchableOpacity style={[styles.container, extraStyles]} onPress={onPress}>
      <View style={[styles.textContainer, miniText ? {gap: 5} : {}]}>
        <Text style={styles.paymentText}>{text}</Text>
        {miniText && <Text style={styles.miniText}>{miniText}</Text>}
      </View>
      <ArrowForward color={arrowColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    paddingRight: 14,
    paddingLeft: 7,
    borderRadius: 5,
    paddingVertical: 9,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  miniText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 11,
  },
});

export default CustomPaymentMethod;
