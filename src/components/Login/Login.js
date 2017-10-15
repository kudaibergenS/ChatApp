import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from "react-native";

import LoginForm from './LoginForm';

export default class Login extends Component {

    render(){
        
        return (
            <KeyboardAvoidingView style={styles.container}>                
                <View style={styles.logoContainer}>                    
                    <Image 
                        style={styles.logo}
                        source={require('../../resources/images/logo.png')} />
                        <Text style={styles.title}>ChatApp</Text>
                </View> 
                
                <View style={styles.formContainer}>                    
                    <LoginForm navigator={this.props.navigator}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
        //backgroundColor: '#3498db'
    },
    logoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#ffffff',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.8,
        fontSize: 25
    }
});