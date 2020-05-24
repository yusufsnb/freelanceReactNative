import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Tab from '../Tab';

const AuthNavStack = createStackNavigator();

function AuthStack({navigation}) {
  return (
    <AuthNavStack.Navigator headerMode="none">
      <AuthNavStack.Screen
        name="Login"
        component={Login}
        navigation={navigation}
      />
      <AuthNavStack.Screen name="SignUp" component={Signup} />
      <AuthNavStack.Screen name="Tab" component={Tab} />
    </AuthNavStack.Navigator>
  );
}

export default AuthStack;
