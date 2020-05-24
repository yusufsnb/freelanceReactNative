import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker,
  Alert,
  TouchableHighlight,
  Button,
} from 'react-native';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import DateTimePicker from '@react-native-community/datetimepicker';

class UploadJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: undefined,
      title: '',
      cat: '',
      details: '',
      budget: '',
      selectedValue: 'Tam Zamanlı İşler',
    };
    fetch('http://192.168.43.107:8080/job/getCategory/', {})
      .then(res => res.json())
      .then(data => {
        this.setState({category: data});
      });
  }
  render() {
    if (typeof this.state.category == 'undefined') return <></>;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.inputTitle}>Başlık</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder={'İşin başlığını giriniz...'}
            onChangeText={val => this.setState({title: val})}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Kategori</Text>
          <Picker
            style={{borderWidth: 1, borderColor: 'red'}}
            selectedValue={this.state.selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({selectedValue: itemValue})
            }>
            {this.state.category[0].catName.map((l, i) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={styles.inputTitle}>Detaylar</Text>
          <TextInput
            style={[
              styles.inputContainer,
              {height: 90, textAlignVertical: 'top'},
            ]}
            placeholder={'İşin bilgilerini giriniz...'}
            onChangeText={val => this.setState({details: val})}
            maxLength={150}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={styles.inputTitle}>Bütçe</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder={'İşin bütçesini giriniz...'}
            keyboardType={'number-pad'}
            onChangeText={val => this.setState({budget: val})}
          />
        </View>
        <TouchableHighlight
          onPress={() => {
            fetch('http://192.168.43.107:8080/job/uploadJob/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: this.state.title,
                category: this.state.selectedValue,
                details: this.state.details,
                budget: this.state.budget,
                username: 'SinaBakan',
                email: 'yusuf64253@ogr.duzce.edu.tr'
              }),
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
              });
          }}
          style={styles.btn}
          underlayColor={'darkslategray'}>
          <Text style={styles.btnText}>İşi Yükle</Text>
        </TouchableHighlight>
      </View>
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
});
export default UploadJob;
