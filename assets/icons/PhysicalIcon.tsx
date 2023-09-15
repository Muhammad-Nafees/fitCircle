import Svg, {Circle, Path} from 'react-native-svg';

const PhysicalSvgIcon = () => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 22 20"
      fill="none">
      <Path
        d="M1.30859 18.1998L14.9771 4.78816L12.8265 2.36865L9.86929 5.057"
        stroke="#209BCC"
        stroke-width="1.61301"
        stroke-linecap="round"
      />
      <Path
        d="M10.9677 9.47852L16.0767 14.8714C16.2648 15.0699 16.1241 15.3971 15.8506 15.3971H9.41016"
        stroke="#209BCC"
        stroke-width="1.61301"
        stroke-linecap="round"
      />
      <Path
        d="M15.3281 5.11719V9.78979H20.3122"
        stroke="#209BCC"
        stroke-width="1.61301"
        stroke-linecap="round"
      />
      <Circle cx="17.9198" cy="2.6249" r="1.86904" fill="#209BCC" />
    </Svg>
  );
};

export default PhysicalSvgIcon;
