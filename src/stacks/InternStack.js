// In App.js in a new project

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../shared/Header';
import HomeScreen from '../pages/Intern/Home';
import InternScreen from '../pages/Intern/Intern';
import UploadScreen from '../pages/Intern/UploadIntern';
const Stack = createStackNavigator();

function InternStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen name="Intern" component={InternScreen} />
      <Stack.Screen name="UploadIntern" component={UploadScreen} />
    </Stack.Navigator>
  );
}

export default InternStack;
