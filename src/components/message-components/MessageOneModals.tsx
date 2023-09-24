import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CustomButton from '../shared-components/CustomButton';
import CrossIcon from '../../../assets/icons/Cross';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../../styles/globalStyles';

export const BlockDeleteModal = ({
  onPress,
  handleDeleteUser,
  actionType,
}: any) => {
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalContentContainer}>
        <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
          Please Confirm
        </Text>
        <Text style={styles.whiteText}>
          Are you sure you want to{' '}
          <Text style={styles.coloredText}>
            {actionType === 'Deleted' ? 'Delete' : 'Block'}
          </Text>{' '}
          this user ?
        </Text>
      </View>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={handleDeleteUser}>
          <Text style={styles.modalButtonText}>
            {actionType === 'Deleted' ? 'Delete' : 'Block'}
          </Text>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity onPress={onPress} style={styles.modalButton}>
          <Text
            style={[
              styles.modalButtonText,
              {
                color: 'rgba(32, 128, 183, 1)',
                textAlign: 'center',
              },
            ]}>
            Return
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SuccessModal = ({actionType, onPress}: any) => {
  return (
    <View style={[styles.modalContent, {backgroundColor: 'transparent'}]}>
      <View style={styles.card}>
        {actionType === 'Blocked' ? (
          <View style={styles.iconModal}>
            <Icon name="checkmark-outline" color="white" size={24} />
          </View>
        ) : (
          <CrossIcon />
        )}
        <Text style={[STYLES.text14, {marginTop: 2}]}>{actionType}</Text>
        <View style={{width: '75%', marginTop: verticalScale(25)}}>
          <CustomButton onPress={onPress}>Return</CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    borderRadius: 32,
    alignItems: 'center',
    marginHorizontal: horizontalScale(35),
  },
  modalButton: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(60),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    justifyContent: 'center',
  },
  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 15,
    gap: 15,
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(220, 77, 77, 1)',
  },
  coloredText: {
    color: 'rgba(220, 77, 77, 1)',
    fontSize: 14,
    fontWeight: '500',
  },
  whiteText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginHorizontal: horizontalScale(28),
    textAlign: 'center',
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
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
});
