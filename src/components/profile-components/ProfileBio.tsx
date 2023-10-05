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

export const ProfileBio = ({isTrainerView}: any) => {
  const userData: any = useSelector((state: RootState) => state.auth.user);
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
          {isTrainerView || userData.role === 'trainer' ? (
            <View>
              <Text style={styles.bioText}>
                Starting a fitness journey can be a big commitment, but it can
                also be a rewarding and life-changing experience. Here are some
                steps that you can follow to start your fitness journey:
              </Text>
              <Text></Text>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.bioText}>{'\t\u2022\t'}</Text>
                  <Text style={styles.bioText}>
                    Set realistic and achievable goals: Start by setting
                    specific, measurable, and attainable goals, such as losing
                    weight, improving your cardiovascular health, or building
                    strength.
                  </Text>
                </View>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.bioText}>{'\t\u2022\t'}</Text>
                    <Text style={styles.bioText}>
                      Assess your starting point: Before you start, it's
                      important to assess your current fitness level, including
                      your physical strengths and weaknesses, so you can create
                      a plan that is tailored to your needs.
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.bioText}>{'\t\u2022\t'}</Text>
                  <Text style={styles.bioText}>
                    Create an exercise plan: Choose an exercise routine that you
                    enjoy and that fits your
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.bioText}>
              There comes a particular point in life once you need to stop
              blaming people for a way you are feeling or the misfortunes in
              your life. You can’t undergo life obsessing about what may need
              been.
            </Text>
          )}
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
