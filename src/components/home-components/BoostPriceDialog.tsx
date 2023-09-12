import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from 'components/shared-components/CustomButton';
import {moderateScale, verticalScale} from 'utils/metrics';

const BoostPriceDialog = ({selectedOptionInternal, onYes, onNo}: any) => {
  return (
    <View style={styles.dialogContainer}>
      <View style={styles.dialogBox}>
        <Text style={styles.dialogText}>Please Confirm</Text>
        <Text style={styles.dialogText}>
          Do you want to boost this post for {selectedOptionInternal.price}?
        </Text>
        <CustomButton onPress={onYes}>Yes</CustomButton>
        <CustomButton
          onPress={onNo}
          extraStyles={{backgroundColor: 'red', marginVertical: 10}}>
          No
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dialogBox: {
    backgroundColor: '#292a2c',
    padding: moderateScale(20),
    borderRadius: 8,
  },
  dialogText: {
    fontSize: 16,
    marginBottom: verticalScale(10),
    color: '#fff',
    textAlign: 'center',
  },
});

export default BoostPriceDialog;
