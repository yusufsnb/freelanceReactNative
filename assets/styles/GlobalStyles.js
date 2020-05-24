import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  jobContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.35)',
  },
  title: {
    color: 'darkslategray',
    fontWeight: '700',
    fontSize: 15,
  },
  details: {
    marginTop: 5,
  },
  budget: {
    color: 'green',
    fontWeight: 'bold',
    position: 'absolute',
    right: 6,
  },
  aboutContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profile: {
    flex: 2,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileText: {
    color: 'darkslategray',
    fontSize: 18,
    letterSpacing: 2,
  },
  profileText2: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },
  talentPage: {
    padding: 30,
  },
  talInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: 'transparent',
  },
  talButton: {
    backgroundColor: 'darkslategray',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  talBtnText: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
  },
  talentItem: {
    backgroundColor: 'white',
    marginVertical: 5,
    paddingVertical: 6,
    paddingLeft: 10,
    borderRadius: 6,
  },
  talItemText: {
    color: 'darkslategray',
    fontSize: 18,
  },
  btnLogo: {
    position: 'absolute',
    top: 1,
    right: 10,
    flexDirection: 'row',
  },
});

export default styles;
