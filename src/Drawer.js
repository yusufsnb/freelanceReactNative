// In App.js in a new project

import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeStack from './stacks/HomeStack';
import ProfileStack from './stacks/ProfileStack';
import AuthStack from './stacks/AuthStack';
import Tab from './Tab';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="About" component={ProfileStack} />
    </Drawer.Navigator>
  );
}

export default App;
