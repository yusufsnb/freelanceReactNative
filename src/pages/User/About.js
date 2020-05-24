import * as React from 'react';
import {Text, View, Image, Alert, ScrollView} from 'react-native';
import styles from '../../../assets/styles/GlobalStyles';
import {Button, ListItem} from 'react-native-elements';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import image from '../../../assets/avatar_1.png';

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
    fetch('http://192.168.43.107:8080/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'SinaBakan',
      }),
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          data,
        }),
      );
  }
  render() {
    const list = [
      {
        title: 'Profilimi Güncelle',
        key: 0,
        icon: 'edit',
        screen: 'ProfileUpdate',
        data: '',
      },
      {
        title: 'Yeteneklerim',
        key: 1,
        icon: 'thumb-up',
        screen: 'Talent',
        data: this.state.data.email,
      },
      {
        title: 'İşlerim',
        key: 2,
        icon: 'work',
        screen: 'MyJobs',
        data: this.state.data.email,
      },
      {
        title: 'Görevlerim',
        key: 3,
        icon: 'event-note',
        screen: 'MyWorks',
        data: this.state.data.email,
      },
    ];
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.aboutContainer}>
          <View style={styles.profile}>
            <Image
              source={
                typeof this.state.data.img != 'undefined'
                  ? {
                      uri: 'data:image/png;base64,' + this.state.data.img.data,
                    }
                  : image
              }
              style={styles.profileImage}
            />
            <Text style={styles.profileText}>{this.state.data.username}</Text>
            <Text style={[styles.profileText, {color: 'lightblue'}]}>
              {this.state.data.university}
            </Text>
          </View>
          <View style={{flex: 3}}>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.1)',
              }}>
              {list.map((item, i) => (
                <TouchableItem
                  onPress={() =>
                    this.props.navigation.navigate(item.screen, {
                      data: item.data,
                    })
                  }>
                  <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={{name: item.icon}}
                    bottomDivider
                    chevron
                  />
                </TouchableItem>
              ))}
            </View>
            <View style={{margin: 15}}>
              <Text style={styles.profileText2}>{this.state.data.cv}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default About;
