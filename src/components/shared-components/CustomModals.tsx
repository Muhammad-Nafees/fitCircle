import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CrossIcon from '../../../assets/icons/Cross';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';
import {STYLES} from '../../styles/globalStyles';

interface modalProps {
  onCancel: () => void;
  onConfirm: () => void;
  modalText: string;
  confirmText: string;
  cancelText: string;
  confirmColor: any;
  cancelColor: any;
  highlightedWord?: any;
  modalHeading?: string;
}

interface OutputModalProps {
  extraTextStyles?: any;
  type: 'success' | 'failed';
  onPress: any;
  modalText: string;
}

export const CustomConfirmationModal = ({
  onCancel,
  onConfirm,
  modalText,
  confirmText,
  cancelText,
  confirmColor,
  cancelColor,
  highlightedWord,
  modalHeading = 'Please Confirm',
}: modalProps) => {
  const highlightWord = (text: string, word: any, style: any): any => {
    if (word) {
      const parts = text.split(new RegExp(`(${word})`, 'gi'));
      return (
        <Text>
          {parts.map((part, index) =>
            part.toLowerCase() === word.toLowerCase() ? (
              <Text key={index} style={style}>
                {part}
              </Text>
            ) : (
              <Text key={index}>{part}</Text>
            ),
          )}
        </Text>
      );
    } else {
      return <Text>{text}</Text>;
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.heading}>{modalHeading}</Text>
        <Text style={styles.whiteText}>
          {highlightWord(modalText, highlightedWord, styles.coloredText)}
        </Text>
      </View>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
          <Text style={[styles.modalButtonText, {color: cancelColor}]}>
            {cancelText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modalButton,
            {borderLeftWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)'},
          ]}
          onPress={onConfirm}>
          <Text style={[styles.modalButtonText, {color: confirmColor}]}>
            {confirmText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const CustomOutputModal = ({
  type,
  onPress,
  extraTextStyles,
  modalText,
}: OutputModalProps) => {
  return (
    <View style={[styles.modalContent, {backgroundColor: 'transparent'}]}>
      <View style={styles.card}>
        {type === 'success' ? (
          <View style={styles.iconModal}>
            <Icon name="checkmark-outline" color="white" size={24} />
          </View>
        ) : (
          <CrossIcon />
        )}
        <Text style={[STYLES.text14, {marginTop: 2}, extraTextStyles]}>
          {modalText}
        </Text>
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
    alignSelf: 'center',
    marginHorizontal: horizontalScale(35),
    height: 175,
    width: 290,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginTop: 16,
    paddingBottom: 24,
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
    marginHorizontal: 20,
    textAlign: 'center',
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 10,
  },
  confirmText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(32, 128, 183, 1)',
  },
  cancelText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(220, 77, 77, 1)',
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(220, 77, 77, 1)',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    justifyContent: 'center',
  },
  modalButton: {
    paddingVertical: verticalScale(15),
    flex: 1,
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
