import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import rawData from '../../test-data/test-data.json';

type QuestionData = {
  answers: string[];
  mnemonics?: string[];
  notes?: string[];
};

type DataList = {
  [key: string]: QuestionData;
};

// Ensure rawData conforms to the DataList type
const data: DataList = rawData as unknown as DataList;

const QuizList = () => {
  const [quizData, setQuizData] = useState<DataList>({});

  useEffect(() => {
    setQuizData(data); // Directly set the data from JSON
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Quiz Questions</Text>
        {Object.entries(quizData).map(([question, details], index) => (
          <View key={index} style={styles.entryContainer}>
            <Text style={styles.question}>{question}</Text>
            {details.answers && (
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Answers:</Text>
                {details.answers.map((answer, i) => (
                  <Text key={i} style={styles.detailText}>
                    {answer}
                  </Text>
                ))}
              </View>
            )}
            {details.mnemonics && (
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Mnemonics:</Text>
                {details.mnemonics.map((mnemonic, i) => (
                  <Text key={i} style={styles.detailText}>
                    {mnemonic}
                  </Text>
                ))}
              </View>
            )}
            {details.notes && (
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Notes:</Text>
                {details.notes.map((note, i) => (
                  <Text key={i} style={styles.detailText}>
                    {note}
                  </Text>
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
    backgroundColor: "--background--", // Replace with your desired background color
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#d3ad7f",
    marginBottom: 20,
    textAlign: "center",
  },
  entryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
  },
  question: {
    fontSize: 18,
    color: "#d3ad7f",
    marginBottom: 10,
  },
  detailSection: {
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 16,
    color: "#e5c07b",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#d4d4d4",
  },
});

export default QuizList;
