import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableHighlight,
  Linking,
  TouchableOpacity,
} from 'react-native';

import SocialIcon from 'react-native-vector-icons/Zocial';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import {Icon} from 'react-native-elements';

function Intern({navigation, route}) {
  const intData = route.params.InternData;
  return (
    <View style={styles.container}>
      <View style={styles.intInfo}>
        <Text style={styles.title}>{intData.name}</Text>
        <View style={styles.hr} />
        <Text style={styles.detail}>{intData.info}</Text>
        <View style={{marginTop: 5}}>
          <Text style={styles.title}>Bilgiler</Text>
          <View style={styles.hr} />
          <Text style={{fontSize: 17}}>
            Şehir:
            <Text style={{color: 'darkslategray', fontSize: 17.5}}>
              {' '}
              {intData.city}
            </Text>
          </Text>
          <Text style={{fontSize: 15}}>
            Dönem:
            <Text style={{color: 'darkslategray', fontSize: 17.5}}>
              {' '}
              {intData.tur}
            </Text>
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={styles.title}>İmkanlar</Text>
          <View style={styles.hr} />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>Yol</Text>
            <Icon
              name={intData.imkan.yol == 'on' ? 'done' : 'close'}
              size={20}
              color={intData.imkan.yol == 'on' ? 'green' : 'red'}
              containerStyle={{marginLeft: 5}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>Yemek</Text>
            <Icon
              name={intData.imkan.yemek == 'on' ? 'done' : 'close'}
              size={20}
              color={intData.imkan.yemek == 'on' ? 'green' : 'red'}
              containerStyle={{marginLeft: 5}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>Maaş</Text>
            <Icon
              name={intData.imkan.maas == 'on' ? 'done' : 'close'}
              size={20}
              color={intData.imkan.maas == 'on' ? 'green' : 'red'}
              containerStyle={{marginLeft: 5}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>Yer</Text>
            <Icon
              name={intData.imkan.yer == 'on' ? 'done' : 'close'}
              size={20}
              color={intData.imkan.yer == 'on' ? 'green' : 'red'}
              containerStyle={{marginLeft: 5}}
            />
          </View>
        </View>
        <View style={{marginTop: 5}}>
          <Text style={[styles.title, {color: 'green'}]}>
            İletişim Bilgileri
          </Text>
          <View style={styles.hr} />
          <View style={{flexDirection: 'row'}}>
            {typeof intData.linkedin != 'undefined' ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(intData.linkedin)}>
                <SocialIcon
                  name={'linkedin'}
                  size={25}
                  color={'rgb(67, 117, 163)'}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <TouchableOpacity
              style={{marginLeft: 20, top: 2.5}}
              onPress={() => Linking.openURL('mailto:' + intData.mail)}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'md-mail' : 'md-mail'}
                size={30}
              />
            </TouchableOpacity>
            {typeof intData.intern_link != 'undefined' ? (
              <TouchableOpacity
                style={{
                  marginLeft: 18,
                  top: 2.5,
                  transform: [{rotate: '-45deg'}],
                }}
                onPress={() => Linking.openURL(intData.intern_link)}>
                <Ionicons
                  name={'md-link'}
                  size={30}
                  color={'rgb(67, 117, 163)'}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  intInfo: {
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
    marginVertical: 10,
    fontSize: 15,
    letterSpacing: 0.5,
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
  hr: {
    borderBottomWidth: 1,
    marginTop: 5,
    borderColor: 'rgba(0,0,0, 0.3)',
  },
  icon: {
    fontWeight: 'bold',
    top: 2,
  },
});

export default Intern;
