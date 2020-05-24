import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Dimensions} from 'react-native';

import Tab from './src/Tab';
import SplashScreen from './src/component/SplashScreen';
import AuthStack from './src/stacks/AuthStack';
import useGlobalState from './src/store/globalState';
import Context from './src/store/context';
import List from './src/component/list';
const HEIGHT = Dimensions.get('window').height;

const Signed = () => {
  const store = useGlobalState();
  const {state} = useGlobalState();
  return (
    <Context.Provider value={store}>
      <View style={{height: HEIGHT + 15}}>
        <NavigationContainer>
          <Tab />
        </NavigationContainer>
      </View>
    </Context.Provider>
  );
};
const Sign = () => {
  const store = useGlobalState();
  const {state} = useGlobalState();
  return (
    <Context.Provider value={store}>
      <View style={{height: HEIGHT + 15}}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </View>
    </Context.Provider>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      token: 'asd',
    };
  }
  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return this.state.token == null ? <Sign /> : <Signed />;
  }
}

export default App;
