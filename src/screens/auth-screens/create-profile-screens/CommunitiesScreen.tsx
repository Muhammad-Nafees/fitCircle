import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {COMMUNITIES_LIST} from '../../../../data/data';
import CustomButton from '../../../components/shared-components/CustomButton';

const CommunitiesScreen = ({navigation}: any) => {
  const [selectedCommunities, setSelectedCommunities] = useState<any>([]);

  const handleSelect = (communityName: string, id: string) => {
    if (selectedCommunities.some((item: any) => item.id === id)) {
      const filteredCommunities = selectedCommunities.filter(
        (item: any) => item.id !== id,
      );
      setSelectedCommunities(filteredCommunities);
    } else {
      setSelectedCommunities((prev: any) => [...prev, {communityName, id}]);
    }
  };

  const renderCommunity = ({item}: {item: any}) => {
    return (
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image
            source={{uri: item.image}}
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View style={{gap: 5}}>
            <Text style={STYLES.text14}>{item.name}</Text>
            <Text style={[STYLES.text12, {fontWeight: '400', opacity: 0.4}]}>
              {item.members}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            borderWidth: 2,
            borderColor: 'white',

            backgroundColor: selectedCommunities.some(
              (list: any) => list.id === item.id,
            )
              ? '#209BCC'
              : 'transparent',
          }}
          onPress={() => handleSelect(item.name, item.id)}></TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <View>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>Communities</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={COMMUNITIES_LIST}
            renderItem={renderCommunity}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <View
        style={{
          marginBottom: verticalScale(40),
          marginHorizontal: horizontalScale(20),
        }}>
        <CustomButton
          isDisabled={selectedCommunities.length == 0 ? true : false}
          onPress={() => navigation.navigate('SocialMediaAccount')}>
          Continue
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: verticalScale(27),
  },
});

export default CommunitiesScreen;
