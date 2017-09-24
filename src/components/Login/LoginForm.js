import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

export default class LoginForm extends Component {

    render(){

        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder="Username..."
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInput} />
                <TextInput                     
                    placeholder="Password..."
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    secureTextEntry
                    returnKeyType="go"
                    ref={(input) => this.passwordInput = input}                    
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInput} />
                <TouchableOpacity style={styles.buttonContainer}>
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
  }
});