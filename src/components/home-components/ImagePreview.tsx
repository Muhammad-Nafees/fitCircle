import {ImageZoom} from '@thaihuynhquang/react-native-image-zoom-next';
import {s3bucketReference} from '../../api';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  isImageFullscreen: boolean;
  setImageFullscreen: any;
  media: any;
  width: number;
  handleImageClose: any;
}

const ImagePreview = ({
  isImageFullscreen,
  setImageFullscreen,
  media,
  width,
  handleImageClose,
}: Props) => {
  return (
    <Modal
      onBackButtonPress={() => setImageFullscreen(false)}
      isVisible={isImageFullscreen}
      backdropOpacity={1}
      onBackdropPress={() => setImageFullscreen(false)}
      style={[styles.fullscreenContainer, {width: width}]}>
      <TouchableOpacity
        onPress={handleImageClose}
        style={[styles.fullscreenContainer, {width: width}]}>
        <ImageZoom
          uri={`${s3bucketReference}/${media}`}
          minScale={1}
          maxScale={10}
          style={[styles.imageZoom, {width: width}]}
          isPinchEnabled={true}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  fullscreenContainer: {
    justifyContent: 'center',
    height: 400,
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 0,
    padding: 0,
  },
  imageZoom: {
    height: 300,
  },
});
