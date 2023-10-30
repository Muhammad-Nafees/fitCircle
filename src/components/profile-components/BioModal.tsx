import {BlurView} from '@react-native-community/blur';
import CustomButton from '../../components/shared-components/CustomButton';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IUser} from 'interfaces/user.interface';

interface Props {
  userData: IUser | null;
}

const BioModal = ({userData}: Props) => {
  console.log(userData, 'UUUUU');
  const navigation: any = useNavigation();
  const data = [
    {label: 'Gender', value: userData?.gender},
    {label: 'Age', value: userData?.age},
    {
      label: 'Height',
      value: `${userData?.height?.value} ${userData?.height?.unit}`,
    },
    {
      label: 'Weight',
      value: `${userData?.weight?.value} ${userData?.weight?.unit}`,
    },
    {label: 'Body Type', value: userData?.bodyType},
    {label: 'Activity', value: userData?.activity},
  ];

  return (
    <BlurView
      blurType="light"
      blurAmount={4}
      overlayColor="transparent"
      reducedTransparencyFallbackColor="rgba(255,255,255,.2)"
      style={styles.blurContainer}>
      <View style={styles.modal}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={[styles.mainText, {textAlign: 'center'}]}>
              Details
            </Text>
            <View>
              <Text style={styles.mainText}>
                {userData?.firstName} {userData?.lastName}
              </Text>
              <Text style={[styles.text1, {color: 'rgba(32, 155, 204, 1)'}]}>
                {userData?.email}
              </Text>
            </View>
            <View>
              {data.map((item, index) => (
                <View key={index} style={styles.attributeContainer}>
                  <Text style={styles.text2}>{item?.label}</Text>
                  <Text style={styles.text1}>{item?.value}</Text>
                </View>
              ))}
            </View>
            <CustomButton onPress={() => navigation.navigate('TestDetails')}>
              Physical Activity Readiness Results
            </CustomButton>
          </View>
        </ScrollView>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flex: 1,
  },
  blurContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '58%',
  },
  contentContainer: {
    paddingHorizontal: 45,
    paddingTop: 30,
    gap: 30,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  text1: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  text2: {
    fontWeight: '700',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
  },
  attributeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default BioModal;
