import React, {Component, useState} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  Platform,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Picker,
} from 'react-native';

import Logo from '../component/Logo';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');

export default class SignUp extends Component<Props> {
  constructor() {
    super();
    this.state = {
      showPass: true,
      press: false,
      university: [],
      selectedValue: 'Abant İzzet Baysal Üniversitesi',
      username: '',
      email: '',
      password: '',
      cv: '',
    };
    fetch('http://192.168.43.107:8080/getUniversity/', {})
      .then(res => res.json())
      .then(data => {
        this.setState({university: data});
      });
  }
  showPass = () => {
    if (this.state.press == false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };
  render() {
    if (this.state.university.length == 0) return <></>;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
                style={styles.inputIcon}
                size={28}
                color={'rgba(255, 255, 255, 1)'}
              />
              <TextInput
                style={styles.input}
                placeholder={'Kullanıcı Adı'}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid="transparent"
                onChangeText={val => this.setState({username: val})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name={Platform.OS === 'ios' ? 'md-mail' : 'md-mail'}
                style={styles.inputIcon}
                size={26}
                color={'rgba(255, 255, 255, 1)'}
              />
              <TextInput
                style={styles.input}
                placeholder={'Email'}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid="transparent"
                onChangeText={val => this.setState({email: val})}
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
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {paddingLeft: 15, height: 90, textAlignVertical: 'top'},
                ]}
                placeholder={'CV'}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid="transparent"
                multiline={true}
                numberOfLines={4}
                maxLength={100}
                onChangeText={val => this.setState({cv: val})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name={Platform.OS === 'ios' ? 'md-arrow-down' : 'md-arrow-down'}
                style={{position: 'absolute', right: 37, top: 10}}
                size={25}
                color={'rgba(255, 255, 255, 1)'}
              />
              <Picker
                style={[styles.input, {borderWidth: 1, borderColor: 'red'}]}
                selectedValue={this.state.selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectedValue: itemValue})
                }>
                {this.state.university[0].uniName.map((l, i) => (
                  <Picker.Item label={l} value={l} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={[styles.btnLogin, {backgroundColor: '#fff'}]}
              onPress={() => {
                fetch('http://192.168.43.107:8080/user/signup/', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    university: this.state.selectedValue,
                    cv: this.state.cv,
                  }),
                })
                  .then(res => res.json())
                  .then(data => {
                    console.log(data);
                  });
              }}>
              <Text style={styles.text}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    marginBottom: 50,
  },
  logo: {
    width: 125,
    height: 125,
    transform: [{rotate: '15deg'}],
  },
  logoTitle: {
    color: 'darkslategray',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.5,
    letterSpacing: 3,
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
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'darkslategray',
    fontSize: 15,
    textAlign: 'center',
  },
});
