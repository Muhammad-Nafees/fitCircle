import React, {useState, useEffect} from 'react';
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
import {IUser} from '../../../interfaces/user.interface';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setUserData} from '../../../redux/authSlice';
import {createProfile, getCommunities} from '../../../api';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import Toast from 'react-native-toast-message';

export interface ICommunities {
  _id: string;
  interest: string;
}

const CommunitiesScreen = ({navigation}: any) => {
  const [selectedCommunities, setSelectedCommunities] = useState<any>([]);
  const [selectedCommunitiesName, setSelectedCommunitiesName] = useState<
    string[]
  >([]);
  const [communities, setCommunities] = useState<ICommunities[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const previousUserData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCommunities = async () => {
      setIsLoading(true);
      try {
        const response = await getCommunities();
        console.log();
        setCommunities(response?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Network Error!',
        });
      }
    };
    fetchCommunities();
  }, []);

  const handleSubmit = async () => {
    const partialUserData: Partial<IUser> = {
      ...previousUserData,
      selectedCommunities: selectedCommunitiesName,
    };
    dispatch(setUserData(partialUserData));
    navigation.navigate('SocialMediaAccount');
  };

  const handleSelect = (communityName: string, _id: string) => {
    const isSelected = selectedCommunities.some(
      (item: any) => item._id === _id,
    );

    if (isSelected) {
      const filteredCommunities = selectedCommunities.filter(
        (item: any) => item._id !== _id,
      );
      const filteredCommunitiesName = selectedCommunitiesName.filter(
        (name: string) => name !== communityName,
      );
      setSelectedCommunities(filteredCommunities);
      setSelectedCommunitiesName(filteredCommunitiesName);
    } else {
      setSelectedCommunities((prev: any) => [...prev, {communityName, _id}]);
      setSelectedCommunitiesName((prev: any) => [...prev, communityName]);
    }
  };

  const renderCommunity = ({item}: {item: any}) => {
    return (
      <TouchableOpacity onPress={() => handleSelect(item.name, item._id)}>
        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Image
              source={{uri: item.photo}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View style={{gap: 5}}>
              <Text style={STYLES.text14}>{item.name}</Text>
              <Text style={[STYLES.text12, {fontWeight: '400', opacity: 0.4}]}>
                {item.members.length} member
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
                (list: any) => list._id === item._id,
              )
                ? '#209BCC'
                : 'transparent',
            }}
            onPress={() =>
              handleSelect(item.name, item._id)
            }></TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      {communities?.length === 0 ? (
        <CustomLoader isStyle={true} />
      ) : (
        <>
          <View>
            <Text style={[STYLES.text16, {fontWeight: '700'}]}>
              Communities
            </Text>

            <View style={styles.listContainer}>
              <FlatList
                data={communities}
                renderItem={renderCommunity}
                keyExtractor={item => item._id}
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
              onPress={handleSubmit}>
              Continue
            </CustomButton>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: verticalScale(27),
  },
});

export default CommunitiesScreen;
