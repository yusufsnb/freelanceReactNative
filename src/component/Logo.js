import React, {Component} from 'react';
import {Image} from 'react-native';

class Logo extends Component {
  render() {
    return (
      <Image
        style={{width: 50, height: 50}}
        source={require('../../assets/cap.png')}
      />
    );
  }
}
export default Logo;
