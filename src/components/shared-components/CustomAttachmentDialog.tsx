import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
const CancelIcon = require('../../../assets/icons/cancel.png');

interface CustomAttachmentDialog {
  message: string;
  showCancel?: boolean;
  onCancel: any;
}

const CustomAttachmentDialog = ({
  message,
  showCancel,
  onCancel,
}: CustomAttachmentDialog) => {
  return (
    <View
      style={{
        backgroundColor: '#00abd2',
      }}>
      <View style={styles.attachmentDialog}>
        <View>
          <Text style={{color: '#fff', marginRight: 20}}>{message}</Text>
        </View>
        {showCancel && (
          <TouchableOpacity onPress={onCancel} style={{marginRight: 8}}>
            <Image
              source={CancelIcon}
              style={{tintColor: '#fff', width: 18, height: 18}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  attachmentDialog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 10,
  },
};

export default CustomAttachmentDialog;
