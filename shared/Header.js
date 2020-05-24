import * as React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width;
function Header({navigation}) {
  return (
    <View style={styles.header}>
      <View style={styles.btnMenu}>
        {/*<TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.btnMenu}>
          <Icon name={'md-menu'} color={'black'} size={26} />
        </TouchableOpacity>
        */}
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 26, height: 26, top: 0.5, right: 2}}
          source={require('../assets/cap.png')}
        />
        <Text style={{color: 'rgba(0, 0, 0, 0.7)', fontSize: 20}}>
          Freelance
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: WIDTH - 20,
    justifyContent: 'center',
  },
  btnMenu: {
    position: 'absolute',
    left: 5,
  },
});
export default Header;
