import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Rating} from 'react-native-elements';
import image from '../../../assets/avatar_1.png';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
    fetch(
      'http://192.168.43.107:8080/user/prof/' + props.route.params.username,
      {},
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          userData: data,
        }),
      );
  }
  render() {
    if (this.state.userData.length == 0) return <></>;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.userContainer}>
          <Image
            source={
              typeof this.state.userData.img != 'undefined'
                ? {
                    uri:
                      'data:image/png;base64,' + this.state.userData.img.data,
                  }
                : image
            }
            style={styles.profileImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{this.state.userData.username}</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 15, top: 2.5}}
              onPress={() =>
                Linking.openURL('mailto:' + this.state.userData.email)
              }>
              <Icon name={'envelope-o'} size={25} color={'#D44638'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.uniTitle}>{this.state.userData.university}</Text>
          <View style={{marginTop: 10}}>
            <Rating startingValue={4.5} imageSize={30} />
          </View>
          <Text style={styles.cv}>{this.state.userData.cv}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 15,
    marginHorizontal: 35,
    alignItems: 'center',
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },
  infoContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  text: {
    color: 'darkslategray',
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  uniTitle: {
    fontSize: 18,
  },
  cv: {
    marginTop: 10,
  },
});
export default UserProfile;
