// import React from 'react';
// import {View, Text, Image, StyleSheet} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// // Splash Screen
// const SplashScreen = ({navigation}) => {
//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('Home');
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <LinearGradient
//       colors={['#007bff', '#0056b3']}
//       style={styles.splashContainer}
//       start={{x: 0, y: 0}}
//       end={{x: 1, y: 1}}>
//       <View style={styles.contentContainer}>
//         <Image
//           source={require('../assets/karnataka-police-logo.jpg')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.splashText}>Karnataka Police SI Exam Prep</Text>
//       </View>
//     </LinearGradient>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   splashContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: wp('50%'), // 50% of screen width
//     height: hp('30%'), // 30% of screen height
//     marginBottom: hp('3%'),
//   },
//   splashText: {
//     fontSize: wp('5%'), // responsive font size
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
// });

import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SplashScreen = ({navigation}) => {
  // Animated values for logo and text
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  // Animation configurations
  useEffect(() => {
    // Logo animation
    logoScale.value = withSpring(1, {
      damping: 5,
      stiffness: 100,
    });
    logoOpacity.value = withTiming(1, {duration: 1000});

    // Text animation
    textOpacity.value = withTiming(1, {duration: 1500});

    // Navigation timer
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: logoScale.value}],
      opacity: logoOpacity.value,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  return (
    <LinearGradient
      colors={['#3494E6', '#EC6EAD']}
      style={styles.splashContainer}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.contentContainer}>
        {/* Animated Logo */}
        <Animated.Image
          source={require('../assets/karnataka-police-logo.jpg')} // Replace with your actual logo path
          style={[styles.logo, logoAnimatedStyle]}
          resizeMode="contain"
        />

        {/* Animated Text */}
        <Animated.Text style={[styles.splashText, textAnimatedStyle]}>
          Karnataka Police SI
          {'\n'}
          Exam Preparation
        </Animated.Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp('50%'), // 50% of screen width
    height: hp('30%'), // 30% of screen height
    marginBottom: hp('3%'),
  },
  splashText: {
    fontSize: wp('5%'), // responsive font size
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default SplashScreen;
