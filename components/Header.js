import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const Header = props => {
  return(
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
    backgroundColor: Colors.primary
  },
  title: {
    color: 'black',
    fontSize: 18
  }
});

export default Header;