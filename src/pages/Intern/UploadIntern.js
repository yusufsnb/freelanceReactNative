import React, {Component} from 'react';
import {
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {CheckBox, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

class UploadIntern extends Component {
  constructor() {
    super();
    this.state = {
      company: '',
      compMail: '',
      city: '',
      selectedValue: 'Kış',
      info: '',
      linkedin: '',
      website: '',
      yol: false,
      yemek: false,
      maas: false,
      yer: false,
      done: false,
      message: '',
    };
  }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Text style={styles.inputTitle}>Şirket Adı</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder={'Şirketinizin adını giriniz...'}
              onChangeText={val => this.setState({company: val})}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Şirket Mail Adresi</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder={'Şirketinizin mail adresini giriniz...'}
              onChangeText={val => this.setState({compMail: val})}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Şehir</Text>
            <TextInput
              style={styles.inputContainer}
              onChangeText={val => this.setState({city: val})}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Staj Dönemi</Text>
            <Picker
              style={{borderWidth: 1, borderColor: 'red'}}
              selectedValue={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedValue: itemValue})
              }>
              <Picker.Item label={'Kış'} value={'Kış'} />
              <Picker.Item label={'Yaz'} value={'Yaz'} />
            </Picker>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.inputTitle}>Bilgiler</Text>
            <TextInput
              style={[
                styles.inputContainer,
                {height: 90, textAlignVertical: 'top'},
              ]}
              placeholder={'Staj bilgilerini giriniz...'}
              onChangeText={val => this.setState({info: val})}
              maxLength={150}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Linkedin Hesabınız</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder={'Linkedin URL'}
              onChangeText={val => this.setState({linkedin: val})}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Şirketinizin web sitesi</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder={'Şirket Web adresi'}
              onChangeText={val => this.setState({website: val})}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Staj İmkanları</Text>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                center
                title="Yol"
                checked={this.state.yol}
                onIconPress={() =>
                  this.state.yol == false
                    ? this.setState({yol: true})
                    : this.setState({yol: false})
                }
                containerStyle={styles.check}
              />
              <CheckBox
                center
                title="Yemek"
                checked={this.state.yemek}
                onIconPress={() =>
                  this.state.yemek == false
                    ? this.setState({yemek: true})
                    : this.setState({yemek: false})
                }
                containerStyle={styles.check}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                center
                title="Maaş"
                checked={this.state.maas}
                onIconPress={() =>
                  this.state.maas == false
                    ? this.setState({maas: true})
                    : this.setState({maas: false})
                }
                containerStyle={styles.check}
              />
              <CheckBox
                center
                title="Yer"
                checked={this.state.yer}
                onIconPress={() =>
                  this.state.yer == false
                    ? this.setState({yer: true})
                    : this.setState({yer: false})
                }
                containerStyle={styles.check}
              />
            </View>
          </View>
          <TouchableHighlight
            style={{
              marginHorizontal: 50,
              paddingVertical: 6,
              backgroundColor: '#6190ba',
              alignItems: 'center',
              marginVertical: 5,
              borderRadius: 6,
            }}
            onPress={() => {
              fetch('http://192.168.43.107:8080/intern/uploadIntern/', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: this.state.company,
                  mail: this.state.compMail,
                  city: this.state.city,
                  tur: this.state.selectedValue,
                  info: this.state.info,
                  linkedin: this.state.linkedin,
                  internURL: this.state.website,
                  upMail: 'spy_zaki_kun@hotmail.com',
                  imkan: {
                    yol: this.state.yol,
                    yemek: this.state.yemek,
                    maas: this.state.maas,
                    yer: this.state.yer,
                  },
                }),
              })
                .then(res => res.json())
                .then(data => {
                  if (data.deger == true) {
                    this.setState({done: true, message: data.message});
                    setTimeout(() => {
                      this.setState({done: false});
                      this.props.navigation.goBack();
                    }, 1500);
                  }
                });
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>Stajı Yükle</Text>
          </TouchableHighlight>
          <Overlay
            isVisible={this.state.done}
            height={175}
            onBackdropPress={() => this.setState({done: false})}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name={'check'} size={100} color={'green'} />
              <Text
                style={{
                  color: 'darkslategray',
                  letterSpacing: 2,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {this.state.message}
              </Text>
            </View>
          </Overlay>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  inputContainer: {
    paddingHorizontal: 5,
    height: 50,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(0, 0, 0, 0.25)',
    borderBottomWidth: 1,
  },
  inputTitle: {
    color: 'darkslategray',
    paddingLeft: 5,
  },
  btn: {
    marginHorizontal: 45,
    alignItems: 'center',
    backgroundColor: 'darkslategray',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: '600',
  },
  check: {
    width: 100,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});
export default UploadIntern;
