import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

const MusicPlayIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 15 15" fill="none">
      <Circle cx="7.5" cy="7.5" r="7.5" fill="#134451" />
      <Path
        d="M6.14648 10.7949C5.96419 10.9133 5.77971 10.9203 5.59305 10.8156C5.40638 10.711 5.31286 10.5491 5.3125 10.33V4.66985C5.3125 4.4511 5.40602 4.28923 5.59305 4.18423C5.78008 4.07923 5.96456 4.08615 6.14648 4.20501L10.6035 7.03509C10.7676 7.14446 10.8496 7.29941 10.8496 7.49993C10.8496 7.70045 10.7676 7.8554 10.6035 7.96478L6.14648 10.7949Z"
        fill="white"
      />
    </Svg>
  );
};

export default MusicPlayIcon;
