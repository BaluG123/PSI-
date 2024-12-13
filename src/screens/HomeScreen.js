// import React, {useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Dimensions,
//   StatusBar,
//   Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';

// const {width, height} = Dimensions.get('window');

// const HomeScreen = ({navigation}) => {
//   const menuItems = [
//     {
//       title: 'Quizzes',
//       icon: 'play-outline',
//       screen: 'Quizzes',
//       gradient: ['#00b09b', '#96c93d'],
//     },
//     // Add more menu items as needed
//   ];

//   // Animation values
//   const headerOpacity = useRef(new Animated.Value(0)).current;
//   const menuScaleValues = useRef(
//     menuItems.map(() => new Animated.Value(0.8)),
//   ).current;

//   useEffect(() => {
//     // Header fade-in animation
//     Animated.timing(headerOpacity, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();

//     // Menu items scale animation
//     const animations = menuScaleValues.map((scaleValue, index) =>
//       Animated.spring(scaleValue, {
//         toValue: 1,
//         friction: 3,
//         tension: 40,
//         delay: index * 150,
//         useNativeDriver: true,
//       }),
//     );

//     Animated.stagger(150, animations).start();
//   }, []);

//   const handlePressIn = index => {
//     Animated.spring(menuScaleValues[index], {
//       toValue: 0.95,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePressOut = index => {
//     Animated.spring(menuScaleValues[index], {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         barStyle="light-content"
//         translucent
//         backgroundColor="transparent"
//       />
//       <Animated.View style={[styles.headerContainer, {opacity: headerOpacity}]}>
//         <Text style={styles.headerTitle}>Karnataka Police SI Exam</Text>
//         <Text style={styles.headerSubtitle}>
//           Your Comprehensive Preparation Platform
//         </Text>
//       </Animated.View>

//       <View style={styles.menuContainer}>
//         {menuItems.map((item, index) => (
//           <Animated.View
//             key={index}
//             style={[
//               styles.menuItemWrapper,
//               {
//                 transform: [{scale: menuScaleValues[index]}],
//               },
//             ]}>
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPressIn={() => handlePressIn(index)}
//               onPressOut={() => handlePressOut(index)}
//               onPress={() => navigation.navigate(item.screen)}>
//               <LinearGradient
//                 colors={item.gradient}
//                 style={styles.menuItem}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 1}}>
//                 <Icon
//                   name={item.icon}
//                   size={40}
//                   color="white"
//                   style={styles.menuItemIcon}
//                 />
//                 <Text style={styles.menuItemText}>{item.title}</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f6f9',
//   },
//   headerContainer: {
//     paddingTop: StatusBar.currentHeight + 20,
//     paddingBottom: 30,
//     backgroundColor: '#007bff',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   headerSubtitle: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   menuContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 20,
//     paddingHorizontal: 10,
//   },
//   menuItemWrapper: {
//     width: width * 0.4,
//     margin: 10,
//     borderRadius: 20,
//     overflow: 'hidden',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   menuItem: {
//     paddingVertical: 25,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 20,
//   },
//   menuItemIcon: {
//     marginBottom: 10,
//   },
//   menuItemText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
// });

// export default HomeScreen;

import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  ImageBackground,
  Modal,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const HomeScreen = ({navigation}) => {
  const [exitModalVisible, setExitModalVisible] = useState(false);
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);
  const handleBackPress = () => {
    if (navigation.isFocused()) {
      setExitModalVisible(true);
      return true;
    }
    return false;
  };

  const handleExit = () => {
    BackHandler.exitApp();
  };
  const menuItems = [
    {
      title: 'Mock Quizzes',
      icon: 'library-books',
      screen: 'Quizzes',
      color: '#3498db',
      description: 'Practice with full-length tests',
    },
    {
      title: 'Syllabus',
      icon: 'menu-book',
      screen: 'Syllabus',
      color: '#2ecc71',
      description: 'Targeted topic preparation',
    },
    // {
    //   title: 'Progress Track',
    //   icon: 'analytics',
    //   screen: 'Progress',
    //   color: '#e74c3c',
    //   description: 'Monitor your performance',
    // },
    // {
    //   title: 'Study Material',
    //   icon: 'my-library-books',
    //   screen: 'StudyMaterial',
    //   color: '#9b59b6',
    //   description: 'Comprehensive resources',
    // },
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
          <Text style={styles.headerSubtitle}>Exam Preparation Platform</Text>
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
      <View style={styles.bannerContainer}>
        <BannerAd
          unitId="ca-app-pub-2627956667785383/2550120291"
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      <Modal
        visible={exitModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setExitModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Exit App</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to exit?
            </Text>

            <View style={styles.bannerContainer1}>
              <BannerAd
                unitId="ca-app-pub-2627956667785383/5564718299"
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setExitModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                <Text style={styles.buttonText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  bannerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('80%'),
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalMessage: {
    fontSize: wp('4%'),
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#357ABD',
    borderRadius: 5,
    marginRight: 5,
  },
  exitButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  bannerContainer1: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Adds space between the ad and the buttons
  },
});

export default HomeScreen;
