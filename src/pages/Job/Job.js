import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import Moment from 'moment';
import {ListItem, Badge, Icon, Avatar, Overlay} from 'react-native-elements';
import image from '../../../assets/avatar_1.png';

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: props.route.params.jobData,
      offersData: [],
      replyData: [],
      userImage: undefined,
      showOverlay: false,
      userOffer: 0,
      reply: '',
      repVal: '',
    };
    fetch(
      'http://192.168.43.107:8080/user/offersData/' +
        props.route.params.jobData._id,
      {},
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          offersData: data.image,
          replyData: data.reply,
          userImage: data.userImage,
        });
      });
  }
  sendOffer = () => {
    fetch(
      'http://192.168.43.107:8080/job/sendOffer/' +
        this.props.route.params.jobData._id,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.props.route.params.globalUsername,
          offer: this.state.userOffer,
        }),
      },
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          showOverlay: false,
        });
      });
  };
  render() {
    if (this.state.offersData.length == 0) return <></>;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.jobInfo}>
            <View style={{flexDirection: 'row'}}>
              <Avatar
                rounded
                source={
                  typeof this.state.userImage != 'undefined'
                    ? {
                        uri: 'data:image/png;base64,' + this.state.userImage,
                      }
                    : image
                }
                size={'small'}
                onPress={() =>
                  this.props.navigation.navigate('UserProfile', {
                    username: this.state.jobData.username,
                    globalUsername: this.props.route.params.globalUsername,
                  })
                }
              />
              <Text style={[styles.title, {marginLeft: 3, top: 5}]}>
                {this.state.jobData.title}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                marginTop: 5,
                borderColor: 'rgba(0,0,0, 0.3)',
              }}
            />
            <Text style={styles.detail}>{this.state.jobData.details}</Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text
                style={{alignSelf: 'flex-start', fontSize: 15, opacity: 0.6}}>
                {Moment(this.state.jobData.lastDate)
                  .subtract(10, 'days')
                  .calendar()}
              </Text>
              <Text style={styles.budget}>{this.state.jobData.budget} ₺</Text>
            </View>
            {typeof this.state.jobData.file != 'undefined' ? (
              <TouchableHighlight
                style={styles.btnDownload}
                underlayColor={'rgb(76, 117, 163)'}>
                <View style={styles.downContainer}>
                  <Icon name="cloud-download" size={20} color="white" />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      marginHorizontal: 10,
                    }}>
                    İNDİR
                  </Text>
                </View>
              </TouchableHighlight>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.jobInfo}>
            <Text style={styles.title}>Teklifler</Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginTop: 5,
                borderColor: 'rgba(0,0,0, 0.3)',
              }}
            />
            {this.state.jobData.offers.map((l, i) => (
              <TouchableItem
                onPress={() =>
                  this.props.navigation.navigate('UserProfile', {
                    username: l.username,
                    globalUsername: this.props.route.params.globalUsername,
                  })
                }>
                <>
                  <ListItem
                    key={i}
                    leftAvatar={{
                      source:
                        this.state.offersData[i].decodedImage != undefined
                          ? {
                              uri:
                                'data:image/png;base64,' +
                                this.state.offersData[i].decodedImage,
                            }
                          : image,
                    }}
                    badge={{
                      value: l.offer + ' ₺',
                      textStyle: {
                        color: 'green',
                        backgroundColor: 'white',
                        fontSize: 15,
                      },
                      containerStyle: {
                        marginTop: 0,
                      },
                    }}
                    title={l.username}
                    subtitle={l.university}
                    bottomDivider
                  />
                  {this.state.jobData.acceptedOffer.email == l.email ? (
                    <Badge
                      status="success"
                      containerStyle={{position: 'absolute', top: 10, right: 5}}
                      value={() => (
                        <Icon name={'done'} size={10} color={'white'} />
                      )}
                    />
                  ) : (
                    <></>
                  )}
                </>
              </TouchableItem>
            ))}
            <View>
              <Overlay
                isVisible={this.state.showOverlay}
                height={150}
                onBackdropPress={() => this.setState({showOverlay: false})}>
                <View style={{marginBottom: 10}}>
                  <Text style={styles.inputTitle}>Bütçe</Text>
                  <TextInput
                    style={styles.inputContainer}
                    placeholder={'İşin bütçesini giriniz...'}
                    keyboardType={'number-pad'}
                    onChangeText={val => this.setState({userOffer: val})}
                  />
                  <TouchableHighlight
                    style={[styles.btnBudget, {marginTop: 15}]}
                    underlayColor={'green'}
                    onPress={() => this.sendOffer()}>
                    <Text style={{color: 'white'}}>Gönder</Text>
                  </TouchableHighlight>
                </View>
              </Overlay>
              {typeof this.state.jobData.acceptedOffer == 'undefined' ? (
                <TouchableHighlight
                  style={styles.btnBudget}
                  onPress={() => this.setState({showOverlay: true})}
                  underlayColor={'green'}>
                  <Text style={{color: 'white'}}>Teklif Yap</Text>
                </TouchableHighlight>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={styles.jobInfo}>
            <Text style={styles.title}>Yorumlar</Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginTop: 5,
                borderColor: 'rgba(0,0,0, 0.3)',
              }}
            />
            <View>
              <TextInput
                style={styles.inputContainer}
                placeholder={'Yorumunuzu giriniz'}
                onChangeText={val => this.setState({reply: val, repVal: val})}
                value={this.state.repVal}
              />
              <TouchableHighlight
                style={{
                  paddingVertical: 5,
                  alignItems: 'center',
                  marginVertical: 5,
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }}
                onPress={() => {
                  this.setState({repVal: ''});
                  fetch('http://192.168.43.107:8080/job/reply/', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      reply: this.state.reply,
                      username: 'SinaBakan',
                      email: 'yusuf64253@ogr.duzce.edu.tr',
                    }),
                  })
                    .then(res => res.json())
                    .then(data => {
                      this.setState({
                        offersData: data.image,
                        replyData: data.reply,
                        userImage: data.userImage,
                      });
                    });
                }}>
                <Text style={{color: 'white', fontSize: 15, letterSpacing: 1}}>
                  Gönder
                </Text>
              </TouchableHighlight>
            </View>
            {this.state.jobData.reply.map((l, i) => (
              <TouchableItem
                onPress={() =>
                  this.props.navigation.navigate('UserProfile', {
                    username: l.username,
                    globalUsername: this.props.route.params.globalUsername,
                  })
                }>
                <ListItem
                  key={i}
                  leftAvatar={{
                    source:
                      typeof this.state.replyData[i].decodedImage != 'undefined'
                        ? {
                            uri:
                              'data:image/png;base64,' +
                              this.state.replyData[i].decodedImage,
                          }
                        : image,
                  }}
                  title={l.rep}
                  subtitle={l.username}
                />
              </TouchableItem>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  jobInfo: {
    padding: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: 'rgb(76, 117, 163)',
    fontWeight: '700',
    letterSpacing: 1,
  },
  detail: {
    marginTop: 10,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  btnDownload: {
    marginHorizontal: 90,
    backgroundColor: 'rgb(76, 117, 163)',
    padding: 5,
    borderRadius: 10,
  },
  downContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  budget: {
    color: 'green',
    fontWeight: 'bold',
    position: 'absolute',
    right: 6,
    fontSize: 15,
  },
  btnBudget: {
    backgroundColor: 'green',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 6,
    marginTop: 1,
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
});

export default Job;
