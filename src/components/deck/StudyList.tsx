import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import data from "@/test-data/test-data-2.json"
import { Entry } from "@/types"

const StudyList = () => {
  const [quizData, setQuizData] = useState<Entry[]>([])

  useEffect(() => {
    setQuizData(data) // Directly set the data from JSON
  }, [])

  return (
    <>
      {quizData.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.question}>{entry.key}</Text>
          {entry.answerCategories.map((category, i) => (
            <View key={i} style={styles.detailSection}>
              <Text style={styles.detailTitle}>{category.category}:</Text>
              {category.answers.map((answer, j) => (
                <Text key={j} style={styles.detailText}>
                  {answer}
                </Text>
              ))}
            </View>
          ))}
          {entry.notes && (
            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Notes:</Text>
              {entry.mnemonic && <Text style={styles.detailText}>Mnemonic: {entry.mnemonic}</Text>}
            </View>
          )}
        </View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "--background--",
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
})

export default StudyList
