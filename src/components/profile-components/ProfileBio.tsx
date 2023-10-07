import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Twitter} from '../../../assets/icons/Twitter';
import {Facebook} from '../../../assets/icons/Facebook';
import {Tiktok} from '../../../assets/icons/Tiktok';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
const Instagram = require('../../../assets/icons/Instagram.png');

export const ProfileBio = ({userData, isTrainerView}: any) => {
  return (
    <View style={{paddingHorizontal: 16}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: 'white'}}>
            Social Media Accounts
          </Text>
          {isTrainerView !== true && (
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(32, 155, 204, 1)',
                  fontWeight: '400',
                }}>
                More Details
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flexDirection: 'row', gap: 6, paddingBottom: 18}}>
          <Twitter />
          <Facebook />
          <Image source={Instagram} style={{width: 29, height: 29}} />
          <View style={{backgroundColor: 'white', borderRadius: 40}}>
            <Tiktok />
          </View>
        </View>
        <View>
          <Text style={styles.heading}>Bio</Text>

          <View>
            <Text style={styles.bioText}>{userData?.bio}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  bioText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 18.74,
    fontWeight: '500',
  },
  heading: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
});
