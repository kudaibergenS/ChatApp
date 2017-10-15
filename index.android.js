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
import Chatroom from './src/components/Chatroom/Chatroom'

export default class ChatApp extends Component {
  
  renderScene(route, navigator){
    switch(route.id){
      case 'login':
        return (<Login navigator={navigator} />);

      case 'contacts':
        return <Contacts user={route.user} navigator={navigator} />;

      case 'chatroom':
        return <Chatroom user={route.user} contact={route.contact} navigator={navigator} />;

    }

  }

  render() {
    return (
      <NavigationExperimenal.Navigator
        initialRoute = {
          {
            id: "login"
          }
        }
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => NavigationExperimenal.Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}

AppRegistry.registerComponent('ChatApp', () => ChatApp);
