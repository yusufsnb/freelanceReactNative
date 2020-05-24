import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import styles from '../../../assets/styles/GlobalStyles';
import {Icon} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';

class Intern extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      initial: [],
    };
  }
  componentDidMount(): void {
    fetch('http://192.168.43.107:8080/interns', {})
      .then(res => res.json())
      .then(data =>
        this.setState({
          data: data,
          initial: data,
        }),
      );
  }
  render() {
    const HEIGHT = Dimensions.get('window').height;
    return (
      <View
        style={{
          height: HEIGHT - 140,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Searchbar
          onChangeText={val => {
            let text = val.toLowerCase();
            let datas = this.state.data;
            let filteredName = datas.filter(item => {
              return item.info.toLowerCase().match(text);
            });
            if (!text || text === '') {
              this.setState({
                data: this.state.initial,
              });
            } else if (!Array.isArray(filteredName) && !filteredName.length) {
              // set no data flag to true so as to render flatlist conditionally
              this.setState({
                noData: true,
              });
            } else if (Array.isArray(filteredName)) {
              this.setState({
                noData: false,
                data: filteredName,
              });
            }
          }}
        />
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => (
            <TouchableItem
              style={styles.jobContainer}
              onPress={() => {
                this.props.navigation.navigate('Intern', {
                  InternData: this.state.data[index],
                });
              }}>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.details}>{item.info}</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text style={{alignSelf: 'flex-start', fontWeight: 'bold'}}>
                    {item.tur}
                  </Text>
                  <Text style={styles.budget}>{item.city}</Text>
                </View>
              </View>
            </TouchableItem>
          )}
          keyExtractor={({id}, index) => id}
          showsVerticalScrollIndicator={false}
        />
        <TouchableHighlight
          style={{
            position: 'absolute',
            backgroundColor: '#32a852',
            borderRadius: 50,
            right: 25,
            bottom: 25,
          }}
          onPress={() => this.props.navigation.navigate('UploadIntern')}
          underlayColor={'#32a852'}>
          <Icon name={'add'} size={35} color={'white'} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default Intern;
