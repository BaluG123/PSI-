import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('window');
const BUTTON_SIZE = width * 0.15;
const LEVELS_PER_ROW = 5;
const TOTAL_LEVELS = 100;

const LevelButton = React.memo(({levelNum, isUnlocked, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => onPress(levelNum)}
    style={styles.levelButtonContainer}>
    <LinearGradient
      colors={isUnlocked ? ['#4A90E2', '#357ABD'] : ['#BDC3C7', '#95A5A6']}
      style={styles.levelButton}>
      <Text style={styles.levelText}>{levelNum}</Text>
      {isUnlocked ? (
        <View style={styles.progressDot} />
      ) : (
        <Icon
          name="lock"
          size={12}
          color="rgba(255,255,255,0.5)"
          style={styles.lockIcon}
        />
      )}
    </LinearGradient>
  </TouchableOpacity>
));

const PracticeQuiz = () => {
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('unlockedLevel')
      .then(level => level && setUnlockedLevels(parseInt(level)))
      .catch(error => console.error('Error loading levels:', error));
  }, []);

  const handleLevelPress = level => {
    if (level <= unlockedLevels) {
      navigation.navigate('QuestionScreen', {level});
    } else {
      Alert.alert(
        'Level Locked',
        'Complete previous levels to unlock this one!',
      );
    }
  };

  const renderLevelRows = () => {
    const rows = [];
    const totalRows = Math.ceil(TOTAL_LEVELS / LEVELS_PER_ROW);

    for (let i = 0; i < totalRows; i++) {
      const rowButtons = [];
      for (let j = 0; j < LEVELS_PER_ROW; j++) {
        const levelNum = i * LEVELS_PER_ROW + j + 1;
        if (levelNum <= TOTAL_LEVELS) {
          rowButtons.push(
            <LevelButton
              key={levelNum}
              levelNum={levelNum}
              isUnlocked={levelNum <= unlockedLevels}
              onPress={handleLevelPress}
            />,
          );
        }
      }
      rows.push(
        <View key={i} style={styles.row}>
          {rowButtons}
        </View>,
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#357ABD']} style={styles.header}>
        <Text style={styles.title}>PSI Questions Levels</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.levelsContainer}>{renderLevelRows()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  header: {
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
  levelsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  levelButtonContainer: {
    margin: 5,
  },
  levelButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  levelText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressDot: {
    position: 'absolute',
    bottom: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2ECC71',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  lockIcon: {
    position: 'absolute',
    bottom: 8,
  },
});

export default React.memo(PracticeQuiz);
