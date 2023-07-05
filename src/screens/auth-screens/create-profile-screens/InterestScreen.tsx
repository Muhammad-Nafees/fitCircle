import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {INTERESTS} from '../../../../data/data';
import CustomButton from '../../../components/shared-components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {getInterest} from '../../../api';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import Toast from 'react-native-toast-message';
import {IUser} from '../../../interfaces/user.interface';
import {setUserData} from '../../../redux/authSlice';

export interface IInterest {
  _id: string;
  interest: string;
}

const InterestScreen = ({navigation}: any) => {
  const [selectedInterest, setSelectedInterest] = useState<IInterest[]>([]);
  const [selectedInterestName, setSelectedInterestName] = useState<string[]>(
    [],
  );
  console.log(useSelector((state: RootState) => state.auth.user));
  const [interests, setInterest] = useState<IInterest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const previousUserData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInterest = async () => {
      setIsLoading(true);

      try {
        const response = await getInterest();
        Toast.show({
          type: 'success',
          text1: 'Data populated successfully!',
        });
        setInterest(response?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Network Error!',
        });
      }
    };

    fetchInterest();
  }, []);

  const handleSubmit = () => {
    const partialUserData: Partial<IUser> = {
      ...previousUserData,
      interest: selectedInterestName,
    };
    dispatch(setUserData(partialUserData));
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
      setSelectedInterestName(prev => [...prev, interest]);
    }
  };

  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <View>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>
          Select your interests
        </Text>

        <View style={styles.itemsContainer}>
          {interests?.length === 0 ? (
            <CustomLoader isStyle={true} />
          ) : (
            interests?.map(data => {
              return (
                <TouchableOpacity
                  key={data?._id}
                  style={[
                    styles.itemsInnerContainer,
                    {
                      backgroundColor: selectedInterest.some(
                        item => item._id === data._id,
                      )
                        ? '#209BCC'
                        : 'transparent',
                      borderColor: selectedInterest.some(
                        item => item._id === data._id,
                      )
                        ? 'transparent'
                        : 'white',
                    },
                  ]}
                  onPress={() => handleSelect(data?.interest, data?._id)}>
                  <Text style={STYLES.text14}>{data?.interest}</Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>
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
