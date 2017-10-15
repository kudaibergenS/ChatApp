/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, ListView, Image, TouchableOpacity } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

var base64 = require("base-64");

export default class Contacts extends Component {
  constructor(props){
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      text: '',
      userDataSource: ds
    }
  }

  componentDidMount(){
    
    this.fetchContacts();
  }
  
  fetchContacts(){
        fetch('http://192.168.1.77:8080/user/contacts', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(this.props.user.login + ':' + this.props.user.password)
          }
        })
        .then((response) => {
          if(response.status === 200){
            response.json()
            .then((users) => {
              

              this.setState({
                userDataSource: this.state.userDataSource.cloneWithRows(users)
              });  
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  }
  
  onPress(contact){
    this.props.navigator.push({
      id: 'chatroom',
      user: this.props.user,
      contact: contact
    });
  }


  renderRow(contact, sectionId, rowId, highlightRow){
    
    return (
      <TouchableOpacity onPress={() => this.onPress(contact)}>
        <View style={styles.row}>
          <Image 
            style={styles.profileImage} 
            source={{ 
                      uri: "http://192.168.1.77:8080/user/image/" + contact.profile_img 
                    }}></Image>
          <Text style={styles.rowText}>{contact.firstname} {contact.lastname}</Text>
          <Text >{this.formatDate(contact.last_enter)}</Text>
        </View>
      </TouchableOpacity>      
    );      
  }

  render() {
    return (
      <View style={styles.container}>
        
        <ListView
          style={styles.listView} 
          dataSource={this.state.userDataSource}
          renderRow={this.renderRow.bind(this)}
        />
        
        
        <ActionButton buttonColor="rgba(231,76,60,1)">
          
          <ActionButton.Item 
            buttonColor="#3498db" 
            title="Write message" 
            onPress={() => this.setState({ text: ', SOOQA!' })}>

            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>         
          
        </ActionButton>


      </View>
      
    );
  }

  formatDate(timestamp) {
    const currentDate = new Date(),
          last_seen = new Date(timestamp);
          monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];

    var diff = currentDate - last_seen;
    var diffDays = Math.floor(diff / 86400000), // days
        diffHrs = Math.floor((diff % 86400000) / 3600000), // hours
        diffMins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
    console.log(diffDays + ' ' + diffHrs + ' ' + diffMins);

    if(diffDays === 1){
      return 'yesterday';
    }
    else if (diffDays === 2) {
      return '2 days ago';
    }
    else if (diffDays > 2) {
      return 'on ' + last_seen.getDate() + ' of ' + monthNames[last_seen.getMonth()];
    }
    else {
      if(diffHrs >= 1 && diffHrs < 3){
        return 'an hour ago';
      }
      else if(diffHrs >= 3 && diffHrs < 6){
        return '3 hours ago';
      }
      else if(diffHrs >= 6 && diffHrs < 9){
        return '7 hours ago';
      }
      else if(diffHrs >= 9 && diffHrs < 10){
        return '10 hours ago';
      }
      else if(diffHrs > 10 && diffHrs < 25){
        return 'at ' + last_seen.getHours() + ':' + last_seen.getMinutes();
      }
      else {
        if(diffMins > 5 && diffMins < 15){
          return '5 minutes ago';
        }
        else if(diffMins > 15 && diffMins < 30){
          return '15 minutes ago';
        }
        else if(diffMins > 30 && diffMins <= 60){
          return '30 minutes ago';
        }
        else {
          return 'just now';
        }
      }
    }
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 3,
    borderBottomColor: "#ACACAC",
    borderBottomWidth: 1,
  },
  listView: {
    marginTop: 20
  },
  rowText: {
    flex: 1,
    fontWeight: '500',
    fontSize: 18,
    paddingLeft: 10
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
});

