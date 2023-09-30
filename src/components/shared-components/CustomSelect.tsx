import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {verticalScale} from '../../utils/metrics';

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
  fieldName: string;
  setFieldError: (field: string, value: string) => void;
  extraRowTextStyle?: any;
  extraRowStyle?: any;
  extraDropdownStyle?: any;
  extraSelectedRowStyle?: any;
  extraButtonStyles?: any;
  starlabel?: boolean;
  handleChange?: any;
  placeholder?: string;
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
  fieldName,
  setFieldError,
  extraRowTextStyle,
  extraRowStyle,
  extraDropdownStyle,
  extraSelectedRowStyle,
  starlabel,
  handleChange,
  placeholder,
  extraButtonStyles,
}) => {
  const field = label.toLowerCase().replace(/\s/g, '');

  const handleFocus = () => {
    if (touched && error) {
      setFieldError(fieldName, '');
    }
  };

  const drpDwnRef: any = useRef({});

  useEffect(() => {
    if (!selectedValue) {
      drpDwnRef.current.reset();
    }
  }, [selectedValue]);

  return (
    <View style={[{gap: 8}, styles]}>
      <Text>
        {label !== 'unit' && (
          <Text style={STYLES.text12}>
            {label}
            {starlabel ? (
              <Text style={{color: 'rgba(255, 145, 145, 1)'}}>*</Text>
            ) : null}
          </Text>
        )}
      </Text>
      <SelectDropdown
        data={values ? values : ['Loading...']}
        ref={drpDwnRef}
        onSelect={(selectedItem, index) => {
          if (handleChange) handleChange(selectedItem);
          setFieldValue(field, selectedItem),
            setCountry && setCountry(selectedItem);
        }}
        placeholder={placeholder}
        renderDropdownIcon={() =>
          isIcon && <Icon name="chevron-down-outline" color="grey" size={24} />
        }
        defaultButtonText={defaultValue ? defaultValue : 'Select'}
        rowTextStyle={{
          color: '#9B9B9B',
          position: 'absolute',
          left: 0,
          flexWrap: 'wrap',
          ...extraRowTextStyle,
        }}
        selectedRowTextStyle={{color: 'black', position: 'absolute', left: 0}}
        selectedRowStyle={{
          backgroundColor: '#F3F3F3',
          borderRadius: 4,
          marginVertical: 2,
          borderWidth: 0,
          ...extraSelectedRowStyle,
        }}
        rowStyle={{
          borderBottomWidth: 0,
          backgroundColor: '#FBFBFB',
          ...extraRowStyle,
        }}
        defaultValue={'Gender'}
        buttonTextStyle={{
          fontSize: 14,
          color: fontColor ? fontColor : '#000000',
          textAlign: 'left',
        }}
        onFocus={handleFocus}
        buttonStyle={{
          height: height ? height : verticalScale(45),
          backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
          width: width ? width : '85%',
          ...extraButtonStyles,
        }}
        dropdownStyle={{...extraDropdownStyle}}
      />
      {(error && !values) || (error && touched) ? (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12, {color: 'red'}]}>{error}</Text>
        </View>
      ) : (
        <View style={{height: 25}} />
      )}
    </View>
  );
};
