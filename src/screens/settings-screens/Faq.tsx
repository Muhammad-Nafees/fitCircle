import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {questionsAndAnswers} from '../dummyData';

export const FaqScreen = () => {
  const [showAnswers, setShowAnswers] = useState({});

  const toggleAnswer = question => {
    setShowAnswers(prevState => ({
      ...prevState,
      [question]: !prevState[question],
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>FAQ</Text>
        </View>
        <View style={styles.contentContainer}>
          {questionsAndAnswers.map(qa => (
            <TouchableOpacity
              key={qa.id}
              onPress={() => toggleAnswer(qa.question)}>
              <View style={styles.row}>
                <View style={styles.questionContainer}>
                  <Text style={styles.question}>{qa.question}</Text>
                </View>
                <View style={styles.iconBackground}>
                  <Icon
                    name={
                      showAnswers[qa.question]
                        ? 'keyboard-arrow-up'
                        : 'keyboard-arrow-down'
                    }
                    color={'white'}
                    size={24}
                  />
                </View>
              </View>
              {showAnswers[qa.question] && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{qa.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: 16,
  },
  headingContainer: {
    marginHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  answerContainer: {
    marginTop: 10,
    padding: 16,
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
    marginRight: 50,
  },
  contentContainer: {
    marginHorizontal: 30,
    marginVertical: 40,
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
