import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

var base64 = require("base-64");

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message_text: ""
    };
  }

  sendMessage = () => {
      const url = "http://192.168.1.77:8080/messages/add/" + this.props.contact.id;
      var message = { 'text': this.state.message_text };
    
      var formBody = [];
      
      for (var property in message) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(message[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
     
      formBody = formBody.join("&");

      fetch(url, {
          method: "POST",
          headers: {
              'Accept': "application/json",
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': "Basic " + base64.encode(this.props.user.login + ":" + this.props.user.password)
            },
          body: formBody
        })
        .then((response) => {
            if(response.status === 200){                
                console.log('sent');
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

  render() {
    return (
      <View style={styles.container}>
          <TextInput 
            style={styles.textInput}
            onChangeText={(text) => this.setState({ message_text: text })}/>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DADADA",
    flexDirection: 'row'
  },
  textInput: {
      flex: 6
  },
  buttonContainer: {
      flex: 1,      
      backgroundColor: "#DADADA",
      padding: 15
  },
  buttonText: {
      fontSize: 16,
      color: "#3498db"
  }
});
