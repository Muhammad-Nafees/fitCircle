import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import {useState, useEffect} from 'react';
import {Twitter} from '../../../assets/icons/Twitter';
import {Facebook} from '../../../assets/icons/Facebook';
import {Tiktok} from '../../../assets/icons/Tiktok';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import Toast from 'react-native-toast-message';
const Instagram = require('../../../assets/icons/Instagram.png');

export const ProfileBio = ({userData, handleBioModal}: any) => {
  const {socialMediaLinks} = userData;
  const [twitterLink, setTwitterLink] = useState<string>('');
  const [facebookLink, setFacebookLink] = useState<string>('');
  const [tiktokLink, setTiktokLink] = useState<string>('');
  const [instagramLink, setInstagramLink] = useState<string>('');

  useEffect(() => {
    const links = socialMediaLinks?.map((link: any) => {
      if (link.name == 'twitter') {
        setTwitterLink(link.link);
      } else if (link.name == 'instagram') {
        setInstagramLink(link.link);
      } else if (link.name == 'facebook') {
        setFacebookLink(link.link);
      } else if (link.name == 'tiktok') {
        setTiktokLink(link.link);
      }
    });
  }, []);

  const handleOpenLink = (link: string) => {
    console.log(link, 'Ss');
    if (link == '') {
      Toast.show({
        type: 'error',
        text1: 'User has not provided the link!',
      });
      return;
    }
    Linking.openURL(`http://${link}`);
  };

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
          {userData?.role === 'user' && (
            <TouchableOpacity onPress={handleBioModal}>
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
          <TouchableOpacity
            onPress={() => handleOpenLink(twitterLink as string)}>
            <Twitter />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOpenLink(facebookLink as string)}>
            <Facebook />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOpenLink(instagramLink as string)}>
            <Image source={Instagram} style={{width: 29, height: 29}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOpenLink(tiktokLink as string)}>
            <View style={{backgroundColor: 'white', borderRadius: 40}}>
              <Tiktok />
            </View>
          </TouchableOpacity>
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
    // lineHeight: 18.74,
    fontWeight: '500',
  },
  heading: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
});
