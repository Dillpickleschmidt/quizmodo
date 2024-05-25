import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';

type QuestionData = {
  answers: string[];
  mnemonics?: string[];
  notes?: string[];
};

type DataList = {
  [key: string]: QuestionData;
};

const data: DataList = {
  "What is the capital of France?": {
    "answers": ["Paris"],
    "mnemonics": [
      "Paris rhymes with 'pair of keys', which can unlock the gates to the city of lights."
    ],
    "notes": ["Paris is also known for its significant contributions to art, fashion, and cuisine."]
  },
  "What is the boiling point of water?": {
    "answers": ["100 degrees Celsius"],
    "mnemonics": [
      "'Boiling point' sounds like 'boiling joint', imagine water boiling at a joint family dinner at 100 degrees."
    ],
    "notes": ["This is at standard atmospheric pressure."]
  },
  "What is the chemical symbol for gold?": {
    "answers": ["Au"],
    "mnemonics": [
      "'Au' sounds like 'ow', something you might exclaim when finding gold because it's so valuable."
    ],
    "notes": ["Gold has been a valuable resource for jewelry and economics for centuries."]
  },
  "Who wrote 'To Kill a Mockingbird'?": {
    "answers": ["Harper Lee"],
    "mnemonics": ["'Harper' sounds like 'harp', and a musician could sing about the mockingbird."],
    "notes": ["This novel was published in 1960 and is famous for its themes of racial injustice."]
  }
};

const QuizList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Quiz Questions</Text>
        {Object.entries(data).map(([question, details], index) => (
          <View key={index} style={styles.entryContainer}>
            <Text style={styles.question}>{question}</Text>
            {details.answers && (
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Answers:</Text>
                {details.answers.map((answer, i) => (
                  <Text key={i} style={styles.detailText}>{answer}</Text>
                ))}
              </View>
            )}
            {details.mnemonics && (
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Mnemonics:</Text>
                {details.mnemonics.map((mnemonic, i) => (
                  <Text key={i} style={styles.detailText}>{mnemonic}</Text>
                ))}
              </View>
            )}
            {details.notes && (
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Notes:</Text>
                {details.notes.map((note, i) => (
                  <Text key={i} style={styles.detailText}>{note}</Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  entryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  question: {
    fontSize: 18,
    color: '#d3ad7f',
    marginBottom: 10,
  },
  detailSection: {
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 16,
    color: '#e5c07b',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default QuizList;
