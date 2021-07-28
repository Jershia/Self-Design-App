import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Map from './Screens/MapScreen';
import SignUp from './Screens/SignUpScreen';
import Login from './Screens/LoginScreen';

export default class App extends React.Component {
  render() {
    return (
      
        <Container />
      
    );
  }
}

let navigator = createSwitchNavigator({
  Login: Login,
  SignUp: SignUp,
  Map: Map,
});

const Container = createAppContainer(navigator);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5e7f19',
  },
});
