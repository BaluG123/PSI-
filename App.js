import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import SyllabusScreen from './src/screens/SyllabusScreen';
import PreviousPapersScreen from './src/screens/PreviousPapersScreen';
import Quizzes from './src/screens/Quizzes';
import paper1 from './src/screens/paper1';
import paper2 from './src/screens/paper2';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Syllabus"
          component={SyllabusScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PreviousPapers"
          component={PreviousPapersScreen}
          options={{title: 'Previous Papers'}}
        />
        <Stack.Screen
          name="Quizzes"
          component={Quizzes}
          options={{title: 'Quizzes', headerShown: false}}
        />
        <Stack.Screen
          name="paper1"
          component={paper1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="paper2"
          component={paper2}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
