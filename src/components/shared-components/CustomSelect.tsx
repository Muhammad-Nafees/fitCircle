import React from 'react';
import {View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
  defaultValue?: string;
  selectedValue?: string;
  values: string[];
  label: string;
  error?: string;
  styles?: object;
  backgroundColor?: string;
  width?: string | number;
  height?: number;
  initialTouched?: boolean;
  touched?: boolean;
  isIcon?: boolean;
  setCountry?: any;
  setFieldValue: (field: string, value: string) => void;
  fontColor?: string;
}

export const CustomSelect: React.FC<Props> = ({
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
  touched,
  setCountry,
  styles,
  fontColor,
}) => {
  const field = label.toLowerCase().replace(/\s/g, '');

  return (
    <View style={[{gap: 8}, styles]}>
      <Text>
        {label !== 'unit' && <Text style={STYLES.text12}>{label}</Text>}
      </Text>
      <SelectDropdown
        data={values ? values : ['Loading...']}
        onSelect={(selectedItem, index) => {
          setFieldValue(field, selectedItem),
            setCountry && setCountry(selectedItem);
        }}
        renderDropdownIcon={() =>
          isIcon && <Icon name="chevron-down-outline" color="grey" size={24} />
        }
        // search
        // searchPlaceHolder={'Search here'}
        // searchPlaceHolderColor={'#000'}
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
          color: fontColor ? fontColor : '#000000',
          textAlign: 'left',
        }}
        buttonStyle={{
          height: height ? height : 48,
          backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
          width: width ? width : '85%',
        }}
      />
      {error && touched ? (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12,{color: 'red'}]}>{error}</Text>
        </View>
      ) : (
        <View style={{height: 25}} />
      )}
    </View>
  );
};
