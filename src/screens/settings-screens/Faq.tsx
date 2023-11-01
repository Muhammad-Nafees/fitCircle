import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// ----------------------------------------------------------------//
import {questionsAndAnswers} from '../dummyData';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {getFaqs} from '../../api/auth-module/profileSettings-module';
import CustomLoader from '../../components/shared-components/CustomLoader';

interface IFaq {
  _id: string;
  type: string;
  content: string;
}

export const FaqScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [showAnswers, setShowAnswers] = useState<string>('');

  const toggleAnswer = (id: string) => {
    if (showAnswers == id) {
      setShowAnswers('');
    } else {
      setShowAnswers(id);
    }
  };

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const response = await getFaqs();
      const faqs = response?.data?.data?.faqs;
      setFaqs(faqs);
    } catch (error: any) {
      console.log(error?.response?.data, 'From getting FAQS!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>FAQ</Text>
        </View>
        <View style={styles.contentContainer}>
          {isLoading ? (
            <CustomLoader extraStyles={{marginTop: 20}} />
          ) : (
            faqs?.map(faq => (
              <TouchableOpacity
                key={faq._id}
                onPress={() => toggleAnswer(faq?._id)}>
                <View style={styles.row}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.question}>{faq?.type}</Text>
                  </View>
                  <View style={styles.iconBackground}>
                    <Icon
                      name={
                        showAnswers?.includes(faq._id)
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      color={'white'}
                      size={24}
                    />
                  </View>
                </View>
                {showAnswers.includes(faq?._id) && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{faq?.content}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
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
  headingContainer: {
    marginHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  answerContainer: {
    padding: moderateScale(16),
    borderRadius: 8,
  },
  answerText: {
    color: 'white',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    flex: 1,
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginRight: horizontalScale(50),
  },
  contentContainer: {
    marginHorizontal: horizontalScale(30),
    marginVertical: verticalScale(40),
  },
  iconBackground: {
    backgroundColor: '#209BCC',
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FaqScreen;
