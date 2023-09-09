import Svg, {Circle, Path} from 'react-native-svg';

const CrossIcon = () => (
  <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <Circle cx="17" cy="17" r="17" fill="#D23030" />
    <Path
      d="M23 11L11 23"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M11 11L23 23"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default CrossIcon;
