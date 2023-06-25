import {View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {verticalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  defaultValue?: string;
  values: any;
  label: string;
  styles?: any;
  backgroundColor?: string;
  width?: string | number;
  height?: number;
  isIcon?: boolean;
}

export const CustomSelect = ({
  defaultValue,
  label,
  values,
  backgroundColor,
  width,
  height,
  isIcon = true,
  styles,
}: Props) => {
  return (
    <View style={[{gap: 8, marginBottom: 20}, styles]}>
      <Text>{<Text style={STYLES.text12}>{label}</Text>}</Text>
      <SelectDropdown
        data={values}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        renderDropdownIcon={() =>
          isIcon && <Icon name="chevron-down-outline" color="grey" size={24} />
        }
        defaultButtonText={defaultValue ? defaultValue : 'Select'}
        rowTextStyle={{color: '#9B9B9B', position: 'absolute', left: 0}}
        selectedRowTextStyle={{color: 'black', position: 'absolute', left: 0}}
        selectedRowStyle={{
          backgroundColor: '#F3F3F3',
          borderRadius: 4,
          marginVertical: 2,
          borderWidth: 0,
        }}
        rowStyle={{borderBottomWidth: 0, backgroundColor: '#FBFBFB'}}
        buttonTextStyle={{fontSize: 14, color: 'rgba(68, 68, 68, 0.5)'}}
        buttonStyle={{
          height: height ? verticalScale(height) : verticalScale(45),
          backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
          width: width ? width : '78%',
        }}
      />
    </View>
  );
};
