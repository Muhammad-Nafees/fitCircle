import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {horizontalScale, verticalScale} from '../../utils/metrics';
import Modal from 'react-native-modal';
import CustomButton from '../../components/shared-components/CustomButton';
import {STYLES} from '../../styles/globalStyles';

const Rating = ({navigation, route}: any) => {
  const [rating, setRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  const handleRating = (selectedRating: any) => {
    setRating(selectedRating);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 30,
            paddingTop: 15,
            gap: 15,
          }}>
          <Text style={styles.whiteText}>
            How was your video experience with
            <Text style={[styles.whiteText, {fontWeight: '700'}]}>
              {route.params.username}
            </Text>
            ?
          </Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                style={styles.star}>
                <FontAwesomeIcon
                  name={star <= rating ? 'star' : 'star-o'}
                  size={17}
                  color={star <= rating ? 'gold' : 'gray'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            placeholder="Leave a comment..."
            value={comment}
            multiline
            style={styles.commentInput}
            placeholderTextColor={'gray'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setIsModalVisible(true)}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: 'rgba(32, 128, 183, 1)',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
          <View style={styles.verticalLine} />
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.modalButton}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: 'rgba(220, 77, 77, 1)',
              }}>
              Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackButtonPress={() => setIsModalVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={[styles.modalContent, {backgroundColor: 'transparent'}]}>
          <View style={styles.card}>
            <View style={styles.iconModal}>
              <Ionicons name="checkmark-outline" color="white" size={24} />
            </View>
            <Text style={[STYLES.text14, {marginTop: 2}]}>Rate Submitted</Text>
            <View style={{width: '75%', marginTop: verticalScale(25)}}>
              <CustomButton
                onPress={() =>
                  navigation.navigate('ChatDetails', {
                    username: route.params.username,
                  })
                }>
                Return
              </CustomButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modalContent: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 283,
    width: 290,
  },
  modalButton: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(60),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  whiteText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginHorizontal: 28,
    marginTop: 10,
    textAlign: 'center',
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 5,
  },
  commentInput: {
    marginTop: 10,
    padding: 10,
    width: 273,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 90,
    textAlignVertical: 'top',
  },
  modal: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    margin: 0,
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

export default Rating;
