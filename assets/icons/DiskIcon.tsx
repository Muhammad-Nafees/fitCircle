import React from 'react';
import {Defs, Ellipse, Svg, RadialGradient, Stop} from 'react-native-svg';

const DiskIcon = () => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Ellipse
        cx="14.8132"
        cy="14.5533"
        rx="14.3328"
        ry="14.5064"
        fill="url(#paint0_angular_1_392651)"
      />
      <Ellipse
        cx="14.8126"
        cy="14.5531"
        rx="3.65631"
        ry="3.70061"
        fill="#DDBC43"
      />
      <Defs>
        <RadialGradient
          id="paint0_angular_1_392651"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(14.8132 14.5533) rotate(88.8449) scale(14.5093 14.3358)">
          <Stop offset="0.125696" stop-color="#171717" />
          <Stop offset="0.383821" stop-color="#373736" />
          <Stop offset="0.627786" stop-color="#171717" />
          <Stop offset="0.880255" stop-color="#373736" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
};

export default DiskIcon;
