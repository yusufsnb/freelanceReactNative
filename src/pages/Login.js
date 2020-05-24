import React, {Component, useState, useContext} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  Platform,
  Alert,
} from 'react-native';

import Tab from '../Tab';
import Logo from '../component/Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from '../store/context';

const {width: WIDTH} = Dimensions.get('window');

export function State() {
  const {state, actions} = useContext(Context);
  actions({type: 'setState', payload: {...state, value: 'SinaBakan'}});
}

export default class Login extends Component<Props> {
  constructor() {
    super();
    this.state = {
      showPass: true,
      press: false,
      username: '',
      password: '',
    };
  }
  showPass = () => {
    if (this.state.press == false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={styles.logoTitle}>Freelance</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
            style={styles.inputIcon}
            size={28}
            color={'rgba(255, 255, 255, 1)'}
          />
          <TextInput
            style={styles.input}
            placeholder={'Email'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
            onChangeText={val => {
              this.setState({username: val});
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
            style={styles.inputIcon}
            size={28}
            color={'rgba(255, 255, 255, 1)'}
          />
          <TextInput
            style={styles.input}
            placeholder={'Şifre'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
            onChangeText={val => this.setState({password: val})}
          />
          <TouchableOpacity
            style={styles.btnEye}
            onPress={this.showPass.bind(this)}>
            <Icon
              name={
                this.state.press == false
                  ? Platform.OS === 'ios'
                    ? 'ios-eye'
                    : 'md-eye'
                  : Platform.OS === 'ios'
                  ? 'ios-eye-off'
                  : 'md-eye-off'
              }
              size={26}
              color={'rgba(255, 255, 255, 0.7)'}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 15}}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => {
              fetch('http://192.168.43.107:8080/', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: this.state.username,
                  password: this.state.password,
                }),
              })
                .then(res => res.json())
                .then(data => {
                  if (data.deger === true) {
                    this.props.navigation.navigate('Tab');
                  } else {
                    Alert.alert('Şifre Yanlış');
                  }
                });
            }}>
            <Text style={styles.text}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnLogin, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}>
            <Text style={[styles.text, {color: 'white'}]}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 117, 163, 0.9)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  logo: {
    width: 125,
    height: 125,
    transform: [{rotate: '15deg'}],
  },
  logoTitle: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    opacity: 0.5,
    letterSpacing: 5,
    marginLeft: 5,
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  input: {
    width: WIDTH - 40,
    height: 45,
    borderRadius: 12,
    paddingLeft: 45,
    fontSize: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
  btnEye: {
    position: 'absolute',
    top: 10,
    right: 37,
  },
  btnLogin: {
    width: WIDTH - 100,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'darkslategray',
    fontSize: 15.5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
