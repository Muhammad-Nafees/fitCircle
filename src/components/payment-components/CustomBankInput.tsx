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
  label: string;
  value: any;
  error?: string;
  touched: boolean | undefined;
  initialTouched?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  extraStyles?: any;
  textAlignVertical?: string;
  handleChange: (e: any) => void;
  setFieldError: (name: any, error: any) => void;
  labelStyles?: any;
  fieldName: string;
}

const CustomBankInput = ({...props}: Props) => {
  const route = useRoute();
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    props.handleChange(text);
    if (props.touched && props.error) {
      props.setFieldError(props.fieldName, '');
    }
  };

  return (
    <View>
      <View
        style={[
          {
            position: 'relative',
            borderRadius: 5,
            paddingHorizontal: 14,
            paddingVertical: 4,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'rgba(68, 68, 68, 1)',
          },
        ]}>
        <View style={{width: 110}}>
          <Text style={styles.label}>{props.label}</Text>
        </View>
        <TextInput
          style={[styles.input, props.extraStyles]}
          placeholder="Required"
          value={props.value}
          onChangeText={handleChangeText}
          underlineColorAndroid="transparent"
          placeholderTextColor="white"
          keyboardType={props.keyboardType}
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
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: verticalScale(7),
              marginBottom: verticalScale(4),
            },
          ]}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12, {color: 'red'}]}>{props.error}</Text>
        </View>
      ) : (
        <View style={{height: 35}} />
      )}
    </View>
  );
};

export default CustomBankInput;

const styles = StyleSheet.create({
  input: {
    height: verticalScale(44),
    backgroundColor: 'rgba(68, 68, 68, 1)',
    padding: moderateScale(10),
    color: 'white',
    width: horizontalScale(170),
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: '#ffffff',
  },
});
