import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import styles from '../../../assets/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import {Overlay} from 'react-native-elements';

class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talents: [],
      item: '',
      editItem: '',
      showOverlay: false,
    };
    fetch(
      'http://192.168.43.107:8080/user/talents/' + props.route.params.data,
      {},
    )
      .then(res => res.json())
      .then(data => {
        this.setState({talents: data});
      });
  }
  editTalent = () => {
    fetch(
      'http://192.168.43.107:8080/user/talents/edit/' +
        this.props.route.params.data,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: this.state.item,
          editedItem: this.state.editItem,
        }),
      },
    )
      .then(res => res.json())
      .then(data => {
        this.setState({talents: data, showOverlay: false});
      });
  };
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.talentPage}>
          <TextInput
            style={styles.talInput}
            placeholder="Yeteneğinizi giriniz ..."
            multiline={true}
            onChangeText={val => this.setState({item: val})}
          />
          <TouchableItem
            style={styles.talButton}
            onPress={() => {
              fetch(
                'http://192.168.43.107:8080/user/talents/addItem/' +
                  this.state.item,
              )
                .then(res => res.json())
                .then(data => this.setState({talents: data}));
            }}>
            <Text style={styles.talBtnText}>Yetenek Ekle</Text>
          </TouchableItem>
          <Overlay
            isVisible={this.state.showOverlay}
            height={130}
            onBackdropPress={() => this.setState({showOverlay: false})}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.inputTitle}>Yetenek</Text>
              <TextInput
                style={styles.talInput}
                placeholder="Yeteneğinizi giriniz ..."
                value={this.state.editItem}
                onChangeText={val => this.setState({editItem: val})}
              />
              <TouchableHighlight
                style={[
                  styles.talButton,
                  {paddingVertical: 6, marginBottom: 5},
                ]}
                underlayColor={'green'}
                onPress={() => this.editTalent()}>
                <Text style={styles.talBtnText}>Düzenle</Text>
              </TouchableHighlight>
            </View>
          </Overlay>
          <FlatList
            data={this.state.talents}
            renderItem={({item, index}) => (
              <TouchableHighlight style={styles.talentItem}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.talItemText}>{item.content}</Text>
                  <View style={styles.btnLogo}>
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() =>
                        this.setState({
                          editItem: item.content,
                          showOverlay: true,
                          item: item.content,
                        })
                      }>
                      <FontAwesome name={'edit'} size={24} color={'green'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        fetch(
                          'http://192.168.43.107:8080/user/talents/deleteTalent/' +
                            this.props.route.params.data,
                          {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              item: item.content,
                            }),
                          },
                        )
                          .then(res => res.json())
                          .then(data => this.setState({talents: data}))
                      }>
                      <FontAwesome
                        name={'trash-o'}
                        size={24}
                        color={'tomato'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={({id}, index) => id}
          />
        </View>
      </ScrollView>
    );
  }
}

export default ContactScreen;
