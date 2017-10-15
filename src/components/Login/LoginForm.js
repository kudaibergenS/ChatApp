import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

var base64 = require('base-64');

export default class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            showError: false
        };
    }

    login = () => {
        fetch('http://192.168.1.77:8080/user/auth/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(this.state.username + ':' + this.state.password)
            }
        })
        .then((response) => {
            if (response.status === 200){
                response.json()
                .then((user) => {
                    console.log(user.id + ' ' + user.login);

                    this.props.navigator.push({
                        id: 'contacts',
                        user: user
                    });                    
                }); 

            } else {
                this.setState({
                    showError: true
                });
                return;
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        let errorText = this.state.showError ? 'Incorrect login or password' : '';

        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{errorText}</Text>
                <TextInput 
                    placeholder="Username..."
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInput}
                    onChangeText={(username) => this.setState({username})} />
                <TextInput                     
                    placeholder="Password..."
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    secureTextEntry
                    returnKeyType="go"
                    ref={(input) => this.passwordInput = input}                    
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInput}
                    onChangeText={(password) => this.setState({password})} />
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={this.login}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
    
  },
  textInput: {
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      marginBottom: 10,
      paddingHorizontal: 20,
      color: '#ffffff',
      fontWeight: '500',
      fontSize: 16
  },
  buttonContainer: {
      backgroundColor: '#2980b9',
      paddingVertical: 15
  }, 
  buttonText: { 
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: '700'
  },
  errorText: {
      color: "#FF2F2F",
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 16
  }
});