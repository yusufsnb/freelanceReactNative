import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import Icon from 'react-native-vector-icons/Ionicons';
import {Overlay} from 'react-native-elements';

class MyWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: [],
    };
    fetch('http://192.168.43.107:8080/user/myworks/', {
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
  render() {
    if (this.state.jobData.length === 0) return <></>;
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
                <TouchableItem
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 2,
                    backgroundColor: 'black',
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    borderRadius: 2,
                  }}>
                  <Text style={{color: 'white'}}>Tamamla</Text>
                </TouchableItem>
              </View>
            </TouchableItem>
          )}
          keyExtractor={({id}, index) => id}
          showsVerticalScrollIndicator={false}
        />
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
});

export default MyWorks;
