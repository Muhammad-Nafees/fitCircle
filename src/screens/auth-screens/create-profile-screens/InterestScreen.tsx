import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {INTERESTS} from '../../../../data/data';
import CustomButton from '../../../components/shared-components/CustomButton';

interface Category {
  id: string;
  category: string;
}

const InterestScreen = ({navigation}: any) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleSelect = (category: string, id: string) => {
    if (selectedCategories.some(item => item.id === id)) {
      const filteredCategories = selectedCategories.filter(
        item => item.id !== id,
      );
      setSelectedCategories(filteredCategories);
    } else {
      setSelectedCategories(prev => [...prev, {category, id}]);
    }
  };

  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <View>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>
          Select your interests
        </Text>

        <View style={styles.itemsContainer}>
          {INTERESTS.map(interest => {
            return (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.itemsInnerContainer,
                  {
                    backgroundColor: selectedCategories.some(
                      item => item.id === interest.id,
                    )
                      ? '#209BCC'
                      : 'transparent',
                    borderColor: selectedCategories.some(
                      item => item.id === interest.id,
                    )
                      ? 'transparent'
                      : 'white',
                  },
                ]}
                onPress={() =>
                  handleSelect(interest.interestName, interest.id)
                }>
                <Text style={STYLES.text14}>{interest.interestName}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginBottom: 40}}>
        <CustomButton
          isDisabled={selectedCategories.length === 0 ? true : false}
          onPress={() => navigation.navigate('CommunitiesScreen')}>
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
