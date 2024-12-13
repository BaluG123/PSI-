import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const Paper2 = ({navigation}) => {
  // State management
  const [page, setPage] = useState(1);
  const [allQuestions, setAllQuestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMoreQuestions, setHasMoreQuestions] = useState(true);

  // Fetch questions (same implementation as original)
  const fetchQuestions = async pageNum => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `https://gkk.pythonanywhere.com/api/paper2/questions/`,
        {
          params: {page: pageNum},
        },
      );

      const newQuestions = response.data;

      if (newQuestions.length === 0) {
        setHasMoreQuestions(false);
      }

      setAllQuestions(prev => {
        const uniqueQuestions = newQuestions.filter(
          newQ => !prev.find(existingQ => existingQ.id === newQ.id),
        );
        return [...prev, ...uniqueQuestions];
      });

      setIsLoading(false);
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  // Initial fetching
  useEffect(() => {
    fetchQuestions(page);
  }, [page]);

  const showHint = hint => {
    if (!hint) {
      // Replace with a more modern alert or toast
      return;
    }

    setCurrentHint(hint);
    setModalVisible(true);
  };

  const handleOptionPress = (selectedQuestion, selectedOption) => {
    const optionKey = `option${selectedOption}`;
    setAllQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === selectedQuestion.id
          ? {
              ...question,
              selectedOption,
              answered: true,
              answeredCorrectly:
                question[optionKey] === question.correct_answer,
            }
          : question,
      ),
    );
  };

  const renderQuestion = ({item}) => (
    <LinearGradient
      colors={['#FFFFFF', '#F5F5F5']}
      style={styles.questionContainer}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionText}>• {item.question_text}</Text>
        {item.hint && (
          <TouchableOpacity
            style={styles.hintButton}
            onPress={() => showHint(item.hint)}>
            <MaterialIcons name="lightbulb-outline" size={24} color="#FFC107" />
          </TouchableOpacity>
        )}
      </View>

      {['1', '2', '3', '4'].map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            item.selectedOption === option && styles.selectedOption,
            item.selectedOption === option &&
              item[`option${option}`] === item.correct_answer &&
              styles.correctOption,
          ]}
          onPress={() => handleOptionPress(item, option)}>
          <View style={styles.optionContent}>
            <View style={styles.optionBadge}>
              <Text style={styles.optionBadgeText}>{option}</Text>
            </View>
            <Text style={styles.optionText}>{item[`option${option}`]}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {item.selectedOption && (
        <View style={styles.answerDescription}>
          <View style={styles.resultContainer}>
            {item[`option${item.selectedOption}`] === item.correct_answer ? (
              <LottieView
                source={require('../utils/right.json')}
                autoPlay
                loop={false}
                style={styles.lottieIcon}
              />
            ) : (
              <LottieView
                source={require('../utils/wrong.json')}
                autoPlay
                loop={false}
                style={styles.lottieIcon}
              />
            )}
            <Text
              style={[
                styles.resultText,
                item[`option${item.selectedOption}`] === item.correct_answer
                  ? styles.correctText
                  : styles.incorrectText,
              ]}>
              {item[`option${item.selectedOption}`] === item.correct_answer
                ? 'Correct!'
                : 'Incorrect!'}
            </Text>
          </View>
          <View>
            <Text style={styles.answerLabel}>Answer</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );

  const CustomModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <LinearGradient
          colors={['#3498db', '#2980b9']}
          style={styles.modalContent}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.modalHeader}>
            <MaterialIcons
              name="lightbulb-outline"
              size={24}
              color="white"
              style={styles.modalHeaderIcon}
            />
            <Text style={styles.modalTitle}>Hint</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.hintText}>{currentHint}</Text>
        </LinearGradient>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0074E4" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0074E4', '#1E90FF']}
        style={styles.header}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paper 2</Text>
      </LinearGradient>

      <CustomModal />

      {allQuestions.length > 0 ? (
        <FlatList
          data={allQuestions}
          renderItem={renderQuestion}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              {isFetching && <ActivityIndicator size="large" color="#0074E4" />}
            </View>
          )}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>No questions found.</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setPage(1);
              fetchQuestions(1);
            }}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  listContainer: {
    padding: wp('2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  backButton: {
    marginRight: wp('5%'),
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  questionContainer: {
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  questionText: {
    fontSize: wp('4.5%'),
    color: '#2C3E50',
    fontWeight: '600',
    flex: 1,
  },
  hintButton: {
    padding: wp('2%'),
    borderRadius: wp('50%'),
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  option: {
    backgroundColor: '#F8F9FA',
    borderRadius: wp('2%'),
    marginVertical: hp('1%'),
    borderWidth: 1,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('3%'),
  },
  optionBadge: {
    backgroundColor: '#E9ECEF',
    borderRadius: wp('50%'),
    width: wp('8%'),
    height: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  optionBadgeText: {
    color: '#495057',
    fontWeight: '600',
  },
  optionText: {
    color: '#495057',
    fontSize: wp('4%'),
    flex: 1,
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  correctOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  answerDescription: {
    marginTop: hp('2%'),
    padding: wp('3%'),
    backgroundColor: '#F8F9FA',
    borderRadius: wp('2%'),
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lottieIcon: {
    width: 24,
    height: 24,
  },
  resultText: {
    fontSize: wp('4%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
    marginLeft: 8,
  },
  correctText: {
    color: '#4CAF50',
  },
  incorrectText: {
    color: '#F44336',
  },
  answerLabel: {
    color: 'green',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  descriptionText: {
    color: '#6C757D',
    fontSize: wp('3.8%'),
    lineHeight: wp('5.5%'),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: wp('4%'),
    padding: wp('5%'),
    width: wp('90%'),
    maxHeight: hp('60%'),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  modalHeaderIcon: {
    marginRight: wp('2%'),
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },
  closeButton: {
    padding: wp('2%'),
  },
  hintText: {
    fontSize: wp('4%'),
    color: 'white',
    lineHeight: wp('6%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp('2%'),
    color: '#6C757D',
    fontSize: wp('4%'),
  },
  footer: {
    padding: wp('4%'),
    alignItems: 'center',
  },
  errorText: {
    color: '#F44336',
    fontSize: wp('4%'),
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  retryButton: {
    backgroundColor: '#0074E4',
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
});

export default Paper2;
