import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }
  componentDidMount() {
    return fetch('http://192.168.43.107:8080/shop')
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          isLoading: false,
          dataSource: resJson,
        }),
          {};
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <TouchableItem style={styles.listItem}>
              <Text style={styles.text}>{item.text}</Text>
            </TouchableItem>
          )}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  listItem: {
    marginHorizontal: 40,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 6,
    backgroundColor: 'darkslategray',
    borderRadius: 2,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

export default Data;
