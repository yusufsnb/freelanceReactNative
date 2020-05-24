// In App.js in a new project

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../shared/Header';
import DetailsScreen from '../pages/User/About';
import TalentScreen from '../pages/User/Talent';
import UpdateScreen from '../pages/User/UpdateProfile';
import MyJobsScreen from '../pages/User/MyJobs';
import MyWorksScreen from '../pages/User/MyWorks';
import JobScreen from '../pages/Job/Job';
import ProfileScreen from '../pages/User/UserProfile';

const Stack = createStackNavigator();

function ProfileStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="Detail"
        component={DetailsScreen}
        options={{
          headerTitle: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Talent"
        component={TalentScreen}
        options={{
          headerTitle: 'Yeteneklerim',
        }}
      />
      <Stack.Screen
        name="ProfileUpdate"
        component={UpdateScreen}
        options={{
          headerTitle: 'Profilimi Güncelle',
        }}
      />
      <Stack.Screen
        name="MyJobs"
        component={MyJobsScreen}
        options={{
          headerTitle: 'İşlerim',
        }}
      />
      <Stack.Screen
        name="MyWorks"
        component={MyWorksScreen}
        options={{
          headerTitle: 'Görevlerim',
        }}
      />
      <Stack.Screen name="Job" component={JobScreen} />
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
