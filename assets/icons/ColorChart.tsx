import Svg, {Circle, Path} from 'react-native-svg';

const ColorChart = ({color}: any) => {
  return (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
      <Circle cx="7.86605" cy="8.38375" r="7.7684" fill={color} />
    </Svg>
  );
};

export default ColorChart;
