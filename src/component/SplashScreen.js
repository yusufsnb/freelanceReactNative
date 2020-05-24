import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 90, height: 90}}
          source={require('../../assets/cap.png')}
        />
        <Text style={styles.text}>Freelance</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'rgba(76, 117, 163, 0.9)',
  },
  text: {
    marginTop: 15,
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 5,
  },
});
export default SplashScreen;
