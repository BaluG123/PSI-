import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const PreviousPapersScreen = () => {
  const papers = [
    {year: 2023, difficulty: 'Medium'},
    {year: 2022, difficulty: 'Hard'},
    {year: 2021, difficulty: 'Easy'},
    {year: 2020, difficulty: 'Medium'},
  ];

  return (
    <View style={styles.papersContainer}>
      <Text style={styles.papersTitle}>Previous Year Question Papers</Text>
      {papers.map((paper, index) => (
        <TouchableOpacity key={index} style={styles.paperItem}>
          <Text style={styles.paperItemText}>
            {paper.year} Exam Paper - {paper.difficulty}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PreviousPapersScreen;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 200,
    height: 200,
  },
  splashText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  menuItem: {
    width: '40%',
    margin: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  syllabusContainer: {
    padding: 20,
  },
  syllabusTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  syllabusItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  syllabusItemText: {
    fontSize: 16,
  },
  papersContainer: {
    padding: 20,
  },
  papersTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paperItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  paperItemText: {
    fontSize: 16,
  },
});
