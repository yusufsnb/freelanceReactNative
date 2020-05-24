import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import Icon from 'react-native-vector-icons/Ionicons';
import {Overlay} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

class MyJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: [],
      showOverlay: false,
      overlayData: undefined,
    };
    fetch('http://192.168.43.107:8080/user/myjobs/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: props.route.params.data,
      }),
    })
      .then(res => res.json())
      .then(data => this.setState({jobData: data}));
  }
  deleteJob = id => {
    fetch('http://192.168.43.107:8080/job/deleteJob/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.props.route.params.data,
        id: id,
      }),
    })
      .then(res => res.json())
      .then(data => this.setState({jobData: data}));
  };
  render() {
    if (this.state.jobData.length === 0)
      return <View style={{backgroundColor: 'white'}} />;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.jobData}
          renderItem={({item, index}) => (
            <TouchableItem
              style={styles.jobContainer}
              onPress={() =>
                this.props.navigation.navigate('Job', {
                  jobData: this.state.jobData[index],
                })
              }>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    this.setState({showOverlay: true, overlayData: item});
                  }}>
                  <Icon name={'md-settings'} size={25} />
                </TouchableOpacity>
              </View>
            </TouchableItem>
          )}
          keyExtractor={({id}, index) => id}
          showsVerticalScrollIndicator={false}
        />
        {typeof this.state.overlayData != 'undefined' ? (
          <Overlay
            isVisible={this.state.showOverlay}
            onBackdropPress={() => this.setState({showOverlay: false})}
            height={200}>
            <View style={styles.overlay} />
            <Text
              style={{fontSize: 20, color: 'darkslategray', marginBottom: 10}}>
              {this.state.overlayData.title}
            </Text>
            <Text>{this.state.overlayData.details}</Text>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 15,
                  opacity: 0.6,
                }}>
                {Moment(this.state.overlayData.lastDate)
                  .subtract(10, 'days')
                  .calendar()}
              </Text>
              <Text style={styles.budget}>
                {this.state.overlayData.budget} ₺
              </Text>
            </View>
            <View style={{marginTop: 6, flexDirection: 'row'}}>
              <FontAwesome name={'info-circle'} size={25} color={'lightblue'} />
              <Text style={{marginLeft: 15, top: 2}}>
                {this.state.overlayData.acceptedOffer.case}
                {(this.state.overlayData.acceptedOffer.case == 'tamamlandı') &
                (this.state.overlayData.acceptedOffer.paid == 0)
                  ? '(Ödeme Yapılmadı)'
                  : ''}
                {(this.state.overlayData.acceptedOffer.case == 'tamamlandı') &
                (this.state.overlayData.acceptedOffer.paid == 1)
                  ? '(Ödeme Yapıldı)'
                  : ''}
              </Text>
            </View>
            <View style={{marginVertical: 6, flexDirection: 'row'}}>
              <TouchableOpacity style={{marginRight: 10, top: 2}}>
                <FontAwesome name={'edit'} size={30} color={'green'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.deleteJob(this.state.overlayData._id)}
                disabled={
                  this.state.overlayData.offers.length == 0 ? false : true
                }>
                <FontAwesome name={'trash-o'} size={30} color={'red'} />
              </TouchableOpacity>
              <TouchableHighlight
                style={styles.doneBtn}
                disabled={
                  (this.state.overlayData.acceptedOffer.case == 'tamamlandı') &
                  (this.state.overlayData.acceptedOffer.paid == 0)
                    ? false
                    : true
                }
                onPress={() => Alert.alert('Öde')}
                underlayColor={'green'}>
                <Text style={{color: 'white'}}>Ödeme Yap</Text>
              </TouchableHighlight>
            </View>
          </Overlay>
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  jobContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    padding: 15,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    position: 'absolute',
    right: 15,
  },
  overlay: {},
  budget: {
    color: 'green',
    fontWeight: 'bold',
    position: 'absolute',
    right: 6,
    fontSize: 15,
  },
  doneBtn: {
    backgroundColor: 'green',
    position: 'absolute',
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 2,
  },
});

export default MyJobs;
