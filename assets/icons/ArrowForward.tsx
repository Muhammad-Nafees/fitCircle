import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowForward = ({color = 'white', widthAndHeight = 24}) => {
  return (
    <Svg
      width={widthAndHeight}
      height={widthAndHeight}
      viewBox="0 0 25 24"
      fill="none">
      <Path
        d="M8.16987 19.5303C7.9036 19.2641 7.87939 18.8474 8.09725 18.5538L8.16987 18.4697L14.6392 12L8.16987 5.53033C7.9036 5.26406 7.87939 4.8474 8.09725 4.55379L8.16987 4.46967C8.43613 4.2034 8.8528 4.1792 9.14641 4.39705L9.23053 4.46967L16.2305 11.4697C16.4968 11.7359 16.521 12.1526 16.3031 12.4462L16.2305 12.5303L9.23053 19.5303C8.93763 19.8232 8.46276 19.8232 8.16987 19.5303Z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowForward;
