// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Quizzes = ({navigation}) => {
//   const menuItems = [
//     {
//       title: 'Paper1',
//       icon: 'play-outline',
//       screen: 'paper1',
//     },
//     {
//       title: 'Paper2',
//       icon: 'play-outline',
//       screen: 'paper2',
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>Quiz Categories</Text>
//         <Text style={styles.headerSubtitle}>Choose Your Challenge</Text>
//       </View>

//       <View style={styles.menuContainer}>
//         {menuItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.menuItem}
//             onPress={() => navigation.navigate(item.screen)}>
//             <Icon name={item.icon} size={40} color="#007bff" />
//             <Text style={styles.menuItemText}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Quizzes;

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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const Quizzes = ({navigation}) => {
  const menuItems = [
    {
      title: 'Paper 1',
      icon: 'document-text-outline',
      screen: 'paper1',
      gradient: ['#6a11cb', '#2575fc'],
    },
    {
      title: 'Paper 2',
      icon: 'book-outline',
      screen: 'paper2',
      gradient: ['#ff6a00', '#ee0979'],
    },
    {
      title: 'Mock Tests',
      icon: 'school-outline',
      screen: 'mockTests',
      gradient: ['#00b09b', '#96c93d'],
    },
    {
      title: 'Practice Quiz',
      icon: 'game-controller-outline',
      screen: 'practiceQuiz',
      gradient: ['#8e2de2', '#4a00e0'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Quiz Hub</Text>
        <Text style={styles.headerSubtitle}>Test Your Knowledge</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItemWrapper}
            onPress={() => navigation.navigate(item.screen)}>
            <LinearGradient
              colors={item.gradient}
              style={styles.menuItem}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <Icon
                name={item.icon}
                size={40}
                color="white"
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  headerContainer: {
    paddingTop: StatusBar.currentHeight + 20,
    paddingBottom: 30,
    backgroundColor: '#007bff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  menuItemWrapper: {
    width: width * 0.4,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  menuItemIcon: {
    marginBottom: 10,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Quizzes;
