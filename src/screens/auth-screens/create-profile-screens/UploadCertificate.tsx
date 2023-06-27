import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import UploadCertificateCard from '../../../components/auth-components/create-profile/UploadCertificateCard';
import CustomButton from '../../../components/shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../../utils/metrics';

const UploadCertificate = ({navigation}: any) => {
  const handleNavigate = () => {
    navigation.navigate('CertificateVerified');
  };
  return (
    <View style={STYLES.container}>
      <ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[STYLES.text16, {fontWeight: '700'}]}>
            Upload Cerrtificates
          </Text>
          <TouchableOpacity onPress={handleNavigate}>
            <Text
              style={[STYLES.text12, {fontWeight: '700', color: '#209BCC'}]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 20, gap: 16}}>
          <UploadCertificateCard icon="camera-outline" text="Camera" />
          <UploadCertificateCard icon="cloud-upload-outline" text="Upload" />
          <UploadCertificateCard icon="add-circle-outline" text="Add more" />
        </View>
        <View
          style={{
            marginVertical: verticalScale(42),
            marginHorizontal: horizontalScale(30),
          }}>
          <CustomButton onPress={handleNavigate}>Continue</CustomButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UploadCertificate;
