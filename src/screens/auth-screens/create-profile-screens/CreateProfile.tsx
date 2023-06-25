import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import HeaderBackArrow from '../../../components/shared-components/HeaderBackArrow';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import ProfilePhotos from '../../../components/auth-components/create-profile/ProfilePhotos';
import CreateProfileForm from '../../../components/auth-components/create-profile/CreateProfileForm';

const CreateProfile = ({navigation}: any) => {
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView>
        <View
          style={{
            position: 'relative',
            zIndex: 3,
            height: verticalScale(292),
            alignItems: 'center',
          }}>
          <HeaderBackArrow
            extraStyles={{
              marginTop: verticalScale(20),
              position: 'absolute',
              zIndex: 1,
              left: horizontalScale(15),
            }}
            onPress={() => navigation.goBack()}
          />
          <ProfilePhotos />
        </View>
        <CreateProfileForm />
      </ScrollView>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  profilePhotoContainer: {
    position: 'absolute',
    top: verticalScale(100),
    zIndex: 4,
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#ffffff',
  },
});
