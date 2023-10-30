import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
// --------------------------------------------------------------------------------------//
import CustomToggleButton from '../../components/settings-components/CustomToggleButton';
import {updateUserPrivacy} from '../../api/auth-module/profileSettings-module';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setUserData} from '../../redux/authSlice';

export const PrivacySettingsScreen = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  console.log(userData, 'USERDATA!');
  const dispatch = useDispatch();
  const [showAge, setShowAge] = useState<boolean | undefined>(
    userData?.showAge,
  );
  const [showEmailAddress, setShowEmailAddress] = useState<boolean | undefined>(
    userData?.showEmailAddress,
  );
  const [showName, setShowName] = useState<boolean | undefined>(
    userData?.showName,
  );

  const handleUserPrivacy = async () => {
    const reqData = {
      showAge: showAge, // Use the updated state values here
      showEmailAddress: showEmailAddress,
      showName: showName,
    };
    console.log(reqData, 'REQDATA');
    try {
      const response = await updateUserPrivacy(reqData);
      const data = response?.data?.data;
      dispatch(setUserData(data));
    } catch (error: any) {
      console.log(error?.response, 'From update user privacy!');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Privacy Settings</Text>
      </View>
      <View>
        <CustomToggleButton
          isEnabled={showName}
          setIsEnabled={setShowName}
          text="Don’t show my name"
          onChangeToggle={handleUserPrivacy}
        />
        <CustomToggleButton
          isEnabled={showEmailAddress}
          setIsEnabled={setShowEmailAddress}
          text="Don’t show my email address"
          onChangeToggle={handleUserPrivacy}
        />
        <CustomToggleButton
          isEnabled={showAge}
          setIsEnabled={setShowAge}
          text="Don’t show my age"
          onChangeToggle={handleUserPrivacy}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: 16,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
});
