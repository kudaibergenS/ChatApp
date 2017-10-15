import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

import Messages from "./Messages";
import TextInputForm from "./TextInputForm";

export default class ChatRoom extends Component {
 
  render() {
    return (
      <View style={styles.container}>
          <Messages user={this.props.user} contact={this.props.contact} navigator={this.props.navigator}/>
          <TextInputForm user={this.props.user} contact={this.props.contact}/>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  textInput: {
  }
});