import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {horizontalScale} from '../../utils/metrics';
import {
  getPolicy,
  getTerms,
} from '../../api/auth-module/profileSettings-module';
import CustomLoader from '../../components/shared-components/CustomLoader';

export const TermsPolicyScreen = ({route}: any) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isTermsConditionsRoute = route.name === 'TermsConditions';

  const fetchPolicy = async () => {
    setIsLoading(true);
    try {
      const response = await getPolicy();
      const data = response?.data?.data?.policy;
      const responseData = data?.content;
      setContent(responseData);
    } catch (error: any) {
      console.log(error?.response?.data, 'From getting policy!');
    }
    setIsLoading(false);
  };

  const fetchTerms = async () => {
    setIsLoading(true);
    try {
      const response = await getTerms();
      const data = response?.data?.data?.terms;
      const responseData = data?.content;
      console.log(responseData, 'fromtemss');
      setContent(responseData);
    } catch (error: any) {
      console.log(error?.response, 'From getting temrs!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (route?.name === 'TermsConditions') {
      fetchTerms();
    } else {
      fetchPolicy();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.heading}>
            {isTermsConditionsRoute ? 'Terms & Conditions' : 'Privacy Policy'}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          {isLoading ? (
            <CustomLoader extraStyles={{marginTop: 20}} />
          ) : (
            <Text style={styles.termsText}>{content}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: horizontalScale(16),
  },
  contentContainer: {
    marginHorizontal: horizontalScale(16),
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  termsText: {
    color: 'white',
    fontSize: 14,
    marginTop: 20,
    // lineHeight: 20,
  },
});
