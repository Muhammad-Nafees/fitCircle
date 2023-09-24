import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// ---------------------------------------------------------//
import {STYLES} from '../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CustomButton from '../shared-components/CustomButton';

export const ProfileSuccessModal = ({removal, reelsModal}: any) => {
  return (
    <View style={[styles.modalContent, {backgroundColor: 'transparent'}]}>
      <View style={styles.card}>
        <View style={styles.iconModal}>
          <Icon name="checkmark-outline" color="white" size={24} />
        </View>
        {reelsModal ? (
          <Text style={[STYLES.text14, {marginTop: 2}]}>
            Added to favorites!
          </Text>
        ) : (
          <Text
            style={[
              STYLES.text14,
              {marginTop: 2, color: 'rgba(48, 210, 152, 1)'},
            ]}>
            Removed Successfully
          </Text>
        )}
        <View style={{width: '75%', marginTop: verticalScale(25)}}>
          <CustomButton onPress={removal}>Return</CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(271),
    height: verticalScale(180),
    borderRadius: 30,
  },
  iconModal: {
    width: horizontalScale(34),
    height: verticalScale(34),
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    borderRadius: 32,
    alignItems: 'center',
    marginHorizontal: horizontalScale(35),
  },
});
