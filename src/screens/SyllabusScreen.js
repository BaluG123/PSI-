// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// const SyllabusScreen = () => {
//   const syllabusTopics = [
//     'General Knowledge',
//     'Current Affairs',
//     'Reasoning Ability',
//     'Quantitative Aptitude',
//     'Karnataka State History',
//     'Police Department Procedures',
//     'Law and Constitution',
//   ];

//   return (
//     <View style={styles.syllabusContainer}>
//       <Text style={styles.syllabusTitle}>Exam Syllabus</Text>
//       {syllabusTopics.map((topic, index) => (
//         <View key={index} style={styles.syllabusItem}>
//           <Text style={styles.syllabusItemText}>{topic}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default SyllabusScreen;

// const styles = StyleSheet.create({
//   splashContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   logo: {
//     width: 200,
//     height: 200,
//   },
//   splashText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//   },
//   headerContainer: {
//     padding: 20,
//     backgroundColor: '#007bff',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   menuContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   menuItem: {
//     width: '40%',
//     margin: 10,
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   menuItemText: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   syllabusContainer: {
//     padding: 20,
//   },
//   syllabusTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   syllabusItem: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   syllabusItemText: {
//     fontSize: 16,
//   },
//   papersContainer: {
//     padding: 20,
//   },
//   papersTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   paperItem: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   paperItemText: {
//     fontSize: 16,
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

// Enable layout animations for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SyllabusScreen = () => {
  // Comprehensive Syllabus Data
  const syllabusData = [
    {
      paper: 'Paper I - General Studies',
      topics: [
        {
          title: 'General Knowledge',
          subtopics: [
            'Indian History and Culture',
            'Karnataka State History',
            'National Movements',
            'World History',
          ],
        },
        {
          title: 'Current Affairs',
          subtopics: [
            'National and International Events',
            'Sports',
            'Awards and Honors',
            'Science and Technology Developments',
          ],
        },
        {
          title: 'Indian Polity and Governance',
          subtopics: [
            'Constitution of India',
            'State and Central Government Structure',
            'Fundamental Rights and Duties',
            'Electoral Systems',
          ],
        },
      ],
    },
    {
      paper: 'Paper II - Aptitude and Reasoning',
      topics: [
        {
          title: 'Reasoning Ability',
          subtopics: [
            'Logical Reasoning',
            'Analytical Reasoning',
            'Critical Thinking',
            'Problem-Solving Techniques',
          ],
        },
        {
          title: 'Quantitative Aptitude',
          subtopics: [
            'Basic Mathematics',
            'Data Interpretation',
            'Statistical Analysis',
            'Numerical Reasoning',
          ],
        },
        {
          title: 'Mental Ability',
          subtopics: [
            'Verbal Reasoning',
            'Non-Verbal Reasoning',
            'Pattern Recognition',
            'Spatial Reasoning',
          ],
        },
      ],
    },
    {
      paper: 'Paper III - Karnataka Police Specific',
      topics: [
        {
          title: 'Police Procedures',
          subtopics: [
            'Criminal Law',
            'Investigation Techniques',
            'Evidence Collection',
            'Legal Procedures',
          ],
        },
        {
          title: 'Physical Fitness and Training',
          subtopics: [
            'Physical Endurance Standards',
            'Self-Defense Techniques',
            'Weapon Handling',
            'Fitness Requirements',
          ],
        },
      ],
    },
  ];

  // State to manage expanded sections
  const [expandedSections, setExpandedSections] = useState({});

  // Toggle section expansion
  const toggleSection = (paperId, topicId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections(prev => ({
      ...prev,
      [`${paperId}-${topicId}`]: !prev[`${paperId}-${topicId}`],
    }));
  };

  // Render Individual Topic
  const renderTopic = (paper, paperIndex, topic, topicIndex) => {
    const sectionKey = `${paperIndex}-${topicIndex}`;
    const isExpanded = expandedSections[sectionKey];

    return (
      <View key={sectionKey} style={styles.topicContainer}>
        <TouchableOpacity
          style={styles.topicHeader}
          onPress={() => toggleSection(paperIndex, topicIndex)}>
          <Text style={styles.topicTitle}>{topic.title}</Text>
          <Icon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#007bff"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.subtopicsContainer}>
            {topic.subtopics.map((subtopic, subtopicIndex) => (
              <Text key={subtopicIndex} style={styles.subtopicText}>
                • {subtopic}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  // Render Paper Section
  const renderPaperSection = (paper, paperIndex) => (
    <View key={paperIndex} style={styles.paperContainer}>
      <Text style={styles.paperTitle}>{paper.paper}</Text>
      {paper.topics.map((topic, topicIndex) =>
        renderTopic(paper, paperIndex, topic, topicIndex),
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Exam Syllabus</Text>
          <Text style={styles.subHeaderTitle}>
            Karnataka Police Sub Inspector
          </Text>
        </View>

        {syllabusData.map((paper, paperIndex) =>
          renderPaperSection(paper, paperIndex),
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  paperContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paperTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topicContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
  subtopicsContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  subtopicText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default SyllabusScreen;
