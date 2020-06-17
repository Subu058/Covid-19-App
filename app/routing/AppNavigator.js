// import React from 'React';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import Graph from '../screens/GraphScreen';
import AllCases from '../screens/AllCasesScreen';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  AllCases: {
    screen: AllCases
  },
  Graph: {
    screen: Graph
  }
}, {
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);