import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';

interface Props {
  icon: string;
  text: string;
}

const UploadCertificateCard = ({icon,text}:Props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <Icon name={icon} size={30} color="white" />
      <Text style={[STYLES.text14, {fontWeight: '600'}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default UploadCertificateCard;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(298),
    height: verticalScale(204),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(68, 68, 68, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
