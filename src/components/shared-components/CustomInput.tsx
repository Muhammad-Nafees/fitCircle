import {useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import AlertIcon from 'react-native-vector-icons/Ionicons';

interface Props {
  placeholder: string;
  label: string;
  value: any;
  error?: string;
  touched: boolean | undefined;
  initialTouched?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  extraStyles?: any;
  handleChange: (e: any) => void;
}

const CustomInput = ({...props}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const theme = {
    colors: {
      text: '#000',
      placeholder: 'rgba(68, 68, 68, 0.5)',
      primary: props.error && props.initialTouched ? 'red' : '#209BCC',
    },
    roundness: 0, // Border radius value
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };
  const handleChangeText = (text: string) => {
    props.handleChange(text);
  };

  const inputStyle = {
    ...styles.input,
    // borderColor: isFocused
    //   ? 'transparent'
    //   : props.touched && props.error
    //   ? 'red'
    //   : 'transparent',
  };

  return (
    <View style={{}}>
      <Text style={STYLES.text12}>{props.label}</Text>
      <TextInput
        style={[inputStyle, STYLES.text14, , props.extraStyles]}
        placeholder={isFocused ? '' : props.placeholder}
        value={props.value}
        onChangeText={handleChangeText}
        underlineColor={'transpsarent'}
        theme={theme}
        keyboardType={props.keyboardType}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {props.error &&
      ((props.touched && !props.value) ||
        (props.error && props.value) ||
        isFocused) ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            marginTop: verticalScale(1),
          }}>
          <AlertIcon name="alert-circle" size={22} color="white" />
          <Text style={STYLES.text12}>{props.error}</Text>
        </View>
      ) : (
        <View style={{height: 25}} />
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    width: horizontalScale(294),
    height: verticalScale(50),
    marginTop: verticalScale(8),
    backgroundColor: '#ffffff',
  },
});
