import {useState} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import {Text} from 'react-native-paper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';

interface Props {
  placeholder?: string;
  label?: string;
  value?: any;
  error?: string;
  touched?: boolean | undefined;
  initialTouched?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  extraStyles?: any;
  multiline?: boolean;
  isPasswordIcon?: boolean;
  textAlignVertical?: string;
  handleChange: (e: any) => void;
  isFirstLetterLowercase?: boolean;
  setFieldError: (name: any, error: any) => void;
  labelStyles?: any;
  fieldName: string;
  editable?: boolean;
  starlabel?: boolean;
  secondLabel?: boolean;
}

const CustomInput = ({...props}: Props) => {
  const [characterCount, setCharacterCount] = useState(50);
  const route = useRoute();
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
    if (props.isFirstLetterLowercase) {
      const lowerCasedValue =
        props.value.charAt(0).toLowerCase() + props.value.slice(1);
      props.handleChange(lowerCasedValue);
    }
  };

  const handleChangeText = (text: string) => {
    if (props.label === 'Number' && route.name === 'AddCard') {
      const cleanedText = text.replace(/[^0-9]/g, '');
      const limitedText = cleanedText.slice(0, 16);
      const formattedText = limitedText.replace(/(.{4})/g, '$1 ');
      props.handleChange(formattedText);
    } else {
      if (props.label === 'Description ' && route.name === 'UploadMealPlan') {
        const newCharacterCount = 50 - text.length;
        setCharacterCount(newCharacterCount);
      }
      props.handleChange(text);
    }

    if (props.touched && props.error) {
      props.setFieldError(props.fieldName, '');
    }
  };

  const inputStyle = {
    ...styles.input,
  };

  return (
    <View style={[{position: 'relative'}]}>
      <Text style={[STYLES.text12, props.labelStyles]}>
        {props.label}
        {props.starlabel ? (
          <Text style={{color: 'rgba(255, 145, 145, 1)'}}>*</Text>
        ) : null}
        {props.secondLabel ? (
          <Text style={{color: 'rgba(255, 255, 255, 0.5)'}}>
            {characterCount}/50
          </Text>
        ) : null}
      </Text>
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
          editable={props.editable}
        />
      </View>

      {props.error &&
      ((props.touched && !props.value) ||
        (props.error && props.value) ||
        isFocused) ? (
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: verticalScale(7),
              marginBottom: verticalScale(4),
            },
            props.label === 'Age' &&
              route.name === 'VerificationOne' && {
                width: horizontalScale(75),
                marginBottom: verticalScale(0),
                height: 27,
              },
          ]}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12, {color: 'red'}]}>{props.error}</Text>
        </View>
      ) : (
        <View
          style={[
            {height: 35},
            props.label === 'Age' &&
              route.name === 'VerificationOne' && {height: verticalScale(35)},
          ]}
        />
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
    padding: moderateScale(10),
  },
  icon: {
    position: 'absolute',
    right: horizontalScale(17),
    top: verticalScale(34),
  },
});
