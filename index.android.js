/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View  
} from 'react-native';
import NavigationExperimenal from "react-native-deprecated-custom-components";

import Login from './src/components/Login/Login'
import Contacts from './src/components/Contacts/Contacts'

export default class ChatApp extends Component {
  
  renderScene(route, navigator){
    switch(route.id){
      case 'login':
        return (<Login navigator={navigator} />);

      case 'contacts':
        return <Contacts navigator={navigator} />;

    }

  }

  render() {
    return (
      <NavigationExperimenal.Navigator
        initialRoute = {
          {
            id: 'contacts'
          }
        }
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => NavigationExperimenal.Navigator.SceneConfigs.FloatFromBottom}
      />
    );
  }
}

AppRegistry.registerComponent('ChatApp', () => ChatApp);
