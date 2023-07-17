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

  const theme = {
    colors: {
      text: '#000',
      placeholder: 'rgba(68, 68, 68, 0.5)',
      primary: props.error && props.initialTouched ? '#292A2C' : '#292A2C',
    },
    roundness: 0, // Border radius value
  };

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

  const inputStyle = {
    ...styles.input,
    // borderColor: isFocused
    //   ? 'transparent'
    //   : props.touched && props.error
    //   ? 'red'
    //   : 'transparent',
  };

  return (
    <View style={{position: 'relative'}}>
      <Text style={STYLES.text12}>{props.label}</Text>
      <View>
        <TextInput
          style={[
            inputStyle,
            STYLES.text14,
            ,
            {color: 'black', fontWeight: '400'},
            props.extraStyles,
          ]}
          placeholder={isFocused ? '' : props.placeholder}
          value={props.value}
          onChangeText={handleChangeText}
          underlineColorAndroid="transparent"
          placeholderTextColor="gray"
          secureTextEntry={props.isPasswordIcon && !passwordVisible}
          multiline={props.multiline ? props.multiline : false}
          keyboardType={props.keyboardType}
          textAlignVertical="top"
          autoCapitalize={props.autoCapitalize}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </View>

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
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12, {color: 'red'}]}>{props.error}</Text>
        </View>
      ) : (
        <View style={{height: 35}} />
      )}

      {props.isPasswordIcon && (
        <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
          <Icon
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
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
    width: horizontalScale(320),
    height: verticalScale(45),
    marginTop: verticalScale(8),
    backgroundColor: '#ffffff',
    padding: 10,
  },
  icon: {
    position: 'absolute',
    right: horizontalScale(17),
    top: verticalScale(34),
  },
});
