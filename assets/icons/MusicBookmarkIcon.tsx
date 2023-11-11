import React from 'react';
import {Path, Svg, Circle} from 'react-native-svg';

const MusicBookmarkIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="12" fill="white" />
      <Path
        d="M7.91602 17.25V7.91667C7.91602 7.59583 8.03035 7.32108 8.25902 7.09242C8.48768 6.86375 8.76224 6.74961 9.08268 6.75H14.916C15.2368 6.75 15.5116 6.86433 15.7403 7.093C15.9689 7.32167 16.0831 7.59622 16.0827 7.91667V17.25L11.9993 15.5L7.91602 17.25Z"
        fill="#444444"
      />
    </Svg>
  );
};

export default MusicBookmarkIcon;
