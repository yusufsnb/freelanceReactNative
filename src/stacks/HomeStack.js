// In App.js in a new project

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../shared/Header';
import HomeScreen from '../pages/Job/Home';
import JobScreen from '../pages/Job/Job';
import ProfileScreen from '../pages/User/UserProfile';
import UploadScreen from '../pages/Job/UploadJob';

const Stack = createStackNavigator();

function HomeStack({navigation}) {
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
      <Stack.Screen
        name="Job"
        component={JobScreen}
        options={{
          headerTitle: 'İş',
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profili',
        }}
      />
      <Stack.Screen
        name="UploadJob"
        component={UploadScreen}
        options={{
          headerTitle: 'İş Yükle',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
