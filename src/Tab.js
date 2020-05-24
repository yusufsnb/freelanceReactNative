import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStack from './stacks/HomeStack';
import InternStack from './stacks/InternStack';
import ProfileStack from './stacks/ProfileStack';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'md-home' : 'md-home';
          } else if (route.name === 'Intern') {
            iconName = focused ? 'md-card' : 'md-card';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'md-person' : 'md-person';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgba(67, 117, 163, 1)',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Intern" component={InternStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default App;
