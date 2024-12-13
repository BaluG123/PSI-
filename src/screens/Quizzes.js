import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const Quizzes = ({navigation}) => {
  const menuItems = [
    {
      title: 'Paper1 ',
      icon: 'play-circle-outline',
      screen: 'paper1',
      color: '#3498db',
      description: 'Practice with full-length tests paper1',
    },
    {
      title: 'Paper 2 ',
      icon: 'play-circle-outline',
      screen: 'paper2',
      color: '#3498db',
      description: 'Practice with full-length tests paper2',
    },
    {
      title: 'Practice Quiz',
      icon: 'play-circle-fill',
      screen: 'PracticeQuiz',
      color: '#3498db',
      description: 'Practice with full-length tests whole',
    },
  ];

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(
    menuItems.map(() => new Animated.Value(0.8)),
  ).current;

  useEffect(() => {
    // Fade and scale animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.stagger(
        200,
        scaleAnims.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();
  }, []);

  const handlePressItem = screen => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {/* <ImageBackground
        source={require('../assets/karnataka-police-logo.jpg')} // Replace with your background image
        style={styles.backgroundImage}
        blurRadius={3}> */}
      <View style={styles.backgroundImage}>
        <Animated.View style={[styles.headerContainer, {opacity: fadeAnim}]}>
          <Text style={styles.headerTitle}>Karnataka Police SI</Text>
          <Text style={styles.headerSubtitle}>Practice</Text>
        </Animated.View>

        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={index}
              style={[
                styles.gridItem,
                {
                  transform: [{scale: scaleAnims[index]}],
                  backgroundColor: item.color + '20', // Subtle background
                },
              ]}>
              <TouchableOpacity
                style={styles.gridItemTouchable}
                onPress={() => handlePressItem(item.screen)}
                activeOpacity={0.7}>
                <View style={styles.gridItemContent}>
                  <Icon
                    name={item.icon}
                    size={hp('4%')}
                    color={item.color}
                    style={styles.gridItemIcon}
                  />
                  <Text style={styles.gridItemTitle}>{item.title}</Text>
                  <Text style={styles.gridItemDescription}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerContainer: {
    paddingTop: hp('5%'),
    paddingBottom: hp('3%'),
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerTitle: {
    color: 'white',
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: hp('2%'),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: hp('2%'),
    paddingHorizontal: wp('2%'),
  },
  gridItem: {
    width: wp('42%'),
    height: hp('25%'),
    margin: wp('2%'),
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  gridItemTouchable: {
    flex: 1,
  },
  gridItemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('3%'),
  },
  gridItemIcon: {
    marginBottom: hp('2%'),
  },
  gridItemTitle: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('1%'),
  },
  gridItemDescription: {
    fontSize: hp('1.5%'),
    color: '#666',
    textAlign: 'center',
  },
});

export default Quizzes;
