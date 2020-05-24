import React, {useContext} from 'react';
import {Text} from 'react-native';
import Context from '../store/context';

const List = () => {
  const {state} = useContext(Context);
  return state.value;
};

export default List;
