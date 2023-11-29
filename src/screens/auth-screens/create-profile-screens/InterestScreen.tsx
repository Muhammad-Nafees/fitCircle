import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {INTERESTS} from '../../../../data/data';
import CustomButton from '../../../components/shared-components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {IUser} from '../../../interfaces/user.interface';
import {setUserData} from '../../../redux/authSlice';
import Toast from 'react-native-toast-message';
import {getInterest} from '../../../api/auth-module';

export interface IInterest {
  _id: string;
  interest: string;
}

const InterestScreen = ({navigation}: any) => {
  const [selectedInterest, setSelectedInterest] = useState<IInterest[]>([]);
  const [selectedInterestName, setSelectedInterestName] = useState<any[]>([]);
  const [interests, setInterest] = useState<any>(INTERESTS);
  const previousUserData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchInterest = async () => {
      setIsLoading(true);
      try {
        const response = await getInterest();
        const data = response?.data.data;
        setInterest(data.interests);
      } catch (error: any) {
        if (error?.response?.data?.message) {
          Toast.show({
            type: 'error',
            text1: `${error?.response?.data.message}`,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: `${error.message}!`,
          });
        }
      }
      setIsLoading(false);
    };
    fetchInterest();
  }, []);

  const handleSubmit = () => {
    const partialUserData: Partial<IUser> = {
      ...previousUserData,
      interests: selectedInterestName,
    };
    dispatch(setUserData(partialUserData as IUser));
    navigation.navigate('CommunitiesScreen');
  };

  const handleSelect = (interest: string, _id: string) => {
    if (selectedInterest.some(item => item._id === _id)) {
      const filteredCategories = selectedInterest.filter(
        item => item._id !== _id,
      );
      setSelectedInterest(filteredCategories);
    } else {
      setSelectedInterest(prev => [...prev, {interest, _id}]);
      setSelectedInterestName(prev => [...prev, _id]);
    }
  };

  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <View>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>
          Select your interests
        </Text>
        {isLoading ? (
          <View style={{marginTop: 40}}>
            <CustomLoader />
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            {interests?.length === 0 ? (
              <CustomLoader isStyle={true} />
            ) : (
              interests?.map((data: any,index:number) => {
                const isSelected = selectedInterest.some(
                  item => item._id === data._id,
                );
                return (
                  <TouchableOpacity
                    key={data._id+index+1+Math.random()}
                    style={[
                      styles.itemsInnerContainer,
                      {
                        backgroundColor: isSelected ? '#209BCC' : 'transparent',
                        borderColor: isSelected ? 'transparent' : 'white',
                      },
                    ]}
                    onPress={() => handleSelect(data?.name, data._id)}>
                    <Text style={STYLES.text14}>{data?.name}</Text>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        )}
      </View>
      <View style={{marginHorizontal: 20, marginBottom: 40}}>
        <CustomButton
          isDisabled={selectedInterest.length === 0 ? true : false}
          onPress={handleSubmit}>
          Continue
        </CustomButton>
      </View>
    </View>
  );
};

export default InterestScreen;

const styles = StyleSheet.create({
  itemsContainer: {
    marginTop: verticalScale(43),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  itemsInnerContainer: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: 100,
  },
});
