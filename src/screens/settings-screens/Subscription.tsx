import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
// ----------------------------------------------------------------------------//
import CustomButton from '../../components/shared-components/CustomButton';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
const backgroundImage = require('../../../assets/images/backgroundImage.jpg');

const SubscriptionScreen = ({navigation}: any) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <FontAwesomeIcon name="star" size={20} color={'white'} />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Upgrade Your Subscription</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 0,
          }}>
          <View style={styles.box}>
            <View>
              <Text style={{fontSize: 14, fontWeight: '700', color: 'black'}}>
                Tier 2
              </Text>
            </View>
            <View>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'black'}}>
                $Xxx
              </Text>
              <Text style={{textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'}}>
                Lorem ipsum access
              </Text>
            </View>
          </View>
          <View style={styles.box}>
            <View>
              <Text style={{fontSize: 14, fontWeight: '700', color: 'black'}}>
                Tier 2
              </Text>
            </View>
            <View>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'black'}}>
                $Xxx
              </Text>
              <Text style={{textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'}}>
                Lorem ipsum access
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <View style={{backgroundColor: '#209BCC', borderRadius: 100}}>
            <Text style={styles.currentPlanText}>Current Plan</Text>
          </View>
          <View style={styles.line}></View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.freeContainer}>
            <Text style={styles.freeText}>FREE</Text>
            <Text style={styles.text1}>
              Access to normal perks of Fit Circle
            </Text>
          </View>
          <View>
            <Icon name="checkcircle" size={32} color={'white'} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            extraStyles={{width: 315, height: 54}}
            onPress={() => navigation.goBack()}>
            Continue
          </CustomButton>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(24),
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(100),
  },
  iconWrapper: {
    backgroundColor: 'rgba(19, 114, 140, 1)',
    borderRadius: 12,
    padding: moderateScale(10),
  },
  box: {
    width: 105,
    height: 144,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 11.5,
    marginHorizontal: 10,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tier: {
    fontWeight: '700',
    fontSize: 14,
    color: '#444444',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -50,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  currentPlanText: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#209BCC',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 11.5,
    marginTop: -50,
  },
  freeContainer: {
    flex: 1,
    gap: 3,
  },
  freeText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
  },
  text1: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
  buttonContainer: {
    paddingBottom: verticalScale(20),
    alignItems: 'center',
  },
});

export default SubscriptionScreen;
