import {useState} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import {Text} from 'react-native-paper';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  placeholder: string;
  label: string;
  value: any;
  error?: string;
  touched: boolean | undefined;
  initialTouched?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  extraStyles?: any;
  multiline?: boolean;
  isPasswordIcon?: boolean;
  textAlignVertical?: string;
  handleChange: (e: any) => void;
}

const CustomInput = ({...props}: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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

  return (
    <View style={{position: 'relative'}}>
      <Text style={STYLES.text12}>{props.label}</Text>
      <TextInput
        style={[
          styles.input,
          STYLES.text14,
          {color: '#000', fontWeight: '400'},
          props.extraStyles,
        ]}
        placeholder={isFocused ? '' : props.placeholder}
        value={props.value}
        multiline={props.multiline ? props.multiline : false}
        onChangeText={handleChangeText}
        secureTextEntry={props.isPasswordIcon && !passwordVisible}
        keyboardType={props.keyboardType}
        numberOfLines={1} // Add this line
        textAlignVertical={props.textAlignVertical === 'top' ? 'top' : 'center'}
        autoCapitalize={props.autoCapitalize}
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
            marginTop: verticalScale(7),
            marginBottom: verticalScale(4),
          }}>
          <Icon name="alert-circle" size={22} color="white" />
          <Text style={STYLES.text12}>{props.error}</Text>
        </View>
      ) : (
        <View style={{height: 35}} />
      )}

      {props.isPasswordIcon && (
        <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
          <Icon
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            color="black"
            size={24}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    // textAlignVertical: 'top',
    width: horizontalScale(294),
    height: verticalScale(50),
    marginTop: verticalScale(8),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  icon: {
    position: 'absolute',
    right: horizontalScale(17),
    top: verticalScale(34),
  },
});
