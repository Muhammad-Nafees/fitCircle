import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';

interface Props {
  defaultValue?: string;
  selectedValue?: string;
  values: any;
  label: string;
  error?: any;
  styles?: any;
  backgroundColor?: string;
  width?: string | number;
  height?: number;
  isIcon?: boolean;
  setFieldValue: any;
}

export const CustomSelect = ({
  defaultValue,
  label,
  selectedValue,
  values,
  error,
  backgroundColor,
  width,
  height,
  isIcon = true,
  setFieldValue,
  styles,
}: Props) => {
  return (
    <View style={[{gap: 8}, styles]}>
      <Text>
        {<Text style={STYLES.text12}>{label != 'unit' && label}</Text>}
      </Text>
      <SelectDropdown
        data={values}
        onSelect={(selectedItem, index) => {
          setFieldValue(label.toLocaleLowerCase(), selectedItem);
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
        buttonTextStyle={{
          fontSize: 14,
          color: 'rgba(68, 68, 68, 0.5)',
          textAlign: 'left',
        }}
        buttonStyle={{
          height: height ? verticalScale(height) : verticalScale(45),
          backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
          width: width ? width : '78%',
        }}
      />
      {error ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}>
          <Icon name="alert-circle" size={22} color="white" />
          <Text style={STYLES.text12}>{error}</Text>
        </View>
      ) : (
        <View style={{height: 25}} />
      )}
    </View>
  );
};
