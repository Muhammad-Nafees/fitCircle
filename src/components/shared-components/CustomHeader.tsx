import {View} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import HeaderBackArrow from './HeaderBackArrow';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: verticalScale(20),
        marginLeft: horizontalScale(20),
      }}>
      <HeaderBackArrow onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CustomHeader;
