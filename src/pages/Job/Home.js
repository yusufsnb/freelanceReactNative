import * as React from 'react';
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  Alert,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from '../../../assets/styles/GlobalStyles';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import Moment from 'moment';
Moment.locale('tr');
import {Icon} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';
const WIDTH = Dimensions.get('window').width;

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modal: false,
      noData: false,
      initial: [],
    };
  }
  componentDidMount(): void {
    fetch('http://192.168.43.107:8080/jobs', {})
      .then(res => res.json())
      .then(data =>
        this.setState({
          data: data,
          initial: data,
        }),
      );
  }
  updateSearch = search => {
    Alert.alert(search);
  };
  getJob = (id, index) => {
    this.props.navigation.navigate('Job', {
      jobData: this.state.data[index],
    });
  };
  render() {
    return (
      <View
        style={{
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
              return item.details.toLowerCase().match(text);
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
                this.getJob(item._id, index);
              }}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>{item.details}</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text style={{alignSelf: 'flex-start'}}>
                    {Moment(item.lastDate)
                      .subtract(10, 'days')
                      .calendar()}
                  </Text>
                  <Text style={styles.budget}>Bütçe: {item.budget}₺</Text>
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
          onPress={() => this.props.navigation.navigate('UploadJob')}
          underlayColor={'#32a852'}>
          <Icon name={'add'} size={35} color={'white'} />
        </TouchableHighlight>
      </View>
    );
  }
}
export default HomeScreen;
