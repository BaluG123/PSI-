import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

// Splash Screen
const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Image
        source={require('../assets/karnataka-police-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.splashText}>Karnataka Police SI Exam Prep</Text>
    </View>
  );
};

export default SplashScreen;

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
